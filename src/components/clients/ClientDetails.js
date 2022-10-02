import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Clients.css"

export const ClientDetails = () => {
    const {clientId} = useParams()
    const [client, updateClient] = useState({})
    const navigate = useNavigate();
    useEffect(
        () => {
            fetch(`http://localhost:8088/clients?_expand=user&userId=${clientId}`)
            .then(response => response.json())
            .then((data) => {
                const singleClient = data[0]
                updateClient(singleClient)
            })
        },
        [clientId]
    )

    return <><section className="client">
    <header className="client__header">{client?.user?.fullName}</header> 
    <p>Email: {client?.user?.email}</p>
    <p>Address: {client.address}</p>
    <p>Phone Number: {client.phone}</p>
</section>
<button className="appointmentEdit__button"onClick={() => navigate(`/clients`)}>Back</button></>
}