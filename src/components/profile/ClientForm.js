import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"
import { Button } from "react-bootstrap"


export const ClientForm = () => {
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0,
      });


    
      const localNailedItUser = localStorage.getItem("nailedIt_user");
      const nailedItUserObject = JSON.parse(localNailedItUser);
      const [feedback, setFeedback] = useState("")
      const navigate = useNavigate()

// This provides a three second message letting the user know whether or not the profile for the user was saved successfully. Appears top middle of browser. 

      useEffect(() => {
        if (feedback !== "") {
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
// Expand to include name and email address.
    useEffect(() => {
        fetch(`http://localhost:8088/clients?userId=${nailedItUserObject.id}`)
          .then((response) => response.json())
          .then((data) => {
            const clientObject = data[0];
            updateProfile(clientObject);
            
          });
      }, []);

      const handleSaveButtonClick = (event) => {
        event.preventDefault();

        return fetch(`http://localhost:8088/clients/${profile.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          })
            .then((response) => response.json())
            .then(() => {
              setFeedback("Client profile successfully saved")
          })
        };

        return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
        <form className="profile">
          <h2 className="profile__title">Update Client Profile</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                required
                autoFocus
                type="text"
                placeholder="123 Happy Street, Happyville, HA #####"
                className="form-control"
                value={profile.address}
                onChange={(evt) => {
                  const copy = { ...profile };
                  copy.address = evt.target.value;
                  updateProfile(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                required
                autoFocus
                type="text"
                placeholder="###-###-####"
                className="form-control"
                value={profile.phone}
                onChange={(evt) => {
                  const copy = { ...profile };
                  copy.phone = evt.target.value;
                  updateProfile(copy);
                }}
              />
            </div>
          </fieldset>
          <Button
            variant="dark"
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="saveProfile__button"
          >
            Save Profile
          </Button>
          <Button variant="dark"
          className="back__button"
          onClick={() => navigate(`/appointments`)}>Back</Button>
        </form>
        </>

}