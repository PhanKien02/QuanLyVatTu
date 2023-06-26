import React from "react"
import Header from "../../components/header/header"
import SideBar from "../../components/sidebar/sidebar"
import { Outlet } from "react-router-dom"
import style from "./home.module.scss"
const Home = ()=>{
    return (
        <div className={style.home}>
            <div className={`bg-info ${style.header}`}>
                <Header/>
            </div>

            <div className={style.sidebar}>
                <SideBar/>
            </div>
            <div className={style.content}>
                <Outlet/>
            </div>
        </div>
    )
}
export default Home