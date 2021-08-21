import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTodos } from '../../../store/actions';

const ToDos = ({ todos, fetchTodos }) => (
    <div>
        <h1>ToDo</h1>
        <Link to={'/'}>Home</Link>
        <button type='button' onClick={() => fetchTodos()}>Fetch Todos</button>
        {todos.map(data => <p key={data.id}>{`${data.id} ${data.title}`}</p>)}
    </div>
);

const loadData = (store, param) => {
    return store.dispatch(fetchTodos(param))
}

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = { fetchTodos };

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(ToDos),
    loadData
};
