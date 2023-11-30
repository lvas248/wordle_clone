import { useState } from 'react'
import Row from './Row'

function Game() {

    const [ guessWord, setGuessWord ] = useState([['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']])

    const [ rowNumber, setRowNumber ] = useState(0)

    function updateRowNumber(){
        console.log(rowNumber)
        rowNumber < 5 && setRowNumber(rowNumber+1)
    }

    function updateGuessWord(e){

        if(/^[a-zA-z]$/.test(e.target.value)){

            const copy = [...guessWord]
            copy[rowNumber][e.target.name] = e.target.value
            setGuessWord(copy)
            console.log(e.target.name)
            if(parseInt(e.target.name) < 4){
                const current = document.getElementById(e.target.id)
                current.nextSibling.focus()                 
            }
           
        }
 
    }

    function handleKeyDown(e){

        if(e.key === 'Backspace'){
            const copy = [...guessWord]
            copy[rowNumber][e.target.name] = ''
            setGuessWord(copy)

            if(parseInt(e.target.name) > 0){
                const current = document.getElementById(e.target.id)
                current.previousSibling.focus()                 
            }
        }
    }

    const renderRows = []
    
    for( let i=0; i < 6; i++){
        renderRows.push(<Row key={i} i={i} rowNumber={rowNumber} handleKeyDown={handleKeyDown} updateGuessWord={updateGuessWord} guessWord={guessWord} />)
    }


    return ( 

        <div className='min-h-[95svh] bg-white grid gap-2 place-content-center'>
            { renderRows}

            <button onClick={updateRowNumber} className='border border-black py-5 bg-black text-white'>Enter</button>
        </div> 
    );
}

export default Game;