import './Submission.css'

import type { ISubmission } from "../../util/types";
import CodeBlock from '../code_block/CodeBlock';
import { useClassroom } from '../../ContextClassroom';

interface Props extends ISubmission{
    index: number
}

export default function Submission({lang, code, owner_name, owner_token, view_state, index, created}: Props){
    
    const {handle_view_submission, handle_ignore} = useClassroom()

    return (<div id='ctn-submission'>
            <div id='ctn-submission-header'>
                <span id='submission-title' className='font-p' onClick={() => handle_view_submission({code, owner_name, owner_token, lang, created})}>{owner_name}.{lang}</span> 
                <button id='submission-btn-ignore' className='btn-icon material-symbols-rounded' onClick={() => handle_ignore(index)}>close_small</button>

            </div>
            {view_state == 'pending' ? <CodeBlock language='python' code={code}/> : null}
        </div>)
}