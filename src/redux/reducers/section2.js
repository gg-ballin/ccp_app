import {SecondSectionActionTypes} from '../types/index';
const initialState = {
    tipo_compra: 'kgvivo',
    animales: {},
    // Kg vivo
    kgvivo_array: [],
    animalSelected: {},
    cantidadKgVivo: '',
    kgKgVivo: '',
    precioKgVivo: '',
    kgvivo: {},
    // Al rinde
    al_rinde: {},
    al_rinde_array: [],
    selectedAlRindeItem: {},
    cantidadAlRinde: '',
    precioPactadoAlRinde: '',
    final_alrinde_array: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // TIPO DE COMPRA
        case SecondSectionActionTypes.TIPO_COMPRA:
            return Object.assign({}, state, {
                tipo_compra: action.payload,
            });
        case SecondSectionActionTypes.GET_ANIMALES:
            return Object.assign({}, state, {
                animales: action.payload,
            });
        case SecondSectionActionTypes.SET_CANTIDAD_KG_VIVO:
            return Object.assign({}, state, {
                cantidadKgVivo: action.payload,
            });
        case SecondSectionActionTypes.SET_KG_KG_VIVO:
            return Object.assign({}, state, {
                kgKgVivo: action.payload,
            });
        case SecondSectionActionTypes.SET_PRECIO_KG_VIVO:
            return Object.assign({}, state, {
                precioKgVivo: action.payload,
            });
        case SecondSectionActionTypes.ADD_NEW_KG_VIVO:
            return Object.assign({}, state, {
                kgvivo_array: action.payload,
            });
        case SecondSectionActionTypes.CLEAR_NEW_KG_VIVO:
            return Object.assign({}, state, {
                cantidadKgVivo: '',
                kgKgVivo: '',
                precioKgVivo: '',
                animalSelected: {},
            });
        case SecondSectionActionTypes.SET_SELECTED_ANIMAL:
            return Object.assign({}, state, {
                animalSelected: action.payload,
            });
        case SecondSectionActionTypes.AL_RINDE:
            return Object.assign({}, state, {
                al_rinde: action.payload,
            });
        case SecondSectionActionTypes.SET_CANTIDAD_AL_RINDE:
            return Object.assign({}, state, {
                cantidadAlRinde: action.payload,
            });
        case SecondSectionActionTypes.SET_PRECIO_PAC_AL_RINDE:
            return Object.assign({}, state, {
                precioPactadoAlRinde: action.payload,
            });
        case SecondSectionActionTypes.SET_SELECTED_ALRINDE_ITEM:
            return Object.assign({}, state, {
                selectedAlRindeItem: action.payload,
            });
        case SecondSectionActionTypes.ADD_NEW_AL_RINDE:
            return Object.assign({}, state, {
                al_rinde_array: action.payload,
            });
        case SecondSectionActionTypes.FINAL_LIST_AL_RINDE:
            return Object.assign({}, state, {
                final_alrinde_array: action.payload,
            });
        case SecondSectionActionTypes.CLEAR_AL_RINDE:
            return Object.assign({}, state, {
                cantidadAlRinde: '',
                precioPactadoAlRinde: '',
            });
        case SecondSectionActionTypes.CLEAR_SECTION_2:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
