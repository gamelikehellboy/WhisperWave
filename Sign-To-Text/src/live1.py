import time
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
import cv2
import mediapipe as mp
import numpy as np
import pickle
from collections import deque, Counter
import base64
import asyncio
import logging
import pyttsx3

from fastapi.logger import logger
from starlette.websockets import WebSocketDisconnect

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the trained model
model_dict = pickle.load(open('./model_final.p', 'rb'))
model = model_dict['model']
engine = pyttsx3.init()
# Initialize FastAPI app
app = FastAPI()

# Initialize Video Capture
cap = cv2.VideoCapture(0)
# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.7)

# Define labels for the hand signs
labels_dict = {i: chr(65 + i) for i in range(26)}

# Initialize variables for word formation
word = ""
hands_down = False
predictions = deque(maxlen=30)  # Store the last 30 predictions to stabilize output
CONFIDENCE_THRESHOLD = 0.4  # Increase confidence threshold for predictions
MINIMUM_COUNT = 7  # Increase the count required for character stabilization
hands_down_start_time = None  # Track the time when hands go down
HANDS_DOWN_DURATION = 1.5  # Minimum time in seconds that hands must be down to confirm the word
last_character = None  # Track the last added character
character_cooldown_start_time = None  # Track time to debounce character detection
CHARACTER_COOLDOWN = 3.0  # Slightly increase cooldown period to prevent rapid character appending


async def process_frame():

    global word, hands_down, hands_down_start_time, last_character, character_cooldown_start_time

    data_aux = []
    x_ = []
    y_ = []

    ret, frame = cap.read()
    if not ret and not cap:
        logger.error("No frame available")
        return None, "No frame available"

    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process frame for hand landmarks
    results = hands.process(frame_rgb)
    
    # Count the number of hands detected
    num_hands_detected = len(results.multi_hand_landmarks) if results.multi_hand_landmarks else 0

    if num_hands_detected > 0:
        hands_down = False  # Hands are detected, so they are up
        hands_down_start_time = None  # Reset hands down timer
        
        for hand_landmarks in results.multi_hand_landmarks:
            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y

                x_.append(x)
                y_.append(y)

            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y
                data_aux.append(x - min(x_))
                data_aux.append(y - min(y_))

        if num_hands_detected == 1:
            data_aux.extend([0] * 42)  

        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame, 
                hand_landmarks,  
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )

        # Predict character if the correct number of landmarks are detected
        if len(data_aux) == 84:
            prediction = model.predict([np.asarray(data_aux)])
            prediction_prob = model.predict_proba([np.asarray(data_aux)])
            predicted_character = labels_dict[int(prediction[0])]
            confidence = max(prediction_prob[0])  # Get the maximum confidence score
            
            # Only append to predictions if confidence is above the threshold
            if confidence > CONFIDENCE_THRESHOLD:
                predictions.append(predicted_character)

                # Get the most common prediction in the deque
                if len(predictions) == predictions.maxlen:
                    char_counts = Counter(predictions)
                    most_common_char, count = char_counts.most_common(1)[0]
                    
                    # Only append to the word if the most common character appears more than MINIMUM_COUNT times
                    if count >= MINIMUM_COUNT and (most_common_char != last_character or (time.time() - character_cooldown_start_time > CHARACTER_COOLDOWN if character_cooldown_start_time else True)):
                        word += most_common_char
                        last_character = most_common_char
                        character_cooldown_start_time = time.time()  # Start cooldown timer

                # Draw the predicted character on the frame
                x1 = int(min(x_) * W) - 10
                y1 = int(min(y_) * H) - 10
                x2 = int(max(x_) * W) + 10
                y2 = int(max(y_) * H) + 10

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
                cv2.putText(frame, predicted_character + f" ({confidence:.2f})", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 255), 3, cv2.LINE_AA)
                
                predicted_word = word
            else:
                predicted_word = ""

    else:
        # No hands detected, so they are down
        if not hands_down:
            hands_down_start_time = time.time() if hands_down_start_time is None else hands_down_start_time
            
            # Check if hands have been down long enough to confirm the word
            if time.time() - hands_down_start_time > HANDS_DOWN_DURATION:
                if word:  # Print the word only if it is not empty
                    logger.info(f"Word formed: {word}")
                    speak(word)
                    word = ""  # Reset the word after printing
                    predictions.clear()  # Clear the predictions to avoid carry-over
                hands_down = True  # Set hands_down only after processing the word

        predicted_word = word

    # Encode the frame as a base64 string
    _, buffer = cv2.imencode('.jpg', frame)
    frame_encoded = base64.b64encode(buffer).decode('utf-8')

    return frame_encoded, predicted_word



app = FastAPI()
def speak(text):
    engine.say(text)
    engine.runAndWait()
@app.websocket("/ws/video_feed")
async def websocket_endpoint(websocket: WebSocket):
    global cap
    if not cap:
        cap = cv2.VideoCapture(0)
    await websocket.accept()
    while True:
        try:
            frame, word = await process_frame()
            if frame:
                await websocket.send_json({'frame': frame, 'word': word})
        except WebSocketDisconnect:
                cap.release()
                cap = None
                logger.info("WebSocket connection closed")
        except Exception as e:
            logger.error(f"WebSocket error: {e}")
            break
        




        
# @app.websocket("/ws/stop_video_feed")
# async def stop_video_feed(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_json()
#         if data == "stop":
#             global stop_video
#             cap.release()
#             break
#         else:
#             await websocket.send_text("Invalid command")
#         print(data)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
