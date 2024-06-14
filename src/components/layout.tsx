import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { roboto } from "@/utilities/fonts";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={roboto.className}>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
