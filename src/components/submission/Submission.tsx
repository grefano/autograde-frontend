import './Submission.css'

import type { ISubmission } from "../../util/types";
import CodeBlock from '../code_block/CodeBlock';
import { useClassroom } from '../../ContextClassroom';

export default function Submission({lang, code, owner_name, owner_token}: ISubmission){
    const {handle_view_submission} = useClassroom()
    return (<div id='ctn-submission'><span id='submission-title' className='font-p' onClick={() => handle_view_submission({code, owner_name, owner_token, lang})}>{owner_name}.{lang}</span> 
            <CodeBlock language='python' code={code}/>
        </div>)
}