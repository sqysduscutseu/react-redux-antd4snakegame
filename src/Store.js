import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import snake from './snake/reducer';

// import Perf from 'react-addons-perf'

let reducer = combineReducers({
    snake
})

// const win = window;
// // win.Perf = Perf;

// const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant')());
// }

// const storeEnhancers = compose(
//   applyMiddleware(...middlewares),
//   applyMiddleware(thunk),
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

const store = createStore(reducer, applyMiddleware(thunk));

export default store;