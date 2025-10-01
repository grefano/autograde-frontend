import Prism from 'prismjs'
import 'prismjs/themes/prism-dark.css'
import 'prismjs/components/prism-python.js'

import { useEffect } from 'react'

interface Props{
    code: string,
    language: string

}

export default function CodeBlock({code, language}: Props){
    useEffect(() => {
        Prism.highlightAll()
    }, [code, language])
    return (<pre><code className={`language-${language}`}>{code}</code></pre>)
}