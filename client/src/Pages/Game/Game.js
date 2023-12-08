import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateChar, submitGuess, clearGameError, clearGameBoard } from "../../Redux/Slices/gameSlice";
import { updateGuessDistribution } from "../../Redux/Slices/statSlice";
import { useState } from 'react'
import Row from "./Row";

function Game({toggleStatistics}) {
    const dispatch = useDispatch()
    const game = useSelector(state => state.game.entity)
    const gameBoard = game?.game_board
    const error = useSelector(state => state.game.error)


    const [ col, setCol ] = useState(0)
    const [ row, setRow ] = useState(0)


    useEffect(()=>{ 
        setRow(game?.attempt)
    },[game?.attempt])

    useEffect(()=>{
        if(game?.progress !== 'pending'){
            if( game?.progress === 'won') dispatch(updateGuessDistribution(row))
            setTimeout(()=>{
                toggleStatistics()
                dispatch(clearGameBoard())
            }, 3000)

        } 
    },[game?.progress])

    const tile = row.toString()+col.toString()
   
    function handleKeyDown(e){

        if(/^[a-zA-z]$/.test(e.key)){
            if( col < 5 ){ 
                dispatch(updateChar({index: col, char: e.key}))
                if(col < 4) setCol(col + 1)    
            }
        }
        else if( e.key === 'Backspace' ){
            if( col > 0){ 
                if(gameBoard[row][col].char !== ''){
                    dispatch(updateChar({index: col, char: ''}))
                }else{
                    dispatch(updateChar({index: col-1, char: ''}))
                    setCol(col - 1)  
                }
            }
        }        
        else if( e.key === 'Enter' ){
            handleSubmit()
        }
    }

    function handleSubmit(){

        if(row < 7){ 

            dispatch(submitGuess(gameBoard[row].map( a => a.char).join(''))).then(res => {
            
                if(res.meta.requestStatus === 'fulfilled'){
                    setRow(row+1)
                    setCol(0)        
                }else{
                    setTimeout(()=>{
                        dispatch(clearGameError())
                    }, 3000)
                }
            })         
        }
    }

    const renderRows = gameBoard.map( (r, index) => {
        return <Row key={index} i={index} gameBoard={gameBoard} tile={tile} row={row} error={error} />
    })

    return ( 

        <div className='h-[92svh] grid place-content-center' onKeyDown={handleKeyDown} tabIndex={0}>
            
            <div className={`absolute top-[20%] w-full ${(!error?.errors) && 'hidden'}`}>
                <p className='bg-black text-white w-fit px-4 py-2 rounded-md mx-auto '>{error?.errors?.word[0]}</p>
            </div>

            <div className={`absolute top-[20%] w-full ${game?.progress !== 'won' && 'hidden'}`}>
                <p className='bg-black text-white w-fit px-4 py-2 rounded-md mx-auto '>{game?.word}</p>
            </div>

            <div className={`absolute top-[20%] w-full ${game?.progress !== 'lost' && 'hidden'}`}>
                <p className='bg-black text-white w-fit px-4 py-2 rounded-md mx-auto'>{game?.word}</p>
            </div>


            <div className='grid place-content-center gap-2' tabIndex={0}>

                
                { renderRows }

                {/* <button className='bg-black text-white h-[60px] w-full' onClick={handleSubmit}> enter </button> */}

            </div>



        </div>
     );
}

export default Game;