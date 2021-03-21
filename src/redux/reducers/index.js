import {combineReducers} from 'redux';
import login from './login';
import home from './home';
import orders from './orders';
import section1 from './section1';
import section2 from './section2';
import section3 from './section3';
import section4 from './section4';
import section5 from './section5';

const rootReducer = combineReducers({
    login,
    home,
    orders,
    section1,
    section2,
    section3,
    section4,
    section5,
});

export default rootReducer;
