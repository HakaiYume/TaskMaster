"use client"
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

function FormPage() {
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        project_id: ""
    })
    const [projects, setProjects] = useState([])
    const router = useRouter()
    const params = useParams()

    const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`)
        const json = await res.json()
        const data = json.data[0]
        setNewTask({
            title: data.title,
            description: data.description,
            project_id: data.project_id
        })
    }

    const getProjects = async () => {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data.data)
    }

    const createTask = async () => {
        try {
            const res = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.status == 200) {
                router.push('/')
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async () => {
        try {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: "PUT",
                body: JSON.stringify(newTask),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.status == 200) {
                router.push('/')
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
            try {
                await fetch(`/api/tasks/${params.id}`, {
                    method: "DELETE",
                })
                router.push('/')
                router.refresh()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCancel = () => {
        router.push('/')
        router.refresh()
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!params.id) {
            await createTask()
        } else {
            await updateTask()
        }
        router.refresh()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        getProjects()
        if (params.id) {
            getTask()
        }
    }, [])
 
    return (
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form onSubmit={handleSubmit}>
                <header className='flex justify-between'>
                    <h1 className='font-bold text-3xl'>
                        { !params.id ? "Create Task" : "Update Task" }
                    </h1>
                    {params.id && (
                        <button type='button' className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md' onClick={handleDelete}>Delete</button>
                    )}
                </header>

                <input
                    type="text"
                    name='title'
                    placeholder='Title'
                    className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
                    onChange={handleChange}
                    value={newTask.title}
                />
                <textarea
                    name="description"
                    rows={3}
                    placeholder='Description'
                    className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
                    onChange={handleChange}
                    value={newTask.description}
                ></textarea>

                <select
                    name="project_id"
                    className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
                    onChange={handleChange}
                    value={newTask.project_id}
                >
                    <option value="0">Select Type</option>
                    {projects.length > 0 ? (
                        projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))
                    ):(
                        <option value=""></option>
                    )}
                </select>

                <div className="container flex justify-between px-10 md:px-0 mx-auto">
                    <button type='submit' className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'>
                        { !params.id ? "Create" : "Update" }
                    </button>
                    <button type='button' className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default FormPage
