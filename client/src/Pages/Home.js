import { useContext } from "react";
import { UserContext } from "../App";

function Home(){

    console.log(useContext(UserContext))

    return ( 
        <div>
            This is the home
        </div>
     );
}

export default Home;