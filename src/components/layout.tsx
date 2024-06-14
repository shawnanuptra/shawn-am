import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
