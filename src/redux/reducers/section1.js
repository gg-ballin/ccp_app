import {FirstSectionActionTypes} from '../types/index';
const initialState = {
    loading: false,
    //REMITENTE
    remitente: {},
    remitenteSearched: '',
    remitenteSelected: {},
    // PROVINCIAS
    provincias: {},
    provinciaSelected: {},
    // LOCALIDADES
    localidades: {},
    localidadSearched: '',
    localidadSelected: {},
    // PLAZOS
    plazos: {},
    plazoOther: '',
    plazoOtherId: '',
    plazoSelected: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // REMITENTE
        case FirstSectionActionTypes.GET_REMITENTES:
            return Object.assign({}, state, {
                remitente: action.payload,
            });
        case FirstSectionActionTypes.SET_SEARCH_REMITENTES:
            return Object.assign({}, state, {
                remitenteSearched: action.payload,
            });
        case FirstSectionActionTypes.GET_REMITENTES_START:
            return Object.assign({}, state, {
                loading: true,
            });
        case FirstSectionActionTypes.GET_REMITENTES_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
            });
        case FirstSectionActionTypes.GET_REMITENTES_FAILURE:
            return Object.assign({}, state, {
                loading: false,
            });
        case FirstSectionActionTypes.SET_SELECTED_REMITENTES:
            return Object.assign({}, state, {
                remitenteSelected: action.payload,
            });
        // PROVINCIAS
        case FirstSectionActionTypes.GET_PROVINCIAS:
            return Object.assign({}, state, {
                provincias: action.payload,
            });
        case FirstSectionActionTypes.SET_PROVINCIAS:
            return Object.assign({}, state, {
                provinciaSelected: action.payload,
            });
        case FirstSectionActionTypes.GET_PROVINCIAS_START:
            return Object.assign({}, state, {
                loading: true,
            });
        case FirstSectionActionTypes.GET_PROVINCIAS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
            });
        case FirstSectionActionTypes.GET_PROVINCIAS_FAILURE:
            return Object.assign({}, state, {
                loading: false,
            });
        // LOCALIDADES
        case FirstSectionActionTypes.GET_LOCALIDADES:
            return Object.assign({}, state, {
                localidades: action.payload,
            });
        case FirstSectionActionTypes.SET_SEARCH_LOCALIDADES:
            return Object.assign({}, state, {
                localidadSearched: action.payload,
            });
        case FirstSectionActionTypes.SET_LOCALIDADES:
            return Object.assign({}, state, {
                localidadSelected: action.payload,
            });
        // PLAZOS
        case FirstSectionActionTypes.GET_PLAZOS:
            return Object.assign({}, state, {
                plazos: action.payload,
            });
        case FirstSectionActionTypes.SET_SELECTED_PLAZO:
            return Object.assign({}, state, {
                plazoSelected: action.payload,
            });
        case FirstSectionActionTypes.SET_OTHER_PLAZO:
            return Object.assign({}, state, {
                plazoOther: action.payload,
            });
        case FirstSectionActionTypes.SET_OTHER_PLAZO_ID:
            return Object.assign({}, state, {
                plazoOtherId: action.payload,
            });
        case FirstSectionActionTypes.CLEAR_SECTION_1:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
