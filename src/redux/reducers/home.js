import {HomeActionTypes} from '../types/index';

const initialState = {
    pcp7Days: '',
    pcp30Days: '',
    pfp7Days: '',
    pfp30Days: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case HomeActionTypes.GET_PCP_7DAYS:
            return Object.assign({}, state, {
                pcp7Days: action.payload,
            });
        case HomeActionTypes.GET_PCP_30DAYS:
            return Object.assign({}, state, {
                pcp30Days: action.payload,
            });
        case HomeActionTypes.GET_PFP_7DAYS:
            return Object.assign({}, state, {
                pfp7Days: action.payload,
            });
        case HomeActionTypes.GET_PFP_7DAYS:
            return Object.assign({}, state, {
                pfp30Days: action.payload,
            });
        default:
            return state;
    }
}
