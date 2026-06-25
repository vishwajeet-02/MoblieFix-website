import { createContext, useState } from "react";
export const EditContext=createContext();
// import { Children, useState } from "react";

export const EditProvider =({children})=>

{ 
    const[editData,setEditData]=useState(null);
    console.log("Provider Data:", editData);
    
    return(
<EditContext.Provider value={{editData,setEditData}}>
{children}
</EditContext.Provider>
    );
};