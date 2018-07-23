import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import reduxThunk from 'redux-thunk';
import modules from './reducers';

const middlewares = [reduxThunk];

const enhancers = [applyMiddleware(...middlewares)];

const reducers = combineReducers(Object.assign({}, modules));

export default function setUpStore() {
    const state = localStorage.getItem('storeState');
    return state ? getStatedStorage(state) : getDefaultStorage();
}

function getDefaultStorage() {
    const store = createStore(reducers, {}, compose(...enhancers));
    global.store = store;
    return store;
}

function getStatedStorage(state) {
    const jsonState = JSON.parse(state)
    const store = createStore(reducers, jsonState, compose(...enhancers));
    global.store = store;
    return store;
}