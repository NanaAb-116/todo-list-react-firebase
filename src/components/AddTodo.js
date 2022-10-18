import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

function AddTodo({
  submitHandler,
  todoItem,
  statusHandler,
  setTodoItem,
  isEditing,
}) {
  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          id="todo-input"
          placeholder="Enter an item"
          value={todoItem.title}
          onChange={(e) => {
            setTodoItem({ ...todoItem, title: e.target.value });
          }}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? (
            <FaEdit className="btn" />
          ) : (
            <AiOutlinePlus className="btn" />
          )}
        </button>
        <select name="todos" id="filter" onChange={statusHandler}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </form>
    </>
  );
}

export default AddTodo;
