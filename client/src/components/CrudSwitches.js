import "./CrudSwitches.css"
import { useEffect, useState } from "react"

export const CrudSwitches = (props) => {

    const [activeMode, setActiveMode] = useState("Create");

    const [classNameCreate, setClassNameCreate] = useState(["CrudSwitchesButton",""]);
    const [classNameRead, setClassNameRead] = useState(["CrudSwitchesButton",""]);
    const [classNameUpdate, setClassNameUpdate] = useState(["CrudSwitchesButton",""]);
    const [classNameDelete, setClassNameDelete] = useState(["CrudSwitchesButton",""]);

    useEffect(()=>{
        setClassNameCreate(["CrudSwitchesButton", activeMode === "Create" ? "active" : ""]);
        setClassNameRead(["CrudSwitchesButton", activeMode === "Read" ? "active" : ""]);
        setClassNameUpdate(["CrudSwitchesButton", activeMode === "Update" ? "active" : ""]);
        setClassNameDelete(["CrudSwitchesButton", activeMode === "Delete" ? "active" : ""]);
    },[activeMode]);

    const updateMode = (newMode)=>{
        if (activeMode !== newMode){
            setActiveMode(newMode);
        }
        props.callback(newMode);
    }

    return(
        <div>
            <div className="CrudSwitchesArea">
                <div className={classNameCreate.join(" ").trim()} onClick={()=>updateMode("Create")}>
                    <h1>Create</h1>
                </div>
                <div className={classNameRead.join(" ").trim()} onClick={()=>updateMode("Read")}>
                    <h1>Read</h1>
                </div>
                <div className={classNameUpdate.join(" ").trim()} onClick={()=>updateMode("Update")}>
                    <h1>Update</h1>
                </div>
                <div className={classNameDelete.join(" ").trim()} onClick={()=>updateMode("Delete")}>
                    <h1>Delete</h1>
                </div>
            </div>
        </div>
    );
};
