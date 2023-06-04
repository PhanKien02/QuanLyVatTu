import React from "react";
import image from "../../assets/images/AuthPage.png";
import "./auth.scss"
import {Outlet } from "react-router-dom";
const Auth = ()=>{
    return (    
        <div className="container-fuild auth">
            <div class="row content_auth d-flex">
            <div className="image col-md-5">
                <img src={image} alt="image auth" />
            </div>
            <div className="form col-md-7">
                    <Outlet/>
            </div>
            </div>
        </div>
    )
}
export default Auth