import React from "react";
import image from "../../../assets/images/AuthPage.png"
import "./auth.scss"
const Auth = ()=>{
    return (
        <div class="container auth">
            <div className="image">
                <img src={image} alt="image welcome" />
            </div>
        </div>
    )
}
export default Auth;