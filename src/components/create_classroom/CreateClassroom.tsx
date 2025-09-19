import { useState } from "react"

function CreateClassroom(){

    const [password, setPassword] = useState('')
    const handleCreate = () => {
        fetch(import.meta.env.VITE_SERVER_URL+`api/class/create/${password}`, {
            method: 'POST',
            
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log('res create', data)
        })
    }

    return (<>
        <input type="text" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleCreate}>Create</button>
    </>)
}

export default CreateClassroom