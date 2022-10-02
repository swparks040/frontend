import { ClientViews } from "./ClientViews"
import { EmployeeViews }  from "./EmployeeViews"


export const ApplicationViews = () => {
    
    const localNailedItUser = localStorage.getItem("nailedIt_user")
    const nailedItUserObject = JSON.parse(localNailedItUser)
	
	if(nailedItUserObject.staff) {
        //Return employee views
		return <EmployeeViews />
	}
	else {
        //Return client views
		return <ClientViews />
	}
}