import React, {useState} from 'react'
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.svg'
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const handleSubmit =  async (event) => {
        event.preventDefault();
       if(handleValidation()){
        const password1 = values.password
        console.log(password1)
          const{password,username,email} = values
            const {data} = await axios.post('api1/api/auth/register',{
                password: password,
                username: username,
                email: email,
            })
        if(data.status === false){
            toast.error(data.msg,toastOptions)

        }
        if(data.status=== true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user))
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
         const {password,confirmPassword,username, email} = values;
         if(password !== confirmPassword){
       toast.error("两次输入的密码不一致",toastOptions)
             return false
         }else if (username.length < 3){
            toast.error('用户名应该大于3个字符',toast)
            return false
         }else if(password.length < 8){
            toast.error("密码应该大于8个字符",toast)
            return false
         }else if(email ===''){

                toast.error("email is required",toastOptions)
                return false
         }
         return true
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
                <input text="email" placeholder="Email" name='email' onChange={(e)=>handleChange(e) }/> 
                <input text="password" placeholder="Password" name='password' onChange={(e)=>handleChange(e) }/> 
                <input text="text" placeholder="Confirm password" name='confirmPassword' onChange={(e)=>handleChange(e) }/>
                <button type="submit">Create User</button>
                <span>
                    Already have an account ?  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login">Login</Link>
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
export default Register