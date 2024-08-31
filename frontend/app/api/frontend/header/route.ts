import Axios from "@/helper/axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await Axios.get("/header");
        const header = response?.data?.data;
        return NextResponse.json({ message: "success", data: header },{status: 200})
    } catch (error) {
        return NextResponse.json({ message: "error", error: error?.message }, {status: 500})
    }
}