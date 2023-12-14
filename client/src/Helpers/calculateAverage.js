export function calculateAverage(guess_distribution){

   return guess_distribution?.reduce((acc, currentVal, index) => acc + (currentVal * index) ) /
    guess_distribution.reduce((acc, currentVal) => acc + currentVal )
    

}