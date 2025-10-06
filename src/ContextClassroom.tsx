import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import type { ISubmission } from "./util/types"
import { useNavigate } from "react-router-dom"

interface IContextClassroom{
    submissions: ISubmission[],
    members: Record<string, string>,
    submission_selected: null | ISubmission,
    password: null | string,
    setPassword: Dispatch<SetStateAction<string | null>>,
    handle_view_submission: (submission: ISubmission) => void,
    handle_ignore: (index: number) => void
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
    
    // const setSubmissionWhen = (callbackFn: (prev: ISubmission[], checkval: ISubmission) => boolean) => {
    //     setSubmissions((previousValue) => {
    //         const newsubmissions = (data.submissions as ISubmission[]).reduce((acc: ISubmission[], val) => {
                
    //             if (callbackFn(previousValue, val)) {
    //                 acc.push({...val, view_state: 'pending'})
    //             }
    //             return acc
                
    //         }, [])
    //         console.log('new submissions', newsubmissions)

    //         return [...previousValue, ...newsubmissions]
    //     })
    // }

    const fetchSubmissions = async () => {
        
        const response = await fetch(import.meta.env.VITE_SERVER_URL+'api/class', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokenteacher')}`
            }
        })
        const data = await response.json()
        
        // setSubmissionWhen((previousValue) => {
        //     let existe = previousValue.some(item => {
        //         return item.owner_token == val.owner_token && item.created == val.created
        //     })
        // })
        setSubmissions((previousValue) => {
            const newsubmissions = (data.submissions as ISubmission[]).reduce((acc: ISubmission[], val) => {
                let existe = previousValue.some(item => {
                    return item.owner_token == val.owner_token && item.created == val.created
                })
                console.log(existe)
                if (!existe) {
                    acc.push({...val, view_state: 'pending'})
                }
                return acc
                
            }, [])
            console.log('new submissions', newsubmissions)

            return [...previousValue, ...newsubmissions]
        })
        setMembers(data.members)
    }
    useEffect(() => {
        console.log('de novo')
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
            setsubmissionSelected({...submission})
            setSubmissions(oldstate => (oldstate.map((value) => (
                (value.owner_token == submission.owner_token && value.created == submission.created ? {...value, view_state: 'seen'} : value)
            ))))
            navigate('/classroom/'+password+'/code')
        },
        handle_ignore: (index: number) => {
            setSubmissions(oldstate => (oldstate.map((value, i) => (
                (index == i ? {...value, view_state: 'ignored'} : value)
            ))))
        }
    }
    console.log(value)
    return <ContextClassroom.Provider value={value}>{children}</ContextClassroom.Provider>

}