import {NextResponse} from "next/server"
import {connectDB} from '@/utils/db'
import Task from "@/models/Task"

export async function GET(request, {params}){
    try {
        connectDB()
        const taskFound = await Task.findById(params.id)
        
        if (!taskFound) return NextResponse.json({message: 'Task not found'}, {status: 404})
        return NextResponse.json(taskFound)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}

export async function PUT(request, {params}){
    try {
        const data = await request.json()
        const taskUpdated = await Task.findByIdAndUpdate(params.id, data, {new: true})

        if (!taskUpdated) return NextResponse.json({message: 'Task not found'}, {status: 404})
        return NextResponse.json(taskUpdated)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}

export async function DELETE(request, {params}){
    try {
        const taskDeleted = await Task.findByIdAndDelete(params.id)

        if (!taskDeleted) return NextResponse.json({message: 'Task not found'}, {status: 404})
        return NextResponse.json(taskDeleted)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}