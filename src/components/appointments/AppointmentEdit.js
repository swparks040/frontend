import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const AppointmentEdit = () => {
    const { appointmentId } = useParams()
    const [nailColors, setNailColors] = useState([])
    const [nailShapes, setNailShapes] = useState([])
    const [nailEffects, setNailEffects] = useState([])
    const [appointment, updateAppointment] = useState({
            userId: 0,
            nailColorId: 0,
            nailShapeId: 0,
            nailEffectId: 0,
            directions: "",
            dateBooked: "",
            dateCompleted: ""
    })
    useEffect(
        () => {
            fetch(`http://localhost:8088/nailColors`)
            .then(response => response.json())
            .then((nailColorArray) => {
                setNailColors(nailColorArray)
            })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/nailShapes`)
            .then(response => response.json())
            .then((nailShapeArray) => {
                setNailShapes(nailShapeArray)
            })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/nailEffects`)
            .then(response => response.json())
            .then((nailEffectArray) => {
                setNailEffects(nailEffectArray)
            })
        },
        []
    )
    useEffect(() => {
        fetch(`http://localhost:8088/appointments/${appointmentId}`)
        .then ((response) => response.json())
        .then ((data) => {
            updateAppointment(data);
        })
    }, [appointmentId]
    )
    const navigate = useNavigate()
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/appointments/${appointment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/appointments")
            })
    }
    
    return (
        <form className="appointmentForm">
            <h2 className="appointmentForm__title">Edit Appointment Details</h2>
            <fieldset className="form-group">
                    <label htmlFor="nailColor">Nail Colors</label>
                    {
                        nailColors.map(nailColor => {
                            return <div className="form-group">
                                <input 
                                className="colorInput"
                                name="nailColor"
                                onChange={
                                    () => {
                                        const copy = {...appointment}
                                        copy.nailColorId = nailColor.id
                                        updateAppointment(copy)
                    }} type="radio" value={nailColor.id}/> {nailColor.color}</div>})}        
            </fieldset>
            <fieldset className="form-group">
                    <label htmlFor="nailShape">Nail Shapes</label>
                    {
                        nailShapes.map(nailShape => {
                            return <div className="form-group">
                                <input 
                                className="shapeInput"
                                name="nailShape"
                                onChange={
                                    () => {
                                        const copy = {...appointment}
                                        copy.nailShapeId = nailShape.id
                                        updateAppointment(copy)
                    }} type="radio" value={nailShape.id}/> {nailShape.shape}</div>})}        
            </fieldset>
            <fieldset className="form-group">
                    <label htmlFor="nailEffect">Nail Effects</label>
                    {
                        nailEffects.map(nailEffect => {
                            return <div className="form-group">
                                <input 
                                className="effectInput"
                                name="nailEffect"
                                onChange={
                                    () => {
                                        const copy = {...appointment}
                                        copy.nailEffectId = nailEffect.id
                                        updateAppointment(copy)
                    }} type="radio" value={nailEffect.id}/> {nailEffect.effect}</div>})}        
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="directions">Directions</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Custom design title or directions and notes for your nail technician..."
                        value={appointment.directions}
                        onChange={
                            (evt) => {
                                const copy = {...appointment}
                                copy.directions = evt.target.value
                                updateAppointment(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                 <label htmlFor="dates">Choose Appointment Time:</label> 
                 <input                   
                    type="datetime-local"
                    className="form-control"
                    required pattern="\d{4}-\d{2}-\d{2}"
                    value={appointment.dateBooked}
                    min="2022-01-21T00:00"
                    max="2030-01-01T00:00"
                    onChange={
                        (evt) => {
                            const copy = {...appointment}
                            copy.dateBooked = evt.target.value
                            updateAppointment(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}    
                className="updateAppointment__button">
                    Update Appointment Details
            </button>
        </form>
    )
    
    
    
   
}