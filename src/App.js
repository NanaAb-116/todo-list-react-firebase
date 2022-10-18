import "./App.css";
import React, { useState, useEffect } from "react";
import Todos from "./components/Todos";
import { db } from "./firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import AddTodo from "./components/AddTodo";

function App() {
  const [list, setList] = useState([]);
  const [todoItem, setTodoItem] = useState({
    id: uuid(),
    title: "",
    completed: false,
    timestamp: serverTimestamp(),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [alert, setAlert] = useState("");

  const fetch = async () => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setList(arr);
    });
  };

  const filterHandler = useCallback(() => {
    switch (status) {
      case "completed":
        setFilteredTodos(list.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(list.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(list);
        break;
    }
  }, [list, status]);

  useEffect(() => {
    fetch();
    filterHandler();
  }, [filterHandler]);

  const showAlert = (msg) => {
    setAlert(msg);
    const timeout = setTimeout(() => {
      setAlert("");
    }, 2000);

    return () => clearTimeout(timeout);
  };

  const handleEdit = (item) => {
    setTodoItem({
      id: item.id,
      title: item.title,
      completed: item.completed,
      timestamp: todoItem.timestamp,
    });
    setIsEditing(true);
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      showAlert("Item Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!todoItem.title) {
      showAlert("You Didn't Enter Anything");
    } else {
      try {
        await setDoc(doc(db, "todos", todoItem.id), {
          ...todoItem,
        });
        if (isEditing) {
          showAlert("Value Changed Successfully");
        } else {
          showAlert("Item Added To Successfully");
        }
      } catch (error) {
        console.log(error);
      }
      setTodoItem({
        id: uuid(),
        title: "",
        completed: false,
        timestamp: serverTimestamp(),
      });
      setIsEditing(false);
    }
  };

  const completeTodo = async (id, comp) => {
    try {
      await updateDoc(doc(db, "todos", id), {
        completed: !comp,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <section className="main-container">
      <div className="todo-app">
        <h1 className="title">Todo List</h1>
        <div className="alert">
          <p>{alert}</p>
        </div>
        <AddTodo
          submitHandler={submitHandler}
          todoItem={todoItem}
          statusHandler={statusHandler}
          setTodoItem={setTodoItem}
          isEditing={isEditing}
        />
        {list.length > 0 && (
          <div className="todos-container">
            <Todos
              list={list}
              deleteTodo={deleteTodo}
              handleEdit={handleEdit}
              completeTodo={completeTodo}
              filteredTodos={filteredTodos}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
