import { useState } from "react"
import { useNavigate } from "react-router-dom"
//import "./Login.css"

export const Register = (props) => {
// set state for creating a user.
    const [client, setClient] = useState({
        email: "",
        fullName: "",
        isStaff: false
    })
// useNavigate to navigate to homepage upon user creation.    
    let navigate = useNavigate()
// registerNewUser function fetches all users, then returns users from API, then creates a user.id and sets the isStaff property, then navigates to homepage.
    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("nailedIt_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))
                    navigate("/")
                }
            })         
            }
// handleRegister fetches each existing email from the API. If the response matches, a window alert will render. If the email is not a duplicate, the register new user function above will run.
    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${client.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }
// The updateClient function sets the value of the input in the form. It is an onChange event function.
    const updateClient = (evt) => {
        const copy = {...client}
        copy[evt.target.id] = evt.target.value
        setClient(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Nailed It! by Olivia</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateClient}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateClient}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...client}
                        copy.isStaff = evt.target.checked
                        setClient(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label htmlFor="isStaff"> Employee? </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}