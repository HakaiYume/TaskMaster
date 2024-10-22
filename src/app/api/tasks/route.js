import {NextResponse} from "next/server"
import {connectDB} from '@/utils/db'
import Task from "@/models/Task"

export async function GET(){
    try {
        connectDB()
        const tasks = await Task.find()
        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener tareas', details: error.message }, { status: 500 });
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const newTask = new Task(data)
        const saveTask = await newTask.save()
    
        return NextResponse.json(saveTask)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}