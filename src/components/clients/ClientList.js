import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Client } from "./Client"
import "./Clients.css"
import { Button } from "react-bootstrap"

export const ClientList = () => {
    const [clients, setClients] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
            .then (response => response.json())
            .then ((clientArray) => {
                setClients(clientArray)
            })
        },
        []
    )

    return <><article className="clients">
        <h2 className="clientList__details">Nailed It! Clients</h2>
        <h5 className="clientList__details">Select hyperlink for details...</h5>
        {
            clients.map(client => <Client key={`client--${client.id}`}
                id={client.id} 
                fullName={client.fullName}
                email={client.email}
                address={client?.clients?.address} 
                phone={client?.clients?.phone} /> )
        }
    </article>
    <Button variant="dark" className="back__button" onClick={() => navigate(`/`)}>Back</Button>
    </>
}