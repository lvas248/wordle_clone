function Keyboard({handleKeyDown, gameBoard, row}) {

    const topRow = 'qwertyuiop'.toUpperCase()
    const middleRow = 'asdfghjkl'.toUpperCase()
    const bottomRow = 'zxcvbnm'.toUpperCase()

    const correctPool = []
    const existsPool = []
    const notPool = []
        
    gameBoard?.slice(0,row).forEach( g => {
        g.forEach( c => {
            if(c.correct) correctPool.push(c.char)
            else if(c.exists) existsPool.push(c.char)
            else notPool.push(c.char)
        })
    } )

    function bgColor(c){
        if(correctPool.includes(c.toLowerCase())) return 'bg-[#6aa964] text-white'
        else if(existsPool.includes(c.toLowerCase())) return 'bg-[#c9b458] text-white'
        else if(notPool.includes(c.toLowerCase())) return 'bg-[#787c7e] text-white'
        else return 'bg-[#d3d6da]'
    }

    function renderKeyRow(row){
        return row.split('').map( c => {
            return <button key={c} onClick={()=>handleKeyDown(c)} className={`keyBoardBtn ${bgColor(c)}`}>{c}</button>
        })
    }

    return ( 
        <div className='mt-10 grid gap-2'>

            <div className='w-full flex  place-content-center gap-2'>
                
                { renderKeyRow(topRow) }
           
            </div>

            <div className='w-full flex  place-content-center gap-2'>
                
                { renderKeyRow(middleRow) }
           
            </div>

            <div className='w-full flex  place-content-center gap-2'>
                
                <button onClick={()=> handleKeyDown('Enter')} className='keyBoardBtn w-[65px] text-sm' >ENTER</button>
                
                { renderKeyRow(bottomRow) }
                
                <button onClick={()=>handleKeyDown('Backspace')} className='keyBoardBtn w-[65px] text-sm'>DELETE</button>
            
            </div>

        </div> 
    );
}

export default Keyboard;