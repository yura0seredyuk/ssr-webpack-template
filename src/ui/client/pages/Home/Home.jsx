import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { setHello } from '../../../../store/actions';

const Home = ({ hello, setHello, t }) => (
    <div>
        <h1>Home</h1>
        <h2>{t('welcome')}</h2>
        <Link to='/about'>About</Link>
        <br/>
        <Link to='/todos'>ToDo</Link>
        <br/>
        <div>{hello}</div>
        <button type='button' onClick={() => setHello('Hello')}>Click</button>
    </div>
);

const MapStateToProps = state => ({
    hello: state.hello
})

const MapDispatchToProps = { setHello }

export default { component: connect(MapStateToProps, MapDispatchToProps)(withNamespaces()(Home)) };

Home.propTypes = {
    t : PropTypes.func.isRequired
};
