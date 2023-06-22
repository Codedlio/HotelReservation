import axios from "axios";
const putReserva= async (id) => {
        const {data}= await axios.put(`/reservation/${id}`,
        {estado:"pagado"}
        ); 
        console.log(data)
        return data

}
export default putReserva;