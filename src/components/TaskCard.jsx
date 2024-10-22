import Link from "next/link"

function TaskCard({task}) {
  return (
    <Link href={`/tasks/${task._id}`}>
      <div className='bg-gray-800 p-10 pb-2 text-white rounded-md hover:cursor-pointer hover:bg-gray-700 h-full flex flex-col justify-between'>
        <div className="pb-2">
          <h3 className="text-2xl font-bold pb-3">{task.title}</h3>
          <p className="text-slate-300">{task.description}</p>
        </div>
        <p className="text-slate-400 my-2 text-sm">
          <span className="mr-1">
            Created At: 
          </span>
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  )
}

export default TaskCard