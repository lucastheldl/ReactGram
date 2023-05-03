import "./Auth.css"

//components
import { Link } from "react-router-dom"
//hooks
import { useState,useEffect } from "react"
import { FormEvent } from "react";


export function Register(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  
  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    const user={
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user);
  }
  return(
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e)=> setName(e.target.value)} value={name || ""}/>
        <input type="email" placeholder="E-mail" onChange={(e)=> setEmail(e.target.value)} value={email || ""}/>
        <input type="password" placeholder="Senha" onChange={(e)=> setPassword(e.target.value)} value={password || ""}/>
        <input type="password" placeholder="Confirmar senha" onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword || ""}/>
        <input type="submit" placeholder="Confirmar" />
      </form>
      <p>
        Já tem conta?<Link to="/login">Login</Link>
      </p>
    </div>
  )
}