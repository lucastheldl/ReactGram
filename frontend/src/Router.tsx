//Router
import {Route,Routes,BrowserRouter,Navigate} from "react-router-dom"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Auth/Login"
import { Register } from "./pages/Auth/Register"

export function Router(){
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    
    </Routes>
  </BrowserRouter>)
  
}