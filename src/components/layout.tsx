import { andika } from "@/utilities/fonts";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className={andika.className}
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
