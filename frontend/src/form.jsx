import { useState } from "react";
const Form=()=>{
let [name,setName]= useState()
let [contact, setcontact] = useState()
let [email, setEmail] = useState ()
let [company,setCompany] = useState()
let[occupation, setOccupation] = useState()
    function fun(event){
        console.log(event.target.value);
        setName(event.target.value)
    }
    function fun1(event){
        setcontact(event.target.value)
    }
    function fun2(event){
        setEmail(event.target.value)
    }
    function fun3(event){
        setCompany(event.target.value)
    }
    function fun4(event){
        setOccupation(event.target.value)
    }
    return(
        <>
        <h1>{occupation}</h1>
        <h1>{company}</h1>
        <h1>{email}</h1>
        <h1>{contact}</h1>
        <h1>{name}</h1>
        <form>
        <label htmlFor="">Name</label>
        <input type="text" onChange={fun} />
        <br /><br />
        <label htmlFor="">Contact</label>
        <input type="text" onChange={fun1}/>
        <br /><br />
        <label htmlFor="">Email</label>
        <input type="text" onChange={fun2}/>
        <br /><br />
        <label htmlFor="company">Company</label>
        <input type="text" onChange={fun3}/>
        <br /><br />
        <label htmlFor="">occupation</label>
        <input type="text"onChange={fun4} />
        </form>
        </>
    )
}
export default Form;