// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { LoginData, LoginFormReq } from "@/utilities/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: LoginFormReq, res: NextApiResponse) {
    try {
        // get data from request
        const { username, password } = req.body;

        // check if data is correct
        if (username == "shawn" && password == "shawn") {
            res.status(200).json({ success: true });
        } else {
            throw new Error("error");
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "wrong credentials" });
    }
}
