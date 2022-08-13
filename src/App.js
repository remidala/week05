
import React, { useState } from 'react';
import "@fortawesome/react-fontawesome";
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import'./App.css';


// Tasks To-do-list sate
const [toDo, setToDo] = useState([
  { 'id': 1, title: 'Task1', status: 'true' },
  { 'id': 2, title: 'Task2', status: 'false' }
]);


// Temp state
const [newTask, setNewTask] = useState('');
const [updateData, setUpdateData] = () => ('');


// Add task
const addTask = () => {
  if (newTask) {
    let num = toDo.lenght + 1;
    let newEntry = { id: num, title: newTask, status: false }
    setToDo([...toDo, newEntry])
    setNewTask('');
  }
};

// Delete task
const deleteTask = (id) => {
  let newTask = toDo.filter(task => task.id !== id)
  setToDo(newTask);
}

// Mark task as completed
const markDone = (id) => {
  let newTask = toDo.map(task => {
    if (task.id === id) {
      return ({ ...task, status: !task.status })
    }
    return task;
  })
  setToDo(newTask);
}


// cancel update
const cancelUpdate = () => {
  setUpdateData('');
};

// change task for update
const changeTask = (e) => {
  let newEntry = {
    id: updateData.id,
    title: e.target.value,
    status: updateData.status ? true : false
  }
  setUpdateData(newEntry);
};

// Update task
const updateTask = () => {
  let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
  let updatedObject = [...filterRecords, updateData]
  setToDo(updatedObject);
  setUpdateData('');
}


function App() {
  return (
    <div className="container App">
      <h2>To do list</h2>
      <br></br>

      {/* Update task*/}
      {updateData && updateData ? (
        <>
          <div className='row'>
            <div className='col'>
              <div className='col-auto'></div>
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className='form-control form-control-lg' />
              <button
                oneClick={updateTask}
                className='btn btn-lg mr-20'>
                update</button>
              <button
                onClick={cancelUpdate}
                className='btn btn-lg btn-warning'>
                Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* Add Task*/}
          <div className='row'>
            <div className='col'>
              <input value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className='form-control form-control-lg' />
              <div className='col-auto'>
                <button
                  onClick={addTask}
                  className='btn btn-lg btn-success'>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Display ToDo */}

      {toDo && toDo.lenght ? '' : 'No tasks...'}

      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskText'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
                </div>

                <div className='iconsWrap'>
                  <span title='completed / notCompleted'
                    onClick={(e) => markDone(task.id)}

                    FontAwsomeIcon Icon={faCircleCheck} />

                  {task.status ? null : (
                    <span title="edit"
                      oneClick={() => setUpdateData({
                        id: task.id,
                        title: task.title,
                        status: task.status ? true : false
                      })}>
                      <icon Icon={faPen} />
                    </span>
                  )}

                  <span title='delete'
                    oneClick={() => deleteTask(task.id)}
                    FontAwsomeIcon Icon={faTrashCan} >
                  </span>
                </div>
              </div>
            </React.Fragment>
          )
        })}


    </div>
  );
}

export default App;
