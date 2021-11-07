import React from "react"
import Login from "../login-component/login"
import Signup from "../signup/Signup"
function Home(){
    return (
        <div className="Home">
            <h1>Home</h1>
            <Login/>
            <Signup/>
        </div>
    )
}
export default Home