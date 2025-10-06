
import "./Submissions.css"


import type { ISubmission } from "../../util/types"
import Submission from "../submission/Submission"
interface Props {
    submissions: ISubmission[]
}
function Submissions({submissions}: Props){
    
    console.log(submissions)



    return (<><div id='ctn-submissions'>
            {submissions.map((submission, index) => (
                ( submission.view_state == 'pending' ? <Submission {...submission} index={index}/> : null )
            ))}
        </div>
        {/* <div id='ctn-submissions-ignored'>
            {submissions.map((submission, index) => (
                ( submission.view_state == 'ignored' ? <Submission {...submission} index={index}/> : null)  
            ))}

        </div> */}
    </>
    )
}


export default Submissions