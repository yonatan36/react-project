import React, { useState } from 'react'

function Login() {

const [firstname,setfirstname] = useState("")

const inputValue = (ev)=>{
setfirstname(ev.target.value)
console.log(ev.target.value);
}

  return (
 
    <div>
      <h1>this right-{firstname}</h1>
      
      <input type="text"  onChange={inputValue} value={firstname}/>
    
    
    </div>
  )
}

export default Login