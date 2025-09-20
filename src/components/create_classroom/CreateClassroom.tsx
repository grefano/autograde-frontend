import { useNavigate } from "react-router-dom"
function CreateClassroom(){
    const navigate = useNavigate()
    
    // const [password, setPassword] = useState('')
    const handleCreate = () => {
        let characters = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ" // l/i
        let password = ''
        for(let i = 0; i < 5; i++){
            password += characters.charAt(Math.random() * characters.length)
        }
        fetch(import.meta.env.VITE_SERVER_URL+`api/class/create/${password}`, {
            method: 'POST',
            
        }).then(response => {
            return response.json()
        }).then(data => {
        
            localStorage.setItem('classpassword', password)
            localStorage.setItem('tokenteacher', data.token)
            navigate("/classroom/"+password)
        })
    }

    return (<>
        {/* <input type="text" onChange={(e) => setPassword(e.target.value)}/> */}
        <button onClick={handleCreate}>Create</button>
    </>)
}

export default CreateClassroom