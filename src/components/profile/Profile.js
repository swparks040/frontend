import { ClientForm } from "./ClientForm";
import { EmployeeForm } from "./EmployeeForm";

export const Profile = () => {
  const localNailedItUser = localStorage.getItem("nailedIt_user");
  const nailedItUserObject = JSON.parse(localNailedItUser);

  if (nailedItUserObject.staff) {
    return <EmployeeForm />;
  } else {
    return <ClientForm />;
  }
};
