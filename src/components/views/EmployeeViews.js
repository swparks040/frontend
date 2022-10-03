import { Outlet, Route, Routes } from "react-router-dom";
import { AppointmentList } from "../appointments/AppointmentList";
import { ClientDetails } from "../clients/ClientDetails";
import { ClientList } from "../clients/ClientList";
import { EmployeeList } from "../employees/EmployeeList";
import { EmployeeDetails } from "../employees/EmployeeDetails";
import { Profile } from "../profile/Profile";
import { AppointmentEdit } from "../appointments/AppointmentEdit";
import { AppointmentForm } from "../appointments/AppointmentForm";
import homepage from "../images/nailcollage1.jpg";
import "./Views.css";

export const EmployeeViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="bg">
              <img
                src={homepage}
                alt="nail_collage"
                style={{ width: "100%", height: "100%", opacity: 0.4 }}
              />
            </div>

            <Outlet />
          </>
        }
      >
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="profile/:employeeId" element={<Profile />} />
        <Route path="clients" element={<ClientList />} />
        <Route path="clients/:clientId" element={<ClientDetails />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/:employeeId" element={<EmployeeDetails />} />
        <Route
          path="appointments/:appointmentId/edit"
          element={<AppointmentEdit />}
        />
        <Route path="appointment/create" element={<AppointmentForm />} />
      </Route>
    </Routes>
  );
};
