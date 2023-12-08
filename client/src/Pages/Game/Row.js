function Row({i, gameBoard, tile, row}) {
   
    const renderInputs = []

    for(let n=0; n<5; n++){

        const { char, correct, exists } = gameBoard[i][n]

        const bgColor = correct ? '#6aa964' : ( exists ? '#c9b458' : '#787c7e' )
        
        console.log(i < row)
        renderInputs.push( 
            <div key={n} id={i.toString()+ n.toString()} 
                className={
                    `       
                    tile 
                    ${ correct && 'bg-[#6aa964]'}
                    ${ (!correct && exists) && 'bg-[#c9b458] '}
                    ${(!correct && !exists && i<row )  && 'bg-[#787c7e]'} 
                    ${ i < row && 'text-white border-none'}

                    `}>

                    {char}
            </div>
        )
    }
    
    return ( 
            <div id={i} className='flex gap-2'>
                {renderInputs}
            </div>
        );
}

export default Row;