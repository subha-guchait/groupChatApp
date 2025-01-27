import React,{useState} from 'react'

const AuthForm = () => {
    const[isLogin,setIsLogin] = useState(true);
  return (
    <div className='container'>
        <div className='form-container'>
            <div className='form-toggle'>
                <button className={isLogin?'active':''} onClick={()=>setIsLogin(true)}>Login</button>
                <button className={!isLogin?'active':''} onClick={()=>setIsLogin(false)}>SignUp</button>
            </div>
            {isLogin?<>
            <div className="form">
                <h2>Login Form</h2>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='password'/>
                <a href="#">Forgot Password?</a>
                <button>Login</button>
                <p>Not a Member? <a href="#" onClick={()=>setIsLogin(false)}>SignUp now</a></p>
            </div>
            </>:<>
            <div className="form">
                <h2>SignUp Form</h2>
                <input type="email" placeholder='Email'/>
                <input type="tel" placeholder='Mobile No'/>
                <input type="password" placeholder='password'/>
                <button>Signup</button>
                <p>Already a Member? <a href="#" onClick={()=>setIsLogin(true)}>LogIn now</a></p>
            </div>
            </>}
        </div>
      
    </div>
  )
}

export default AuthForm
