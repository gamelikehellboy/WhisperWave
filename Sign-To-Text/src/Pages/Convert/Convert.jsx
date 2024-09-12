import React, { useState, useRef, useEffect } from 'react';

const Convert = () => {
  const [showImage, setShowImage] = useState(false);
  const [isCommunicating, setIsCommunicating] = useState(false);
  const [text, setText] = useState('');
  const ws = useRef(null);
  const imgRef = useRef(null);




  useEffect(() => {
    const runPythonScript = async () => {
      try {
        const response = await fetch('/run-python-script');
        if (response.ok) {
          console.log('Python script executed successfully');
        } else {
          console.error('Error executing Python script');
        }
      } catch (error) {
        console.error('Error executing Python script:', error);
      }
    };

    runPythonScript();
  }, []);




  const startWebSocket = () => {
    ws.current = new WebSocket('ws://127.0.0.1:8000/ws/video_feed');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.frame && imgRef.current) {
        imgRef.current.src = `data:image/jpeg;base64,${data.frame}`;
        setText(data.word);
      }
    };

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onclose = () => {
      ws.current = null;
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const handleCommunicateClick = () => {
    setShowImage(true);
    setIsCommunicating(true);
    setText(''); // Clear the text when clicking "Communicate"
    startWebSocket();
    // startStopWs(); // Start WebSocket connection
  };

  const handleStopClick = () => {
    if (ws.current) {
      ws.current.send('stop');
      ws.current.close();
    }
    setShowImage(false);
    setIsCommunicating(false);
  };

  return (
    <div className='w-full h-full pt-10'>
      <div className='flex flex-col gap-10 items-center'>
        {showImage && (
          <>
          <div className='flex justify-center' id='vidDiv'>
            <img
              ref={imgRef}
              alt='Video Stream'
              id='sign-etect-vid'
              className='w-full border-2 border-solid border-black rounded-xl'
            />
          </div>
          </>
        )}
        {isCommunicating ? (
          <button onClick={handleStopClick} className='w-20 border-2 border-solid border-white text-white font-bold' id='com-btn'>
            Stop
          </button>
        ) : (
          <button onClick={handleCommunicateClick} className='w-40 border-2 border-solid border-white text-white font-bold' id='com-btn'>
            Communicate
          </button>
        )}
        {isCommunicating && <p className='flex flex-col border-2 border-2px border-white rounded-md w-96 items-center bg-gray-700 font-bold text-white'>Converted Text <br/>
        <span className='flex justify-center'>
          {text}
        </span>
        </p>}
      </div>
    </div>
  );
};

export default Convert;
