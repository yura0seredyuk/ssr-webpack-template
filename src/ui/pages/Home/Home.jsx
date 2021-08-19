import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHello } from '../../../store/actions';


const Home = ({ hello, setHello }) => (
    <div>
        <h1>Home</h1>
        <Link to={'/about'}>About</Link>
        <br/>
        <Link to={'/todos'}>ToDo</Link>
        <br/>
        <div>{hello}</div>
        {console.log(hello)}
        <button type='button' onClick={() => setHello('Hello')}>Click</button>
    </div>
);

const MapStateToProps = state => ({
    hello: state.hello
})

const MapDispatchToProps = { setHello }

export default { component: connect(MapStateToProps, MapDispatchToProps)(Home) };
