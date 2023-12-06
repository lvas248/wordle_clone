function Row({i, handleKeyDown, rowNumber, updateGameBoard, gameBoard}) {
   
    const renderInputs = []

   
    for(let n=0; n<5; n++){
        renderInputs.push(<input key={n} id={`${i}${n}`} name={n} onKeyDown={handleKeyDown} onChange={updateGameBoard} value={gameBoard && gameBoard[i][n]?.char}  
        className={`
            gameInput 
            ${ rowNumber === i && 'border-2 border-black' } 
            ${ gameBoard[i][n]?.correct && 'bg-[#6aa964] text-white' }  
            ${ (gameBoard[i][n]?.exists && !gameBoard[i][n]?.correct) && 'bg-[#c9b458] text-white'} 
            
            `} 
            tabIndex='1' disabled={ rowNumber !== i && true}/>
        )
    }
    
    return ( 
            <div id={i} className='flex gap-2'>
                {renderInputs}
            </div>
        );
}

export default Row;