import { useNavigate } from "react-router-dom";

function HowTo() {

    const navigate = useNavigate()

    function goBack(){
        navigate(-1)
    }

    return ( <div className='h-[100svh] w-full grid place-content-center p-4'>

                <div className='w-fit max-w-[520px] p-5 mx-auto bg-white rounded-lg shadow-xl grid gap-4'>

                    <div>
                        <h1 className='text-[28px] font-bold'>How To Play</h1>
                        <h2 className='text-[20px]'>Guess the Word in 6 tries.</h2>
                    </div>

                    <ul className='pl-5 list-disc text-[16px]'>
                        <li>Each guess must be a 5-letter word.</li>
                        <li>The color of the tiles will change to show how close your guess was to the word.</li>
                    </ul>

                    <div>
                        <p className='text-[16px] font-bold mb-[1vh]'>Examples</p>

                        <div className='flex gap-1'>
                            <p className='howToTile bg-[#6aa964] text-white'>W</p>
                            <p className='howToTile'>E</p>
                            <p className='howToTile'>A</p>
                            <p className='howToTile'>R</p>
                            <p className='howToTile'>Y</p>
                        </div>

                        <p><span className='font-bold'>W</span> is in the word and in the correct spot.</p>

                    </div>

                    <div>
                        <div className='flex gap-1'>
                            <p className='howToTile'>P</p>
                            <p className='howToTile bg-[#c9b458] text-white'>I</p>
                            <p className='howToTile'>L</p>
                            <p className='howToTile'>L</p>
                            <p className='howToTile'>S</p>
                        </div>

                        <p><span className='font-bold'>I</span> is in the word but in the wrong spot.</p>

                    </div>

                    <div>
                        <div className='flex gap-1'>
                            <p className='howToTile'>V</p>
                            <p className='howToTile'>A</p>
                            <p className='howToTile'>G</p>
                            <p className='howToTile bg-[#787c7e] text-white'>U</p>
                            <p className='howToTile'>E</p>
                        </div>

                        <p><span className='font-bold'>U</span> is not in the word in any spot.</p>

                    </div>

                    <button onClick={goBack} className='bg-black text-white uppercase rounded-md font-bold h-[5svh] w-full max-w-[500px] mx-auto'>back</button>


                
                </div>
                
            </div> 
    );
}

export default HowTo;