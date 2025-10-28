import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
    return (
        <>
        <h1> Body Component</h1>
        <NavBar />
        <Outlet />
        <Footer />
        </>
    )
}

export default Body;