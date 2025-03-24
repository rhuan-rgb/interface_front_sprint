import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/reservas/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postCadastro:(user)=>api.post("user/",user),
    postLogin:(user)=>api.post("user/login", user),
    getClassroom:()=>api.get("classroom/"),

}

export default sheets;