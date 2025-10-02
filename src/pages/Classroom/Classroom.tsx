import { useNavigate, useParams } from "react-router-dom"
import "./Classroom.css"
import Submissions from "../../components/submissions/Submissions"
import { useClassroom } from "../../ContextClassroom"
import { useEffect } from "react"

export default function Classroom(){

    const navigate = useNavigate()
    const {members, submissions, password, setPassword} = useClassroom()
    const {paramPassword} = useParams()

    useEffect(() => {
        setPassword(paramPassword as string)
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
                {(Object.values(members)).map(value => (
                    <span className="font-p color-dark ">{value}</span>
                ))}
            </div>
            <Submissions submissions={submissions}/> 
      </div>
    </>)
}