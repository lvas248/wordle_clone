import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../Redux/Slices/sessionSlice'
import { clearSessionErrors } from '../Redux/Slices/sessionSlice'
function Login() {
    
    const dispatch = useDispatch()    
    const navigate = useNavigate()

    const error = useSelector( state => state.session.error)


    const [ loginObj, setLoginObj ] = useState({
        email: '',
        password: ''
    })

    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.name] = e.target.value
        setLoginObj(copy)
    }

    function submitLogin(e){
        e.preventDefault()
        dispatch(loginuser(loginObj)).then(res => {
            if(res.meta.requestStatus === 'fulfilled') navigate('/')
            else{ 
            setTimeout( ()=>{
                dispatch(clearSessionErrors())
            }, 3000)
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
                    <p className={error?.error ? 'error' : 'hidden' }>{error?.error}</p>
                </div>

                <input name='email' value={loginObj.email} onChange={updateLoginObj} type='email' className='formInput' />

            </div>

            <div id='password' 
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Password</p>
                    {/* <p className={errors.password ? 'error' : 'hidden' }>{errors.password}</p> */}
                </div>

                <input name='password' value={loginObj.password} onChange={updateLoginObj} type='password' className='formInput' />

            </div>

            <button className='formSubmit'>Login</button>

        </form>

     );
}

export default Login;