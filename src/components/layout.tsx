import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { inter } from "@/utilities/fonts";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={inter.className}>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
