import "./Auth.css"

//components
import { Link } from "react-router-dom"
//hooks
import { useState,useEffect } from "react"
import { FormEvent } from "react";
import { FormEventHandler } from "react";

export function Register(){
  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    
  }
  return(
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirmar senha" />
        <input type="submit" placeholder="Confirmar" />
      </form>
      <p>
        Já tem conta?<Link to="/login">Login</Link>
      </p>
    </div>
  )
}