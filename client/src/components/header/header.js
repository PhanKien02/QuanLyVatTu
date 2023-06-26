import React, { } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropdown from './dropdown';
import { useSelector } from "react-redux";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
const Header = ()=>{
    const auth = useSelector(state => state.user);
    return (
        <div className="container">
            <div className={`row ${styles.header_content}`}>
                <div className={`col-md-3 mt-4 ${styles.title}`}>
                    <Link to="/"> <h3>Vật tư xây dựng</h3></Link>
                </div>
                <nav className="navbar navbar-expand-sm navbar-light d-flex col-md-4 mt-4">
                        <form className="form-inline my-2 my-lg-0 d-flex">
                            <input className={`form-control mr-sm-2 ${styles.search_input}`} type="text" placeholder="Search"/>
                            <button className="btn btn-success my-2 my-sm-0" type="submit">
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                            </button>
                        </form>
                </nav>
                <div className={`d-flex col-md-4 mt-4 ${styles.user}`}>
                    {
                        !auth.user ? <Link to={`/auth/login`}>
                        <div className="d-flex">
                            <div className={styles.user_icon}>
                                <FontAwesomeIcon className={`mt-2 ${styles.icon}`} icon="fa-solid fa-user" size="lg" style={{color: "#000",}} />
                            </div>
                            <h5 className={`${styles.user_name } ml-4`}>{ "Login"}</h5>
                        </div>
                        </Link>: <Dropdown login ={auth}/>
                    }
                </div>
                </div>
        </div>
    )
};
export default Header;