import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        password: "",
    })
    useEffect(() => {
        if(localStorage.getItem('chat-app-user')) {
            // navigate("/chat")
        } 
    },[])// eslint-disable-line
    const handleSubmit =  async (event) => {
        event.preventDefault();
       if(handleValidation()){
          const{password,username,} = values
            const {data} = await axios.post('api1/api/auth/login',{
                username: username,
                password: password,
            })
        if(data.status === false){
            toast.error(data.msg,toastOptions)
        }
        if(data.status=== true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user))
            console.log(data.user)
        }
       navigate("/chat")

       }
    }
    const toastOptions = { 
       position: "bottom-right" ,
            autoClose: 4000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark"
    }
           

    const handleChange = (event) => {
        setValues ({...values,[event.target.name]:event.target.value})
    }
    const handleValidation = (event) => {
         const {password,username, } = values;
         if(password === ""){
       toast.error("请不要输入空密码",toastOptions)
             return false
         }else if (username.length  === ""){
            toast.error('请不要输入空用户名',toastOptions)
            return false
         } return true
    }   
    return (
        <>
        <FormContainer>
            <form action="" onSubmit={(event) => handleSubmit(event)} >
                <div className='brand'>
                    <img src={logo} alt="Logo" />
                     <h1>snappy</h1>
                     </div>
                <input text="text" placeholder="Username" name='username' onChange={(e)=>handleChange(e)}/> 
                <input text="password" placeholder="Password" name='password' onChange={(e)=>handleChange(e) }/> 
                <button type="submit">Login In</button>
                <span>
                    Don't have an account ?  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login">Login</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer/>
        </>
    )
}
const  FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {  
    // width:100%
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
 button {
    width: 111%;
    background-color: #4e0eff;
    // color: white; 
    padding: 1rem 2rem;
    border: none;
    font-weight:bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    // transition: 0.3s  ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
  color: white;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}}
`;
export default Login