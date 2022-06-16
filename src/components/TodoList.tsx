import React from "react";
import { ToDo } from "./../models/ToDo.d";
import SingleTodo from './SingleTodo';
import "./styles.css";

interface Props {
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}
export default function TodoList(props: Props) {
  return (
    <div className='todos'>
      {props.todos.map((t) => (

        <SingleTodo todo={t} todos={props.todos} setTodos={props.setTodos}/>
        //<li key={t.id}> {t.todo}</li>
      ))}
    </div>
  );
}
