import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Classroom.css"
import Submissions from "../../components/submissions/Submissions"

export default function Classroom(){
    const [submissions, setSubmissions] = useState<any[]>([])
    const [members, setMembers] = useState<string[]>([])
    const {password} = useParams()
    const navigate = useNavigate()

    const fetchSubmissions = async () => {
        const response = await fetch(import.meta.env.VITE_SERVER_URL+'api/class', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenteacher')}`
            }
        })
        const data = await response.json()
        console.log(data)
        setSubmissions(data.submissions)
        setMembers(data.members)
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
        <button onClick={handleDelete} className="btn-icon font-gg material-symbols-rounded">close_small</button>
        <div id='ctn-page-classroom'>
            <h1 className="font-gg color-dark" style={{margin: '0'}}>{password}</h1>
            <button onClick={handleFinish} className="btn-main font-m color-dark" style={{marginTop: '20px'}}>Finalizar Envios</button>
            <h2 style={{margin: 0, marginTop: '50px'}} className="color-dark font-m">Membros</h2>
            <div id='ctn-members-joined'>
                {members.map((value: string) => (
                    <span className="font-p color-dark ">{value}</span>
                ))}
            </div>
            <Submissions submissions={submissions}/> 
      </div>
    </>)
}