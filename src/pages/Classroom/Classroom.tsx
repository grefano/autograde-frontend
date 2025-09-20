import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface Isubmission {
    lang: 'py' | 'c'
    code: string
}

export default function Classroom(){
    const [submissions, setSubmissions] = useState([])
    const {password} = useParams()

    const fetchSubmissions = async () => {
        const response = await fetch(import.meta.env.VITE_SERVER_URL+'api/class/submission', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('classpassword')} ${localStorage.getItem('tokenteacher')}`
            }
        })
        const data = await response.json()
        setSubmissions(data)
    }
    useEffect(() => {
        fetchSubmissions()
        const intervalId = setInterval(fetchSubmissions, 4000)
        return () => clearInterval(intervalId)
    }, [])
    const handleFinish = () => {
        fetch(import.meta.env.VITE_SERVER_URL+'api/class/close', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${password} ${localStorage.getItem('tokenteacher')}`
            }
        })
    }

    return (<>
        <h1>{password}</h1>
        {submissions.length && submissions.map((value: Isubmission) => {
            <div>{value.lang}</div>
        })}
        <button onClick={handleFinish}>Finalizar Envios</button>
    </>)
}