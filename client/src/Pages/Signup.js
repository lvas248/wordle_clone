import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../App'

function Signup(){

    const [ ,setUser] = useContext(UserContext)
    const [ errors, setErrors] = useState([])

    const [ signupObj, setSignupObj ] = useState({
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
    })

    function updateSignupObj(e){
        const copy = {...signupObj}
        copy[e.target.name] = e.target.value
        setSignupObj(copy)
    }


    function submitSignup(e){
        e.preventDefault()
        fetch('/signup',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({user: signupObj})
        }).then( res => {
            if(res.ok){
                res.json()
                .then(data => setUser({...data, loggedIn: true}))
            }else{
                res.json()
                .then(data => setErrors(data.errors))
            }
        })
    }

    return ( 
        <form onSubmit={submitSignup} className='form' >

            <p className='formTitle'>Create your free account</p>

            <div id='email'
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Email Address</p>
                    <p className={errors.username ? 'error' : 'hidden' }>{errors.username}</p>
                </div>

                <input name='email' value={signupObj.email} onChange={updateSignupObj} type='email' className='formInput' />

            </div>

            <div id='username'
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Username</p>
                    <p className={errors.username ? 'error' : 'hidden' }>{errors.username}</p>
                </div>

                <input name='username' value={signupObj.username} onChange={updateSignupObj} className='formInput' />

            </div>

            <div id='password' 
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Password</p>
                    <p className={errors.password ? 'error' : 'hidden' }>{errors.password}</p>
                </div>

                <input name='password' value={signupObj.password} onChange={updateSignupObj} type='password' className='formInput' />

            </div>

            <div id='password_confirmation' 
                className='inputContainer'>

                <div className='flex justify-between'>
                    <p className='inputLabel'>Confirm Pasword</p>
                    <p className={errors.password_confirmation ? 'error' : 'hidden' }>{errors.password_confirmation}</p>
                </div>

                <input name='password_confirmation' value={signupObj.password_confirmation} type='password' onChange={updateSignupObj} className='formInput' />
            </div>

            <button className='formSubmit'>Create Account</button>

        </form>
     );
}

export default Signup;