import { DM_Serif_Display, Roboto } from "next/font/google";

export const roboto = Roboto({
	weight: ["400", "700", "900"],
	subsets: ["latin"],
});

export const dmSerifDisplay = DM_Serif_Display({
	weight: "400",
	subsets: ["latin"],
});
