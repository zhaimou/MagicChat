import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import Chat from './page/Chat';
import SetAvatar from './page/SetAvatar';
export default function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>} ></Route>
      <Route path="/login" element={<Login/>}> </Route>
      <Route path="/chat" element={ <Chat/>} ></Route>
      <Route path="/setAvatar" element={ <SetAvatar/>} ></Route>
    </Routes>
  
  </BrowserRouter>
  
}


