//Router
import {Route,Routes,Navigate} from "react-router-dom"
//pages
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Auth/Login"
import { Register } from "./pages/Auth/Register"

export function Router(){
  return(
  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    
    </Routes>)
  
}