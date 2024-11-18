'use client'
import TaskCard from '@/components/TaskCard';
import InstallButton from '@/components/InstallButton'
import PushNotification from '@/components/PushNotification'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

function HomePage() {
  const pageSize = 8 
  const [projects, setProjects] = useState([]);
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tasks, setTasks] = useState([]);

  const getTask = async () => {
    const res = await fetch(`/api/tasks?title=${title}&type=${type}&page=${page}&pageSize=${pageSize}`);
    const data = await res.json();
    const total = data.count
    if ((total - (pageSize * page) <= 0)){
      setHasMore(false)
    } else {
      setHasMore(true)
    }
    setTasks(data.data);
  };

  const getProjects = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data.data)
  }

  const handleNext = () =>{
    if (hasMore) {
      setPage(page + 1);
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(parseInt(e.target.value))
  }

  const hadleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSearch = async() => {
    await getTask();
  };
   

  useEffect(() => {
    getTask()
    getProjects()
  }, [page, type]);

  return (
    <div className='grid grid-cols-1 gap-2'>
      <div className='grid grid-cols-2 gap-2'>
        <div className="inline-flex">
          <input
            type="text"
            name='title'
            placeholder='Title'
            className='bg-gray-800 rounded-l-lg p-3 border-r-2 border-gray-600 w-full'
            onChange={hadleChangeInput}
            value={title}
          />
          <button 
            className="bg-gray-800 rounded-r-lg p-3 border-l-2 border-gray-600"
            onClick={handleSearch}
          >
            buscar
          </button>
        </div>
        <div>
          <select
              name="project_id"
              className='bg-gray-800 rounded-lg p-3 w-full'
              onChange={handleChangeSelect}
              value={type}
          >
            <option value="0">All</option>
            {projects.length > 0 ? (
                projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                ))
            ):(
                <option value=""></option>
            )}
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
        <PushNotification />
        <InstallButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {
          tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))
          ) : (
            <p className="text-slate-300 p-2">There are no tasks</p>
          )
        }
      </div>
      <div className="flex flex-col items-end">
        <div className="inline-flex">
            <button
              className="bg-gray-800 rounded-l-lg p-3 border-r-2 border-gray-600"
              onClick={handlePrevious}
            >
              Prev
            </button>
            <button 
              className="bg-gray-800 rounded-r-lg p-3 border-l-2 border-gray-600"
              onClick={handleNext}
            >
              Next
            </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
