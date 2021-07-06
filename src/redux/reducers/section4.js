import {FourthSectionActionTypes} from '../types/index';
const initialState = {
    loading: false,
    // TRANSPORTE
    transportes: {},
    transportesJaulas: [],
    transportesArray: [],
    transporteSearched: '',
    transporteSelected: {},
    transporteSelectedId: '',
    transportePKM: '',
    transporteCantJaulas: '',
    // TRANSPORTE TIPO
    transporteTipos: {},
    transporteTipoSelected: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // TRANSPORTES
        case FourthSectionActionTypes.GET_TRANSPORTES_START:
            return Object.assign({}, state, {
                loading: true,
            });
        case FourthSectionActionTypes.GET_TRANSPORTES_SUCCESS:
            return Object.assign({}, state, {
                transportes: action.payload,
                loading: false,
            });
        case FourthSectionActionTypes.GET_TRANSPORTES_FAILURE:
            return Object.assign({}, state, {
                transportes: {},
                loading: false,
            });
        case FourthSectionActionTypes.GET_TRANSPORTE_JAULAS_START:
            return Object.assign({}, state, {
                loading: true,
            });
        case FourthSectionActionTypes.GET_TRANSPORTE_JAULAS_SUCCESS:
            return Object.assign({}, state, {
                transportesJaulas: action.payload,
                loading: false,
            });
        case FourthSectionActionTypes.GET_TRANSPORTE_JAULAS_FAILURE:
            return Object.assign({}, state, {
                transportesJaulas: [],
                loading: false,
            });
        case FourthSectionActionTypes.SET_SELECTED_TRANSPORTE:
            return Object.assign({}, state, {
                transporteSelected: action.payload,
            });
        case FourthSectionActionTypes.SET_SELECTED_TRANSPORTE_ID:
            return Object.assign({}, state, {
                transporteSelectedId: action.payload,
            });
        case FourthSectionActionTypes.SET_SEARCH_TRANSPORTE:
            return Object.assign({}, state, {
                transporteSearched: action.payload,
            });
        case FourthSectionActionTypes.ADD_NEW_TRANSPORTE:
            return Object.assign({}, state, {
                transportesArray: action.payload,
            });
        case FourthSectionActionTypes.CLEAR_NEW_TRANSPORTE:
            return Object.assign({}, state, {
                transporteSelected: {},
                transportePKM: '',
                transporteCantJaulas: '',
                transporteTipoSelected: {},
            });
        // TRANSPORTES TIPO
        case FourthSectionActionTypes.GET_TRANSPORTES_TIPO_START:
            return Object.assign({}, state, {
                loading: true,
            });
        case FourthSectionActionTypes.GET_TRANSPORTES_TIPO_SUCCESS:
            return Object.assign({}, state, {
                transporteTipos: action.payload,
                loading: false,
            });
        case FourthSectionActionTypes.GET_TRANSPORTES_TIPO_FAILURE:
            return Object.assign({}, state, {
                transporteTipos: {},
                loading: false,
            });
        case FourthSectionActionTypes.SET_SELECTED_TRANSPORTE_TIPO:
            return Object.assign({}, state, {
                transporteTipoSelected: action.payload,
            });
        // (inputs precio km y cant jaulas)
        case FourthSectionActionTypes.SET_TRANSP_PKM:
            return Object.assign({}, state, {
                transportePKM: action.payload,
            });
        case FourthSectionActionTypes.SET_TRANSP_CANT_JAULAS:
            return Object.assign({}, state, {
                transporteCantJaulas: action.payload,
            });
        case FourthSectionActionTypes.CLEAR_SECTION_4:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
