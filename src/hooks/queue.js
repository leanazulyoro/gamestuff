import { useCallback, useEffect, useState } from 'react';
import wait from 'waait';

export const useQueue = ({tic, limit}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
     console.log('tic -> ', tic);
     console.log('tasks -> ', tasks);
    if(tasks.length <= 0) { return }
    if(tic) {
      const [firstTask, ...rest] = tasks;
      if(typeof firstTask === 'function') {
        firstTask.call();
        setTasks(rest);
      }
    }
  }, [tic]);

  const addToQueue = useCallback((newTask) => {
    //console.log('newTask -> ', newTask);
    if (typeof newTask !== 'function' || tasks.length >= limit) { return }
    setTasks(prevTasks => ([...prevTasks, newTask]))
  }, [tasks]);

  return addToQueue;
};



export const useQueueWithDelay = ({delay, limit}) => {
  const [tasks, setTasks] = useState([]);
  const [_tasks, _setTasks] = useState([]);
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const grabTask = async () => {
      if(!grabbing) {
        console.log('grabbing..');
        await setGrabbing(true);
        await wait(delay);
        const [firstTask, ...rest] = tasks;
        await setTasks(rest);
        await _setTasks([...tasks, firstTask]);
        await setGrabbing(false);
      }
    };
    grabTask();
  }, [tasks]);


  useEffect(() => {
    const runTasks = async () => {
      if(_tasks.length > 0) {
        const [firstTask, ...rest] = _tasks;
        if (typeof firstTask === 'function') {
          await firstTask.call();
        }
        await _setTasks(rest);
      }
    };
    runTasks();
  }, [_tasks]);

  const addToQueue = (newTask) => {
    if (tasks.length >= limit) { return }
    setTasks([...tasks, newTask]);
  };

  return addToQueue;
};

