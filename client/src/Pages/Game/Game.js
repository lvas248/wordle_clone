import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearGameError, submitGuess, updateChar, clearGameBoard } from '../../Redux/Slices/gameSlice'
import WinnerPage from './StatisticsPage'
import Row from './Row'

function Game({toggleStatistics}) {
    const dispatch = useDispatch()
    const game = useSelector(state => state.game.entity)   
    const gameBoard = game?.game_board
    const rowNumber = game?.attempt 
    const error = useSelector(state => state.game.error)
    
    const [ displayMessage, setDisplayMessage ] = useState({ display: false, message: '' })

    useEffect(()=>{        
        if(game.progress === 'pending'){
            console.log('yes')
            const nextRow = document.getElementById(rowNumber)
            nextRow?.firstChild?.focus()            
        }
    }, [rowNumber])

    useEffect(()=>{
        if(game?.progress !== 'pending'){
            setTimeout(()=>{
                toggleStatistics()
                dispatch(clearGameBoard())
            }, 3000)

        } 
    },[game?.progress])


    function updateGameBoard(e){

        if(/^[a-zA-z]$/.test(e.target.value)){
            dispatch(updateChar({ index: e.target.name, char: e.target.value }))

            if(parseInt(e.target.name) < 4){
                const current = document.getElementById(e.target.id)
                current.nextSibling.focus()                 
            }
           
        }
 
    }

    function handleKeyDown(e){

        if(e.key === 'Backspace'){
            dispatch(updateChar({ index: e.target.name, char: ''}))

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

        if(rowNumber < 6) dispatch(submitGuess(gameBoard[rowNumber].map( a => a.char).join(''))).then(res => {
            
            if(res.meta.requestStatus === 'fulfilled'){ 
            }else{
                setTimeout(()=>{
                    console.log('clear error')
                    dispatch(clearGameError())
                }, 3000)
            }
        })         
    }

    return ( 

        <form onSubmit={submitAttempt} className='min-h-[95svh] bg-white grid gap-2 place-content-center relative'>

            <div className={`absolute top-[20%] w-full ${(!error?.errors) && 'hidden'}`}>
                <p className='bg-black text-white w-fit px-4 py-2 rounded-md mx-auto animate-bounce'>{error?.errors?.word[0]}</p>
            </div>

            <div className={`absolute top-[20%] w-full ${game?.progress !== 'won' && 'hidden'}`}>
                <p className='bg-black text-white w-fit px-4 py-2 rounded-md mx-auto animate-bounce'>{game?.word}</p>
            </div>

            <div className={`absolute top-[20%] w-full ${game?.progress !== 'lost' && 'hidden'}`}>
                <p className='bg-black text-white w-fit px-4 py-2 rounded-md mx-auto animate-bounce'>{game?.word}</p>
            </div>
            
            { renderRows }

            <button className='border border-black py-5 bg-black text-white'>Enter</button>
        </form> 
    );
}

export default Game;