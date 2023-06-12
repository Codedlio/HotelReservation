import axios from "axios";
const getCustumer= async ({correo,nombre}) => {
        const {data}= await axios.post("http://localhost:3001/payment/custumer", {
            body:{
                correo:correo,
                nombre:nombre
        }}); 
        console.log(data)
        return data

}
export default getCustumer;