import Convert from "./Pages/Convert/Convert"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import NewHome from "./Pages/Home/NewHome"
import ConvertPage from "./Pages/Convert/ConvertPage"



function App() {
  

  return (
    <>
    <BrowserRouter>
      {/* <Navbar/> */}
    
      <Routes>
        <Route path="/" element={<NewHome/>}/>
        <Route path="/convert" element={<ConvertPage/>}/>
        {/* <Route path="/about" element={<About/>}/> */}
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
