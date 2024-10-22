'use client'
import TaskCard from '@/components/TaskCard';
import { useState, useEffect } from 'react';

function HomePage() {
  const [tasks, setTasks] = useState([]);

  const getTask = async () => {
    const res = await fetch(`/api/tasks`);
    const data = await res.json();
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default HomePage;
