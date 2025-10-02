import { useNavigate } from "react-router-dom"
import CodeBlock from "../../components/code_block/CodeBlock"
import { useClassroom } from "../../ContextClassroom"
import './Code.css'

import Editor from '@monaco-editor/react'
import { useEffect, useState } from "react"
import type { ISubmission } from "../../util/types"

interface PropsEditor{
    code: string,
    language: string,
    onChange: (value: string | undefined) => void
}
function VSCodeEditor({code, language, onChange}: PropsEditor){
    return (
        <Editor 
            height='100vh'
            defaultLanguage={language}
            defaultValue={code}
            theme='vs-dark'
            onChange={onChange}
            options={{
                minimap: {enabled: false}
            }}
        />
    )
}

export default function Code(){
    const {submission_selected} = useClassroom()
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    if (submission_selected == null){
        navigate('/')
    }
    const handleSubmit = () => {
        let body = JSON.stringify({membertoken: (submission_selected as ISubmission).owner_token, code: code})
        console.log('body', body)
        fetch(import.meta.env.VITE_SERVER_URL+'api/code/return', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenteacher')}`,
                'Content-Type': 'application/json'
            },
            body
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            console.log('data return code', data)
        })
    }
    useEffect(() => {
        setCode((submission_selected as ISubmission).code)
    }, [])
    
    return (<>
        <button id='btn-send-code' className="btn-icon font-gg material-symbols-rounded" onClick={handleSubmit}>upload</button>
        <VSCodeEditor code={code as string} language="python" onChange={(value) => setCode(value as string)}/>
    </>)
}