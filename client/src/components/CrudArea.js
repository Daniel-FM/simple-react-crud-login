
import { CrudSwitches } from "src/components/CrudSwitches"
import { FormArea } from "src/components/FormArea"
import { useState } from 'react';


export const CrudArea = () =>{

    const [CrudMode, setCrudMode] = useState("Create");

    const switchMode = (newMode) => {
        setCrudMode(newMode);
    }


    return (
        <>
        <CrudSwitches callback={switchMode}/>
        <div className="FormArea">
            <FormArea mode={CrudMode}/>
        </div>
        </>
    );


}
