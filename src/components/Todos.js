import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTrash, FaEdit } from "react-icons/fa";

function Todos({ handleEdit, deleteTodo, completeTodo, filteredTodos }) {
  return (
    <>
      {filteredTodos.map((item) => {
        const { id, title, completed } = item;
        return (
          <div key={id} className="todo-list">
            <div className={`todo-item ${completed ? "completed" : ""}`}>
              <h3>{title}</h3>
            </div>
            <div className="btn-container">
              <button
                className="edit-btn"
                onClick={() => {
                  handleEdit(item);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="done-btn"
                onClick={() => {
                  completeTodo(id, item.completed);
                }}
              >
                <AiOutlineCheck />
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => {
                  deleteTodo(id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Todos;
