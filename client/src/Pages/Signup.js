import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../Redux/Slices/sessionSlice'

function Signup(){

    const dispatch = useDispatch()
    const errors = useSelector( state => state.session.error)

    const [ signupObj, setSignupObj ] = useState({
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
    })

    const navigate = useNavigate()

    function updateSignupObj(e){
        const copy = {...signupObj}
        copy[e.target.name] = e.target.value
        setSignupObj(copy)
    }

    function submitSignup(e){
        e.preventDefault()
        dispatch(signupUser(signupObj))
        .then(res => {
            if(res.meta.requestStatus === 'fulfilled') navigate('/')
        })

    }

    return ( 
        
        <form onSubmit={submitSignup} className='form' >

            <p className='formTitle'>Create your free account</p>

            <div id='email'
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Email Address</p>
                    {/* <p className={errors.username ? 'error' : 'hidden' }>{errors.username}</p> */}
                </div>

                <input name='email' value={signupObj.email} onChange={updateSignupObj} type='email' className='formInput' />

            </div>

            <div id='username'
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Username</p>
                    {/* <p className={errors.username ? 'error' : 'hidden' }>{errors.username}</p> */}
                </div>

                <input name='username' value={signupObj.username} onChange={updateSignupObj} className='formInput' />

            </div>

            <div id='password' 
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Password</p>
                    {/* <p className={errors.password ? 'error' : 'hidden' }>{errors.password}</p> */}
                </div>

                <input name='password' value={signupObj.password} onChange={updateSignupObj} type='password' className='formInput' />

            </div>

            <div id='password_confirmation' 
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Confirm Pasword</p>
                    {/* <p className={errors.password_confirmation ? 'error' : 'hidden' }>{errors.password_confirmation}</p> */}
                </div>

                <input name='password_confirmation' value={signupObj.password_confirmation} type='password' onChange={updateSignupObj} className='formInput' />
            </div>

            <button className='formSubmit'>Create Account</button>

        </form>
     );
}

export default Signup;