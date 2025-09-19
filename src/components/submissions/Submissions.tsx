
import axios from "axios"
import "./Submissions.css"




const fetch_submissions = async () => {
    const response = await axios.get(import.meta.env.VITE_SERVER_URL + `api/class/submissions`)
}

function Submissions(){
    
    

    return (<>admwaddjwad</>)
}


export default Submissions