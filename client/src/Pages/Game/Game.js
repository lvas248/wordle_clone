import { useState, useEffect } from 'react'
import WinnerPage from './StatisticsPage'
import Row from './Row'

function Game({toggleStatistics}) {

    const [ gameBoard, setGameBoard ] = useState([
        [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
        [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
        [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
        [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
        [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
        [{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false },{ char: '', correct: false, exists: false }],
    ])

    useEffect(()=>{
        fetch('/game', {
            method: 'POST',
        }).then(res =>  {
            if(res.ok){
                res.json()
                .then(data => {
                    const copy = [...gameBoard]
                    data.guesses.forEach( g => copy[data.guesses.indexOf(g)] = g.result )
                    setGameBoard(copy)
                    setRowNumber(data.guesses.length)
                    const current = document.getElementById(data.guesses.length)
                    current.firstChild.focus()
                   
                })

            }
        })
    // eslint-disable-next-line 
    },[])


    const [ rowNumber, setRowNumber ] = useState(0)

    function updateRowNumber(){
        rowNumber < 5 && setRowNumber(rowNumber+1)
    }

    function updateGameBoard(e){
        if(/^[a-zA-z]$/.test(e.target.value)){

            const copy = [...gameBoard]
            copy[rowNumber][e.target.name].char = e.target.value
            setGameBoard(copy)
            if(parseInt(e.target.name) < 4){
                const current = document.getElementById(e.target.id)
                current.nextSibling.focus()                 
            }
           
        }
 
    }

    function handleKeyDown(e){

        if(e.key === 'Backspace'){
            const copy = [...gameBoard]
            copy[rowNumber][e.target.name].char = ''
            setGameBoard(copy)

            if(parseInt(e.target.name) > 0){
                const current = document.getElementById(e.target.id)
                current.previousSibling.focus()                 
            }
        }
    }

    const renderRows = []
    
    for( let i=0; i < 6; i++){
        renderRows.push(<Row key={i} i={i} rowNumber={rowNumber} handleKeyDown={handleKeyDown} updateGameBoard={updateGameBoard} gameBoard={gameBoard} />)
    }

    function submitAttempt(e){
        e.preventDefault()
        fetch('/guess',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({ guess: { word: gameBoard[rowNumber].map( a => a.char).join('')}})
        })
        .then( res => {
            if(res.ok){
                res.json()
                .then(data => {
                    console.log(data)
                    const copy = [...gameBoard]
                    copy[rowNumber] = data.result
                    setGameBoard(copy)
                    if(data.game_status === 'won'){
                        console.log('won')
                        setTimeout(()=>{
                            toggleStatistics()
                        },1000)
                    }
                    const nextRow = document.getElementById(rowNumber+1)
                    nextRow.firstChild.focus()
                    updateRowNumber()                        
                    

                })
            }else{ res.json().then(error => console.log(error))}
        })
       
    }

    return ( 

        <form onSubmit={submitAttempt} className='min-h-[95svh] bg-white grid gap-2 place-content-center relative'>
            { renderRows}

            <button className='border border-black py-5 bg-black text-white'>Enter</button>
        </form> 
    );
}

export default Game;