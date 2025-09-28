import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface Isubmission {
    lang: 'py' | 'c'
    code: string
}

export default function Classroom(){
    const [submissions, setSubmissions] = useState([])
    const {password} = useParams()
    const navigate = useNavigate()

    const fetchSubmissions = async () => {
        const response = await fetch(import.meta.env.VITE_SERVER_URL+'api/class/submission', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenteacher')}`
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
                'Authorization': `Bearer ${localStorage.getItem('tokenteacher')}`
            }
        }).then(response => response.json()).then(data => {
            console.log('finish, data: ', data)
        })
    }
    const handleDelete = () => {
        fetch(import.meta.env.VITE_SERVER_URL+'api/class', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenteacher')}`
            }
        })
        navigate('/')
    }

    return (<>
        <button onClick={handleDelete}>fechar sala</button>
        <h1>{password}</h1>
        {submissions.length && submissions.map((value: Isubmission) => {
            <div>{value.lang}</div>
        })}
        <button onClick={handleFinish}>Finalizar Envios</button>
    </>)
}