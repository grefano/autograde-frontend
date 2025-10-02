import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { ISubmission } from "./util/types"
import { useNavigate } from "react-router-dom"

interface IContextClassroom{
    submissions: ISubmission[],
    members: Record<string, string>,
    submission_selected: null | ISubmission,
    password: null | string,
    setPassword: Dispatch<SetStateAction<string | null>>,
    handle_view_submission: (submission: ISubmission) => void
}
const ContextClassroom = createContext<IContextClassroom | null>(null)

export function useClassroom(){
    const context = useContext(ContextClassroom)
    if (!context){
        throw new Error('useClassroom must be used within ProviderClassroom')
    }
    return context
}

interface PropsProvider{
    children: React.ReactNode
}
export function ProviderClassroom({children}: PropsProvider){
    const [submissions, setSubmissions] = useState<ISubmission[]>([])
    const [members, setMembers] = useState<Record<string, string>>({})
    const [submissionSelected, setsubmissionSelected] = useState<null | ISubmission>(null)
    const [password, setPassword] = useState<null | string>(null)
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


    const value = {
        submissions,
        members,
        submission_selected: submissionSelected,
        password,
        setPassword,
        handle_view_submission: (submission: ISubmission) => {
            setsubmissionSelected(submission)

            navigate('/classroom/'+password+'/code')
        }
    }
    console.log(value)
    return <ContextClassroom.Provider value={value}>{children}</ContextClassroom.Provider>

}