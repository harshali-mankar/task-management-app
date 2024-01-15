import React, { useState, useEffect } from "react";
import Select from "react-select";

// font awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All"); // New state for the filter dropdown
  const [filterValue, setFilterValue] = useState("All"); // New state for storing the filter value
  const options = [
    { value: "All", label: "All" },
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
  ];

  const openModal = (task) => {
    setModalOpen(true);
    setEditingTask(task);
    setSelectedStatus(task ? task.status : "Pending"); // Set initial status for editing
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const addTask = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;

    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map((task) =>
        task === editingTask
          ? { ...task, title, description, status: selectedStatus }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update local storage
    } else {
      // Add new task
      const newTask = { title, description, status: "Pending" };
      setTasks([...tasks, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask])); // Update local storage
    }

    closeModal();
  };

  const deleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => t !== task);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const changeStatus = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const changeFilter = (newFilter) => {
    setFilterValue(newFilter);
  };

  const filterTasks = () => {
    if (filterValue === "All") {
      return tasks; // Display all tasks
    } else {
      return tasks.filter((task) => task.status === filterValue);
    }
  };
  useEffect(() => {
    // Load tasks from local storage when component mounts
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div className="d-flex pb-5 justify-content-between top-management-app__head">
        <Select
          defaultValue={filterValue}
          onChange={(e) => {
            changeFilter(e.value);
          }}
          options={options}
        ></Select>
        <button className="btn btn-primary" onClick={() => openModal(null)}>
          Add New Task
        </button>
      </div>
      <h3 className="mb-4">Task List</h3>
      <div className="task-management__body">
        <div className="task-management__listWrp">
          <div className="task-management__list d-flex task-management__list--Head fw-bold bg-body-tertiary">
            <div className="task-management__title">Title</div>
            <div className="task-management__desc">Description</div>
            <div className="task-management__status">Status</div>
            <div className="task-management__actionBtns"> Action </div>
          </div>
          {filterTasks().map((task, index) => (
            <div className="task-management__list d-flex" key={index}>
              <div className="task-management__title">{task.title}</div>
              <div className="task-management__desc">{task.description}</div>
              <div className="task-management__status">{task.status}</div>
              <div className="task-management__actionBtns ms-auto fs-4 ">
                <button
                  className="d-inline-flex btn btn-primary me-2"
                  onClick={() => openModal(task)}
                >
                  <FontAwesomeIcon icon={faEdit} className="p-1" />
                  Edit
                </button>
                <button
                  className="d-inline-flex btn btn-primary btn-danger"
                  onClick={() => deleteTask(task)}
                >
                  <FontAwesomeIcon icon={faTrash} className="p-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bootstrap Modal Code Markup*/}
      {modalOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={addTask}>
                <div className="modal-body">
                  <div className="form-group mb-3">
                    <label className="form-label fw-bold" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      placeholder="Title"
                      defaultValue={editingTask ? editingTask.title : ""}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label fw-bold" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Description"
                      defaultValue={editingTask ? editingTask.description : ""}
                    ></textarea>
                  </div>
                  {editingTask && (
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select
                        className="form-control"
                        id="status"
                        value={selectedStatus}
                        onChange={(e) => changeStatus(e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        {/* Add other status options as needed */}
                      </select>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
