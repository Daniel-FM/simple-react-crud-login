import {CreateForm} from "src/components/forms/CreateForm"
import {ReadForm} from "src/components/forms/ReadForm"
import {UpdateForm} from "src/components/forms/UpdateForm"
import {DeleteForm} from "src/components/forms/DeleteForm"

export const FormArea = (props) => {
    if (props.mode === "Create"){
        return(
            <CreateForm/>
        );
    } else if (props.mode === "Read"){
        return(
            <ReadForm/>
        );
    } else if (props.mode === "Update"){
        return(
            <UpdateForm/>
        );
    } else if (props.mode === "Delete"){
        return(
            <DeleteForm/>
        );
    } else {
        return(
            <h1>ERROR!</h1>
        );
    }
}