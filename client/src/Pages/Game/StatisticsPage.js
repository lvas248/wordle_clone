import { useNavigate } from 'react-router-dom'

function StatisticsPage({display, toggleDisplay}) {

    const navigate = useNavigate()

    function navigateHome(){
        navigate('/')
        toggleDisplay()
    }

    return ( 
        <div className={`${display ? 'grid' : 'hidden' } bg-white text-black absolute top-[20%] right-[25vw] h-[55svh] w-[50vw] drop-shadow-xl z-50 rounded-2xl`}>
            
                <p className='text-2xl font-bold uppercase m-auto'>statistics</p>

                <button onClick={navigateHome} className='border border-black px-5 h-fit w-fit m-auto rounded-2xl'>home</button>
            


        </div> 
    );
}

export default StatisticsPage;