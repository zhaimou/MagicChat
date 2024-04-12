import react, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Robot from "../assets/robot.gif"
export default function Welcome({currentUser}){
    const [username, setusername] = useState('') 
    useEffect(() => {
        function handluser(){
           const user  = localStorage.getItem('chat-app-user')
          const user1 =   JSON.parse(user).username
          setusername(user1)
         }
         handluser()
    },[])
    return (
        <Container>
            <img src={Robot} alt="robot" />
            <h1>Welcome</h1><span>{username}!</span>
            <h3>Please select a chat to Start</h3>
        </Container>
    )
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: #4e0eff;
}
`;

