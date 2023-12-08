function LeaderBoard({display, toggleDisplay}) {
    return ( 
        
        <div className={`${display ? 'grid' : 'hidden' } bg-white text-black absolute top-0 h-[100svh] w-[100vw] grid place-content-center z-50`}>
            
            LeaderBoard


            <button onClick={toggleDisplay}>Back</button>
        </div> 
    
    );
}

export default LeaderBoard;