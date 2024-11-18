import {NextResponse} from "next/server"

export function GET(){
    connectDB()
    return NextResponse.json({message: "hello world"})
}