import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Squash as Hamburger } from 'hamburger-react'

function Navbar() {

    const [ isOpen, setIsOpen ] = useState(false)
    
    function toggleOpen(){
        setIsOpen(!isOpen)
    }

    const renderNavItems = [ 'home', 'signup', 'login', 'page3' ].map( n =>{
        return  <Link 
                    key={n}
                    onClick={toggleOpen}
                    className={`navItem`}
                    to={`/${n}`}
                >{n}</Link>
    })


    return ( 
    
        <div className='navContainer '>
                
            <button onClick={()=>console.log('navigate Home')} className='logo' >
                <p>App Logo</p>
            </button>
            
            <div className='md:hidden pr-[3svw]'>
                <Hamburger toggled={isOpen} toggle={setIsOpen} size={25}  />
            </div>

            <div className={`absolute top-[8svh] bg-white w-full z-50 font-bold flex flex-col divide-y divide-slate-300 md:mediumDropDown transform-h duration-300  ${isOpen ? ' border-b border-black max-h-[100svh]': 'max-h-0 overflow-hidden md:flex md:max-h-fit' } `}
            >
                {renderNavItems}
            </div>

        </div>
    );
}

export default Navbar;