import { ClientNav } from "./ClientNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
	
    const localNailedItUser = localStorage.getItem("nailedIt_user")
    const nailedItUserObject = JSON.parse(localNailedItUser)
	
	if(nailedItUserObject.staff) {
		//Return employee views
		return <EmployeeNav />
	}
	else {

		return <ClientNav />
	}
}