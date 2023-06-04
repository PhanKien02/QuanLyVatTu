import React from "react"
import Header from "../../components/header/header"
import SideBar from "../../components/sidebar/sidebar"
import { Outlet } from "react-router-dom"
import "./home.scss"
const Home = ()=>{
    return (
        <>
            <div className="header">
                <Header/>
            </div>

            <div className="sidebar">
                <SideBar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </>
    )
}
export default Home