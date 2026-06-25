import {  useState } from "react";

const Form1=()=>{
    let [frmdata, setFrmdata] = useState()
function store(event) {
    let {name,value}=event.target
    setFrmdata({...frmdata,[name]:value})
}
function submit(e){
    e.preventDefault()
    console.log(frmdata);
    
}
    return(
 <>
<form onSubmit={submit}>
<label >Name</label>
<input type="text" name="Name" onChange={store} /> <br /> <br />
<label >Contact</label>
<input type="text" name="contact" onChange={store} /> <br /> <br />
<label >Age</label>
<input type="text" name="age" onChange={store} /> <br /> <br />
<label >City</label>
<input type="text" name="city" onChange={store} /> <br /> <br />
<label >Email</label>
<input type="text" name="email" onChange={store} /> <br /> <br />
<input type="submit" />
</form>
</>
    )
    
}
export default Form1;