import { Outlet, Route, Routes } from "react-router-dom";
import { AppointmentEdit } from "../appointments/AppointmentEdit";
import { AppointmentForm } from "../appointments/AppointmentForm";
import { AppointmentList } from "../appointments/AppointmentList";
import { Profile } from "../profile/Profile";
import homepage from "../images/nailcollage1.jpg";
import oliviaMainView from "../images/oliviaMainView.png";

export const ClientViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <>
            <div className="bg">
              <img src={homepage}
                alt="nail_collage" style={{ width: "100%", height: "100%", opacity: 0.3}}/>  
            </div>
            <img src={oliviaMainView} 
            alt="main logo"
            style={{width: "100%"}}/>
            <Outlet />
          </>
        }
      >
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="appointment/create" element={<AppointmentForm />} />
        <Route
          path="appointments/:appointmentId/edit"
          element={<AppointmentEdit />}
        />
      </Route>
    </Routes>
  );
};
