import axios from 'axios';
import {SecondSectionActionTypes} from '../types/index';
import {
    getAnimalTipoURL,
    getPedidoDetalleTipoParametroURL,
} from '../../net/Connector';

// Animal Tipo
const getAnimales = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getAnimalTipoURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    dispatch({
                        type: SecondSectionActionTypes.GET_ANIMALES,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getAnimalTipo: ', err);
                });
        } catch (err) {
            console.log('Error getAnimalTipo :', err);
        }
    };
};
// GRID AL RINDE DATA
const getPedidoDetalleTipoParametro = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getPedidoDetalleTipoParametroURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    let array = response.data;
                    array.map((item) => {
                        item.PrecioPactado = '';
                        item.Cantidad = '';
                    });
                    dispatch({
                        type: SecondSectionActionTypes.AL_RINDE,
                        payload: [...array],
                    });
                    // dispatch({
                    //     type: SecondSectionActionTypes.AL_RINDE_FINISHED,
                    //     payload: response.data,
                    // });
                })
                .catch((err) => {
                    console.log(
                        'Respuesta incorrecta getPedidoDetalleTipoParametro: ',
                        err,
                    );
                });
        } catch (err) {
            console.log('Error getPedidoDetalleTipoParametro :', err);
        }
    };
};
// VALOR CIRCULO TIPO DE COMPRA
const setTipoCompra = (text) => {
    return {
        type: SecondSectionActionTypes.TIPO_COMPRA,
        payload: text,
    };
};
// Animal seleccionado
const setAnimal = (animal) => {
    return {
        type: SecondSectionActionTypes.SET_SELECTED_ANIMAL,
        payload: animal,
    };
};
// KG Vivo
const addNewKgVivo = (animal, idAnimal, cantidad, KG, precio) => {
    return async (dispatch, getState) => {
        const payload = {
            PedidoDetallePedidoDetalleTipoParametros: [],
            Ingresos: [],
            Movimiento: {},
            PedidoDetalleTipo: 'Kg Vivo',
            PedidoDetalleTipoId: 2,
            AnimalTipo: animal,
            AnimalTipoId: idAnimal,
            Cantidad: cantidad,
            Peso: KG,
            PrecioPactado: precio,
            Activo: true,
        };
        const {section2} = await getState();
        const newList = [...section2.kgvivo_array];
        newList.push(payload);
        dispatch({
            type: SecondSectionActionTypes.ADD_NEW_KG_VIVO,
            payload: newList,
        });
        dispatch({type: SecondSectionActionTypes.CLEAR_NEW_KG_VIVO});
    };
};
const setCantidadKgVivo = (text) => {
    return {
        type: SecondSectionActionTypes.SET_CANTIDAD_KG_VIVO,
        payload: text,
    };
};
const setKgKgVivo = (text) => {
    return {
        type: SecondSectionActionTypes.SET_KG_KG_VIVO,
        payload: text,
    };
};
const setPrecioKgVivo = (text) => {
    return {
        type: SecondSectionActionTypes.SET_PRECIO_KG_VIVO,
        payload: text,
    };
};
// Al rinde
const setCantidadAlRinde = (text) => {
    return {
        type: SecondSectionActionTypes.SET_CANTIDAD_AL_RINDE,
        payload: text,
    };
};
const setPrecioPacAlRinde = (text) => {
    return {
        type: SecondSectionActionTypes.SET_PRECIO_PAC_AL_RINDE,
        payload: text,
    };
};
const setSelectedAlRindeItem = (text) => {
    return {
        type: SecondSectionActionTypes.SET_SELECTED_ALRINDE_ITEM,
        payload: text,
    };
};
const clearAlRindeValues = () => {
    return {
        type: SecondSectionActionTypes.CLEAR_AL_RINDE,
    };
};

const editAlRindeItem = (itemSelected, id) => {
    return async (dispatch, getState) => {
        const {section2} = await getState();
        const newList = [...section2.al_rinde];
        const hola = newList.filter((item) => {
            return item.Id !== id;
        });
        console.log('Hola: ', hola);
        hola.push(itemSelected);
        dispatch({type: SecondSectionActionTypes.AL_RINDE, payload: hola});
        debugger;
    };
};
// const addNewAlRindeItem = (itemSelected, cantidad, precio) => {
//     return async (dispatch, getState) => {
//         //esto es lo que va adentro del objeto. no se repite
//         const PedidoDetalleTipoParametro = {
//             PedidoDetalleTipo: 'Al Rinde',
//             PedidoDetalleTipoId: 1,
//             AnimalTipo: itemSelected.AnimalTipo,
//             AnimalTipoId: itemSelected.AnimalTipoId,
//             Cantidad: cantidad,
//             Categoria: itemSelected.Categoria,
//             CategoriaId: itemSelected.CategoriaId,
//             PrecioPactado: precio,
//             Precio: itemSelected.Precio,
//             Activo: true,
//             Descripcion: itemSelected.Descripcion,
//             Id: itemSelected.Id,
//         };

//         const {section2} = await getState();
//         const newList = [...section2.al_rinde_array];
//         // esto es un objeto de al rinde. se repite??
//         const payload = {
//             Cantidad: cantidad,
//             PrecioPactado: precio,
//             Activo: true,
//             PedidoDetalleTipoParametro: PedidoDetalleTipoParametro,
//             PedidoDetalleTipoParametroId: 1,
//         };
//         newList.push(payload);
//         console.log('payload: ', payload);
//         const finalListAlRinde = [
//             {
//                 PedidoDetallePedidoDetalleTipoParametros: newList,
//                 Ingresos: [],
//                 Movimiento: {},
//                 PedidoDetalleTipo: 'Al Rinde',
//                 PedidoDetalleTipoId: 1,
//                 Activo: true,
//             },
//         ];
//         debugger;
//         dispatch({
//             type: SecondSectionActionTypes.ADD_NEW_AL_RINDE,
//             payload: newList,
//         });
//         dispatch({
//             type: SecondSectionActionTypes.FINAL_LIST_AL_RINDE,
//             payload: finalListAlRinde,
//         });
//         dispatch({type: SecondSectionActionTypes.CLEAR_AL_RINDE});
//     };
// };

const clearSection2 = () => {
    return {
        type: SecondSectionActionTypes.CLEAR_SECTION_2,
    };
};

export default {
    // Tipo Animal
    getAnimales,
    setTipoCompra,
    setAnimal,
    // Kg Vivo
    addNewKgVivo,
    setCantidadKgVivo,
    setKgKgVivo,
    setPrecioKgVivo,
    // Al rinde
    setCantidadAlRinde,
    setPrecioPacAlRinde,
    setSelectedAlRindeItem,
    // addNewAlRindeItem,
    editAlRindeItem,
    clearAlRindeValues,
    // Pedido Detalle Tipo Parametro
    getPedidoDetalleTipoParametro,
    //Clear
    clearSection2,
};
