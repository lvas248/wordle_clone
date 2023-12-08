function Row({i, gameBoard, row, error}) {
   
    const renderInputs = []

    for(let n=0; n<5; n++){

        const { char, correct, exists } = gameBoard[i][n]

        const classes = ` 
            tile       
            ${ i < row && 'text-white border-none animate-flip'}
            ${ correct && 'bg-[#6aa964]'}
            ${ (!correct && exists) && 'bg-[#c9b458] '}
            ${(!correct && !exists && i<row )  && 'bg-[#787c7e]'} 
            `
        
        renderInputs.push( 
            <div 
                key={n} 
                id={i.toString()+ n.toString()} 
                className={classes}
                style={{ animationDelay: `${40*n}ms` }}
            >
                {char}
            </div>
        )
    }
    
    return ( 
            <div id={i} className={`flex gap-2 ${( error && row === i ) && 'animate-vibrate' }`}>
                {renderInputs}
            </div>
        );
}

export default Row;