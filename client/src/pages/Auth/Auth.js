import  React,{useState} from 'react'
import "./Auth.css"
import {Logo} from '../../assets/Logo'
import Button from '../../component/button/Button'
import About from './About'
import {login, signup} from "../../actions/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
function Auth() {
    const dispatch=useDispatch()
    const navigate=useNavigate()    
    const [isSigned, setIsSigned] = useState(false)
    const [name, setName] = useState('')
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        
        if(isSigned){
            if(!name || !email || !password){
                alert("Enter All credentials !")
            }
            const value={name,email,password}
            dispatch(signup(value,navigate,setLoading))
        }else {
            const logValue = {email, password}
            dispatch(login(logValue,navigate,setLoading))
        }
    }

    return (
    <section className='auth-section'>
      {isSigned && (
         <About/>
      )}
      <div className="auth-container">
         {!isSigned && <Logo className="login-logo"/>}
         <form onSubmit={handleSubmit} autoComplete='false'>
            {isSigned && 
               <label htmlFor="name">
                  <h4>Display Name :</h4>
                  <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name" />
               </label>
            }
            <label htmlFor="email">
               <h4>Email :</h4>
               <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" />
            </label>

            <label htmlFor="password">
               <div className="password-label">
                  <h4> Password :</h4>
                  {!isSigned && <span> Forgot Password ? </span>}
               </div>

               <input style={{marginBottom:"0px"}} value={password} onChange={(e)=>setPassword(e.target.value)} type={!show?"password":"text"} name="password" id="password" />
                <label htmlFor="check">
                    <input type="checkbox" onClick={()=>setShow(!show)} name="checkbox" id="check" />
                    <span> Show Password</span>
                </label>
               {isSigned && 
               <p>Password must contain at least 8 characters,
                   including  1 letter and 1 symbol.</p>
               }
            </label>
            {
               isSigned && (
                  <label htmlFor="check">
                        <input type="checkbox" name="checkbox" id="check" />
                        <span>
                           Opt-in to receive occasional product updates
                           user,research <br/> invitation, company
                           announcements, and digests
                        </span>
                  </label>
               )}
            {!loading ?
            <Button className="auth-btn" type="submit">
              {!isSigned?"Log In":"Sign Up"}
            </Button>
            :
            <Button className="auth-btn" type="submit">
              {!isSigned?"Logging In":"Signing Up"}
            </Button>}
            {
               isSigned && (
                  <p> By clicking "Sign Up", you agree to our
                     <span> terms of service</span> , <br/>
                     <span> privacy policy</span> and 
                     <span> cookie policy </span>.
                  </p>
               )
            }
         </form>
         <p>
            {!isSigned? "Don't Have An Account ?":"Already Have An Account ?"}
            <Button type='button' className='handle-switch-btn' 
                     onClick={()=>setIsSigned(!isSigned)}>
               {isSigned?"Log In":"Sign Up"}
            </Button>
         </p>
      </div>
   </section>
  )
}

export default Auth