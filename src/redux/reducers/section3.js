import {ThirdSectionActionTypes} from '../types/index';
const initialState = {
    // COMISIONISTA
    comisionista: {},
    comisionistaSearched: '',
    comisionistaSelected: {},
    comisionistaSwitch: false,
    // DESTINOS
    destinos: {},
    destinoSearcheded: '',
    destinoSelected: {},
    precio_km: '',
    cant_jaulas: '',
    // DESTINO DISPONIBILIDAD
    destino_disponibilidad: '',
    destinoId: '',
    destinoFechaSelected: {},
    showFechas: false,
    destinoFecha: {},
    colorDay: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // COMISIONISTA
        case ThirdSectionActionTypes.GET_COMISIONISTA:
            return Object.assign({}, state, {
                comisionista: action.payload,
            });
        case ThirdSectionActionTypes.SET_SEARCH_COMISIONISTA:
            return Object.assign({}, state, {
                comisionistaSearched: action.payload,
            });
        case ThirdSectionActionTypes.SET_SELECTED_COMISIONISTA:
            return Object.assign({}, state, {
                comisionistaSelected: action.payload,
            });
        case ThirdSectionActionTypes.COMISIONISTA_SWITCH:
            return Object.assign({}, state, {
                comisionistaSwitch: action.payload,
            });
        // DESTINOS
        case ThirdSectionActionTypes.GET_DESTINOS:
            return Object.assign({}, state, {
                destinos: action.payload,
            });
        case ThirdSectionActionTypes.SET_SELECTED_DESTINO:
            return Object.assign({}, state, {
                destinoSelected: action.payload,
            });
        case ThirdSectionActionTypes.SET_SEARCH_DESTINO:
            return Object.assign({}, state, {
                destinoSearched: action.payload,
            });
        // DESTINO DISPONIBILIDAD
        case ThirdSectionActionTypes.GET_DESTINO_DISPONIBILIDAD:
            return Object.assign({}, state, {
                // CHEQUEAR COMO RECIBE ESTO
                destino_disponibilidad: action.payload,
            });
        case ThirdSectionActionTypes.SET_DESTINO_ID:
            return Object.assign({}, state, {
                destinoId: action.payload,
            });
        case ThirdSectionActionTypes.SET_SELECTED_FECHA:
            return Object.assign({}, state, {
                destinoFechaSelected: action.payload,
            });
        case ThirdSectionActionTypes.SHOW_FECHAS:
            return Object.assign({}, state, {
                showFechas: action.payload,
            });
        case ThirdSectionActionTypes.DESTINO_FECHAS:
            return Object.assign({}, state, {
                destinoFecha: action.payload,
            });
        case ThirdSectionActionTypes.DESTINO_COLOR_DAY:
            return Object.assign({}, state, {
                colorDay: action.payload,
            });
        case ThirdSectionActionTypes.CLEAR_SECTION_3:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
