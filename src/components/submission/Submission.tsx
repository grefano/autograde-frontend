import './Submission.css'

import type { ISubmission } from "../../util/types";
import CodeBlock from '../code_block/CodeBlock';

export default function Submission({lang, code, owner}: ISubmission){
    return (<div id='ctn-submission'><span id='submission-title' className='font-p'>{owner}.{lang}</span> 
            <CodeBlock language='python' code={code}/>
        </div>)
}