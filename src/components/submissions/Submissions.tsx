
import "./Submissions.css"


import type { ISubmission } from "../../util/types"
import Submission from "../submission/Submission"
interface Props {
    submissions: ISubmission[]
}
function Submissions({submissions}: Props){
    
    console.log(submissions)

    return (<div id='ctn-submissions'>
        {submissions.map(submission => (
            <Submission {...submission} />
        ))}
    </div>)
}


export default Submissions