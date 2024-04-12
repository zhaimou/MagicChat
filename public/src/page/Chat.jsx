import React, {useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import {useNavigate}from 'react-router-dom'
import Contacts from '../components/contacts'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
function Chat() {
    const navigate  = useNavigate () 
    const socket = useRef();
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat,setCurrentChat] = useState(undefined)
    useEffect(() => {
        async function local(){
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login")
            }else{
            setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
            }
           } 
           local()
    },[])
    useEffect(() => {
        if(currentUser){
            socket.current = io('http://localhost:5000')
            socket.current.emit('add-user',currentUser._id)
        }
    },[currentUser])
    useEffect( () => {
     async function currentUser1(){
        if(currentUser) {
            // console.log(currentUser)
            if(currentUser.isAvatarImageSet){
             const data = await axios.get(`api1/api/auth/allusers/${currentUser._id}`) 
             setContacts(data.data)
            }else{
                navigate("/setAvatar")
            }
        }      
      }
      currentUser1()
    },[currentUser]
    )
   const handleChatChange= (chat) => {
           setCurrentChat(chat)
   }
//    console.log(currentChat)

    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts}  changeChat={handleChatChange} />
                {currentChat === undefined ? (
                    <Welcome currentUser={currentUser}/>

                ): (
                    <ChatContainer 
                    currentChat={currentChat} 
                    currentUser={currentUser}
                    socket = {socket}
                     />
                )}

            </div>
        </Container>
        
    )
}
const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}

`

export default Chat
