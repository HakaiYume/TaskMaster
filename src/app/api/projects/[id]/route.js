import {NextResponse} from "next/server"
import supabase from '@/utils/supabase'

export async function GET(request, {params}){
    try {
        const taskFound = await supabase.from("projects").select().eq('id', params.id)
        
        if (!taskFound) return NextResponse.json({message: 'projects not found'}, {status: 404})
        return NextResponse.json(taskFound)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}

export async function PUT(request, {params}){
    try {
        const data = await request.json()
        const taskUpdated = await supabase.from("projects").update(data).eq('id', params.id)

        if (!taskUpdated) return NextResponse.json({message: 'projects not found'}, {status: 404})
        return NextResponse.json(taskUpdated)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}

export async function DELETE(request, {params}){
    try {
        const taskDeleted = await supabase.from("projects").delete().eq('id', params.id)

        if (!taskDeleted) return NextResponse.json({message: 'projects not found'}, {status: 404})
        return NextResponse.json(taskDeleted)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}