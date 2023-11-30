function Row({i, handleKeyDown, rowNumber, updateGuessWord, guessWord}) {
   
    const renderInputs = []

    for(let n=0; n<5; n++){
        renderInputs.push(<input key={n} id={`${i}${n}`} name={n} onKeyDown={handleKeyDown} onChange={updateGuessWord} value={guessWord[i][n]}  className={`gameInput ${ rowNumber === i && 'border-2 border-black'}`} maxLength='1' tabIndex='1' disabled={ rowNumber !== i && true}/>
        )
    }
    
    return ( 
        <div id={i} className='flex gap-2'>
            {renderInputs}
        </div>
        );
}

export default Row;