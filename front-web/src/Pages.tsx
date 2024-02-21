import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./Orders";
import Home from "./Home";
import Navbar from "./Navbar";

function Pages() {
    return(
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/orders" element ={<Orders />} />
                <Route path="/" element ={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Pages;