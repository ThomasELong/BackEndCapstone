import React, { useEffect, useContext, useState } from "react";
import { Button, CardBody, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, CardImg, Toast, ToastBody, ToastHeader, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { ProjectContext } from "../../providers/ProjectProvider";
import { TaskContext } from "../../providers/TaskProvider"
import { TaskNoteContext } from "../../providers/TaskNoteProvider";


const TaskDetails = () => {
  const { getProjectById } = useContext(ProjectContext);
  const { getTask, deleteTask, updateTask, addTask } = useContext(TaskContext)
  const { addTaskNote, getTaskNotesByTaskId } = useContext(TaskNoteContext)
  const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const { id } = useParams();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [ addTaskNoteModal, setAddTaskNoteModal ] = useState(false); 
  const [project, setProject] = useState({});
  const [taskTitle, setTaskTitle] = useState();
  const [ taskNoteTitle, setTaskNoteTitle ] = useState();
  const [ taskNoteContent, setTaskNoteContent ] = useState();
  const [taskPriority, setTaskPriority] = useState()
  const [taskComplete, setTaskComplete] = useState();
  const [task, setTask] = useState({})
  const [taskNotes, setTaskNotes] = useState([])
  const history = useHistory();


  useEffect(() => {
    getTask(id)
      .then(setTask);
  }, []);

  const toggleAddTaskNoteModal = () => {
    setAddTaskNoteModal(!addTaskNoteModal)
  }

  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  useEffect(() => {
    console.log(taskNotes)
  }, [setTaskNotes]);

  const submitForm = () => {
    updateTask({
      id: task.id,
      taskTitle: taskTitle,
      taskPriority: taskPriority,
      taskComplete: taskComplete,
      taskCategoryId: task.taskCategoryId,
      projectId: task.projectId
    }).then(() => history.push(`/`));
  };

  const submitNewTaskNoteForm = () => {
    if(!taskNoteTitle) {
      window.alert("Please add a title for this note")
    } else if (!taskNoteContent) {
      window.alert("Please add content for this note")
    } else {
      const NewTaskNote = {
        title: taskNoteTitle,
        content: taskNoteContent, 
        taskId: (id),
        createdDate: new Date()
      };
      addTaskNote(NewTaskNote)
    }
  }

  return (
    <>
      <section className="m-4">
        <div>
          <h3>{task.taskTitle}</h3>
          <div>{task.taskPriority}</div>
          <div>
            {taskNotes.map((tasknote) => (
              <div>
                <Button onClick={getTaskNotesByTaskId(id).then(setTaskNotes)} key={tasknote.id} color="info" size="md">{tasknote.title}</Button>
              </div>
            ))}
          </div>
        </div>
        <Button toggle={toggleAddTaskNoteModal}>Add A New Task Note</Button>
        <Button onClick={toggleEdit}>Edit</Button>
        <Button onClick={toggleDelete}>Delete</Button>
      </section>

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="taskTitle">Task Title </label>
            <input
              type="text"
              id="taskTitle"
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={task.taskTitle}
            />

            <label htmlFor="taskPriority">Task Priority </label>
            <input
              type="text-area"
              id="taskPriority"
              onChange={(e) => setTaskPriority(e.target.value)}
              required
              autoFocus
              className="form-control mt-4"
              defaultValue={task.taskPriority}
            />

            <div className="">
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={(evt) => {
                  evt.preventDefault();
                  if (!taskPriority) {
                    window.alert("Please add notes for your project.");
                  } else if (!taskTitle) {
                    window.alert("Please add a name for your project");
                  } else {
                    submitForm(task);
                  }
                }}
                className="btn mt-4"
              >
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalBody>
          <div className="form-group">
            <h3>Are you sure you want to delete "{project.name}"?</h3>
            <div className="">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  deleteProject(project.id)
                    .then(() => {
                      toggleDelete()
                    })
                    .then(() => history.push(`/`))
                }}
                className="btn mt-4"
              >
                Yes
              </Button>
              <Button
                type="submit"
                size="sm"
                color="info"
                onClick={toggleDelete}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal> */}

<Modal isOpen={addTaskNoteModal} toggle={toggleAddTaskNoteModal}>
          <ModalBody>
            <div className="form-group">
              <input
                placeholder="What is your task's title?"
                type="text-area"
                id="taskTitle"
                required
                autoFocus
                className="form-control mt-4"
                onChange={(e) => setTaskNoteTitle(e.target.value)}
              />
              <input 
                placeholder="Note Content"
                type="text-area"
                id="taskNoteContent"
                required
                className="form-control mt-4"
                onChange={(e) => setTaskNoteContent(e.target.value)}
              />

              <div className="">
                <Button
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={(e) => {
                    e.preventDefault();
                    submitNewTaskNoteForm()
                  }}
                  className="btn mt-4"
                >
                  Save
                            </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
    </>
  );
};



export default TaskDetails;





