import {NextResponse} from "next/server"
import supabase from '@/utils/supabase'

export async function GET(){
    try {
        const data = await supabase.from("projects").select();
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener proyectos', details: error.message }, { status: 500 });
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const saveTask = await supabase.from('projects').insert(data)
    
        return NextResponse.json(saveTask)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}