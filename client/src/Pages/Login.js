import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../Redux/Slices/sessionSlice'

function Login() {
    
    const dispatch = useDispatch()    
    const navigate = useNavigate()

    const errors = useSelector( state => state.session.error)
    // const isLoading = useSelector( state => state.session.status)

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
            console.log(res)
            if(res.meta.requestStatus === 'fulfilled') navigate('/')
        })

    }
    return ( 

        <form onSubmit={submitLogin} className='form' >

            <p className='formTitle'>Login to your account</p>

            <div id='email'
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Email Address</p>
                    {/* <p className={errors?.error ? 'error' : 'hidden' }>{errors?.error}</p> */}
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