import { useContext, useState } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'

function Login() {


    const [ ,setUser ] = useContext(UserContext)
    const [ loginObj, setLoginObj ] = useState({
        email: '',
        password: ''
    })
    const [ errors, setErrors ] = useState({})

    const navigate = useNavigate()

    
    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.name] = e.target.value
        setLoginObj(copy)
    }

    function submitLogin(e){
        e.preventDefault()
        fetch('/login',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({user: loginObj})
        }).then( res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setUser({...data, loggedIn: true})
                    navigate('/')
                })
            }else{
                res.json()
                .then(data => setErrors(data))
            }
        })
    }
    return ( 

        <form onSubmit={submitLogin} className='form' >

            <p className='formTitle'>Login to your account</p>

            <div id='email'
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Email Address</p>
                    <p className={errors.error ? 'error' : 'hidden' }>{errors.error}</p>
                </div>

                <input name='email' value={loginObj.email} onChange={updateLoginObj} type='email' className='formInput' />

            </div>

            <div id='password' 
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Password</p>
                    <p className={errors.password ? 'error' : 'hidden' }>{errors.password}</p>
                </div>

                <input name='password' value={loginObj.password} onChange={updateLoginObj} type='password' className='formInput' />

            </div>

            <button className='formSubmit'>Login</button>

        </form>

     );
}

export default Login;