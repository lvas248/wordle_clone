export function calculateAverage(guess_distribution){

    const guesses = guess_distribution?.reduce((acc, currentVal, index) => acc + (currentVal * (index + 1)) ) 
    const gamesWon = guess_distribution.reduce((acc, currentVal) => acc + currentVal )
    
    return (guesses / gamesWon).toFixed(1)

}