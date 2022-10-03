import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Clients.css";
import { Button } from "react-bootstrap";

export const ClientDetails = () => {
  const { clientId } = useParams();
  const [client, updateClient] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8088/clients?_expand=user&userId=${clientId}`)
      .then((response) => response.json())
      .then((data) => {
        const singleClient = data[0];
        updateClient(singleClient);
      });
  }, [clientId]);

  return (
    <>
      <section className="client">
        <header className="client__header">{client?.user?.fullName}</header>
        <p className="client__text">Email: {client?.user?.email}</p>
        <p className="client__text">Address: {client.address}</p>
        <p className="client__text">Phone Number: {client.phone}</p>
      </section>
      <Button
        variant="dark"
        className="back__button"
        onClick={() => navigate(`/clients`)}
      >
        Back
      </Button>
    </>
  );
};
