import React from "react";
import './TodoItem.css';


export function TodoItem(props) {
    return <li data-id={props.todo.id} className={props.todo.completed ? 'is-done' : ''}
        onClick={(e) => props.handleClick(props.todo.id, e)}>
        <i className={props.todo.completed ? 'completed far fa-check-circle' : 'completed far fa-circle'}></i>
        {props.todo.text}
        <button className={"delete"} onClick={(e) => props.handleDelete(props.todo.id, e)}>✕</button>
    </li>;
}
