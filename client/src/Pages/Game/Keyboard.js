function Keyboard({handleKeyDown, gameBoard}) {

    const topRow = 'qwertyuiop'.toUpperCase()
    const middleRow = 'asdfghjkl'.toUpperCase()
    const bottomRow = 'zxcvbnm'.toUpperCase()



    const renderTopRow = topRow.split('').map( c =>{
        return <button key={c} onClick={()=>handleKeyDown(c)} className='keyBoardBtn'>{c}</button>
    })

    const renderMiddleRow = middleRow.split('').map( c =>{
        return <button key={c} onClick={()=>handleKeyDown(c)} className='keyBoardBtn'>{c}</button>
    })

    const renderBottomRow = bottomRow.split('').map( c =>{
        return <button key={c} onClick={()=>handleKeyDown(c)} className='keyBoardBtn'>{c}</button>
    })

    return ( 
        <div className='mt-10 grid gap-2'>

            <div className='w-full flex place-content-center gap-2'>
                {renderTopRow}
            </div>

            <div className='w-full flex place-content-center gap-2'>
                {renderMiddleRow}
            </div>

            <div className='w-full flex place-content-center gap-2'>

                <button onClick={()=> handleKeyDown('Enter')} className='keyBoardBtn w-[65px] text-sm' >ENTER</button>

                {renderBottomRow}

                <button onClick={()=>handleKeyDown('Backspace')} className='keyBoardBtn w-[65px] text-sm'>DELETE</button>

            </div>

        </div> 
    );
}

export default Keyboard;