import React, { useEffect, useRef, useState } from "react";
import { ToDo } from "./../models/ToDo.d";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

interface Props {
  todo: ToDo;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}
export default function SingleTodo(props: Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(props.todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    props.setTodos(
      props.todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      )
    );
    setEdit(false);
  };

  const handleDone = (id: number) => {
    props.setTodos(
      props.todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  function handleDelete(id: number): void {
    props.setTodos(props.todos.filter((todo) => todo.id !== id));
  }
  console.log(props);
  return (
    <div>
      <form
        className="todos__single"
        onSubmit={(e) => handleEdit(e, props.todo.id)}
      >
        {edit ? (
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__single--text"
            ref={inputRef}
          />
        ) : props.todo.isDone ? (
          <s className="todos__single--text">{props.todo.todo}</s>
        ) : (
          <span className="todos__single--text">{props.todo.todo}</span>
        )}
        <span
          className="icon"
          onClick={() => {
            if (!edit && !props.todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(props.todo.id)} />
        </span>
        <span className="icon">
          <MdDone onClick={() => handleDone(props.todo.id)} />
        </span>
      </form>
    </div>
  );
}
