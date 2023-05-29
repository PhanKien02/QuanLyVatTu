import React from "react"
import Header from "../components/header/header"
import SideBar from "../components/sidebar/sidebar"
const Home = ()=>{
    return (
        <>
            <Header/>
            <SideBar/>
            <h1 className="bg-success" style={{height:100 +'%'}}>Content</h1>
        </>
    )
}
export default Home