import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../App'
import WinnerPage from './StatisticsPage'
import Row from './Row'

function Game({toggleStatistics}) {

    const [ user, setUser ] = useContext(UserContext)

    const [ displayMessage, setDisplayMessage ] = useState({ display: false, message: ''})

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
        if(rowNumber < 6){
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
                            //update state
                            setUser({...user, stats: {...user.stats, games_played: user.stats.games_played + 1, games_won: user.stats.games_won + 1}})
                            setDisplayMessage({display: true, message: 'You Win!'})
                            setTimeout(()=>{
                                toggleStatistics()
                            }, 3000)
                        }else if(data.game_status === 'lost'){
                            setDisplayMessage({display: true, message: 'You Lose'})
                            setUser({...user, stats: {...user.stats, games_played: user.stats.games_played + 1}})
                            setTimeout(()=>{
                                toggleStatistics()
                            }, 3000)

                        }

                        if( rowNumber < 5){
                            const nextRow = document.getElementById(rowNumber+1)
                            nextRow.firstChild.focus()
                            updateRowNumber()                    
                        }

                        
                        

                    })
                }else{ res.json().then(error => {
                    console.log(error.errors)
                    setDisplayMessage({display: true, message: error.errors.word[0]})
                    setTimeout(()=>{
                        setDisplayMessage({...displayMessage, display: false})
                    },3000)
                })}
            })            
        }

       
    }

    return ( 

        <form onSubmit={submitAttempt} className='min-h-[95svh] bg-white grid gap-2 place-content-center relative'>
            
            <div className={`absolute top-[20%] w-full ${!displayMessage?.display && 'hidden'}`}>
                <p className='bg-black text-white w-fit px-4 py-2 rounded-md mx-auto animate-bounce'>{displayMessage.message}</p>
            </div>
            
            { renderRows }

            <button className='border border-black py-5 bg-black text-white'>Enter</button>
        </form> 
    );
}

export default Game;