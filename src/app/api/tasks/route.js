import {NextResponse} from "next/server"
import supabase from '@/utils/supabase'

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const pageSize = parseInt(searchParams.get('pageSize')) || 8;
        const type = parseInt(searchParams.get('type')) || 0;
        const title = searchParams.get('title');
        
        let querry = supabase.from('tasks_with_project_name').select('*', { count: 'exact' })

        if(type != 0){
            querry = querry.eq('project_id', type)
        }
        if(title){
            querry = querry.ilike('title', '%'+ title +'%')
        }

        const data = await querry.range((page - 1) * pageSize, page * pageSize - 1)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener tareas', details: error.message }, { status: 500 });
    }
}
export async function POST(request){
    try {
        const data = await request.json()
        const saveTask = await supabase.from('tasks').insert(data)
    
        return NextResponse.json(saveTask)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}