import React from "react";
import "./sidebar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/logo.png"
import Routes from "../../common/data/router";
import { Link} from "react-router-dom";
import styles from "./sidebar.module.scss"
const SideBar = () =>{
    return (
        <div className="sidebar">
        <Link to="/">   <img  src={logo} alt="logo " className={styles.logo} variant="mt-5"/></Link>
            <ul className={`${styles.list_route}`}>
                {
                    Routes.map((Route,i=0)=>{
                        return <li  key={i++}>
                                <Link to={Route.path}>
                                    <FontAwesomeIcon icon={Route.icon}  style={{color: "#af8a04",}}/>
                                    <strong> {Route.title}</strong></Link>
                                </li>
                    })
                }
            </ul>
        </div>
    )
}
export default SideBar