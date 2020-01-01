import React from 'react';
import './TodoList.css';
import { Cookies } from 'react-cookie';
import { TodoItem } from './TodoItem';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.cookies = new Cookies();
        let oldTodo = this.cookies.get('todo');
        if (oldTodo) {
            this.state = oldTodo;
        } else {
            this.state = {
                todoList: {},
                count_total: 0,
                count_incomplete: 0,
                new_todo_value: ''
            };
        }

        this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    setStateCallback() {
        let date = new Date();
        date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
        this.cookies.set('todo', this.state, { path: '/', expires: date });
        this.nameInput.focus();
    }

    cross(id) {
        this.setState(function(state, props){
            if (! state.todoList.hasOwnProperty(id)) {
                return {};
            }
            let crossed = !state.todoList[id].completed;
            state.todoList[id].completed = crossed;
            return {
                todoList: state.todoList,
                count_incomplete: state.count_incomplete + (crossed ?  - 1 : 1)
            };
        }, this.setStateCallback);
    }

    addTodo() {
        this.setState(function(state, props){
            // todoList items should not be empty
            if (state.new_todo_value.trim() === "") {
                return {new_todo_value: ''};
            }

            state.todoList[state.count_total] = {id: state.count_total, text: state.new_todo_value, completed: false};
            return {
                new_todo_value: '',
                todoList: state.todoList,
                count_total: state.count_total + 1,
                count_incomplete: state.count_incomplete + 1
            };
        }, this.setStateCallback);
    }

    removeTodo(id) {
        this.setState(function(state, props){
            if (! state.todoList.hasOwnProperty(id)) {
                return {};
            }
            let is_completed = state.todoList[id].completed;
            delete state.todoList[id];
            return {
                todoList: state.todoList,
                count_total: state.count_total - 1,
                count_incomplete: state.count_incomplete + (is_completed ? 0 : -1)
            };
        }, this.setStateCallback);
    }

    handleNewTodoChange(event) {
        this.setState({new_todo_value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addTodo(event);
    }

    render() {
        return (
            <div className={"container text-center"}>
                <ul className={"todo-list text-left"}>
                  {Object.values(this.state.todoList).map((todo) =>
                      <TodoItem todo={todo} key={todo.id} handleClick={this.cross.bind(this)} handleDelete={this.removeTodo.bind(this)} />
                  )}
                </ul>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="d-flex bd-highlight">
                        <div className="flex-grow-1 bd-highlight">
                            <input type={"text"}
                               className={"new-todo"}
                               style={{height: 35}}
                               value={this.state.new_todo_value}
                               onChange={this.handleNewTodoChange}
                               placeholder={"Add new item"}
                               ref={(input) => { this.nameInput = input; }} />
                        </div>
                        <div className="bd-highlight">
                            <button type={"submit"} className={"btn btn-primary add-button"}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </form>
                <hr/>
                <p>{this.state.count_incomplete} remaining out of {this.state.count_total} tasks</p>
            </div>
        );
    }
}
