import axios from "axios"

function SendData(params) {
    axios.post(`https://haajde.onrender.com/create/user`, params)

}

export default SendData