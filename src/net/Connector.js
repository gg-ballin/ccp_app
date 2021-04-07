// TEST

// const BASE_URL = 'https://test-adminccpfoods.azurewebsites.net/';
// const BASE_URL_AUTH = 'https://test-authccpfoods.azurewebsites.net/';

// PROD

const BASE_URL_AUTH = 'https://apiauthcpp.azurewebsites.net/';
const BASE_URL = 'https://apicoreccp.azurewebsites.net/';

// *** Login ************************
export const loginURL = () => BASE_URL_AUTH + 'api/v1/auth/login';
export const logoutURL = () => BASE_URL_AUTH + 'api/v1/auth/logout';
// *** User *************************
export const userDataURL = () => BASE_URL_AUTH + 'api/v1/usuario';
// *** Home *************************
export const getPCP7Days_URL = () =>
    BASE_URL + 'api/v1/indices/precio-compra-promedio/siete-dias';
export const getPCP30Days_URL = () =>
    BASE_URL + 'api/v1/indices/precio-compra-promedio/treinta-dias';
export const getPFP7Days_URL = () =>
    BASE_URL + 'api/v1/indices/precio-flete-promedio/siete-dias';
export const getPFP30Days_URL = () =>
    BASE_URL + 'api/v1/indices/precio-flete-promedio/treinta-dias';
// *** Pedido/Compra ****************
export const postPedido = () => BASE_URL + 'api/v1/Pedido';
export const getPedidosTodosURL = () => BASE_URL + 'api/v1/Pedido/mobilelist';
// *** Remitente ********************
export const getRemitenteURL = () => BASE_URL + 'api/v1/Remitente/dropdown/';
export const addRemitenteURL = () => BASE_URL + 'api/v1/Remitente/mobile';
// *** Provincias *****8********
export const getProvinciasURL = () => BASE_URL + 'api/v1/Provincia/dropdown/';
// *** Localidades ******************
export const getLocalidadesURL = (id) =>
    BASE_URL + `api/v1/Localidad/dropdown/${id}/provincia`;
// *** Comisionistas ***************
export const getComisionistasURL = () =>
    BASE_URL + 'api/v1/Comisionista/dropdown';
export const addComisionistaURL = () => BASE_URL + 'api/v1/Comisionista/mobile';
// *** Plazos ***********************
export const getPlazosURL = () => BASE_URL + 'api/v1/CondicionPago/dropdown';
// *** Destinos *********************
export const getDestinosURL = () => BASE_URL + 'api/v1/Destino/dropdown';
// *** Destino Disponibilidad *******
export const getDestinoDisponibilidadURL = (destinoId, fecha) =>
    BASE_URL +
    `api/v1/DestinoDisponibilidad/${destinoId}/destino?fecha=${fecha}`;
// *** Transportes ******************
export const getTransportesURL = () => BASE_URL + 'api/v1/Transporte/dropdown';
export const getTransporteTipoByIdURL = (transporteId) =>
    BASE_URL + `api/v1/Transporte/${transporteId}`;
export const addTransporteURL = () => BASE_URL + 'api/v1/Transporte/mobile';
// *** AnimalTipo *******************
export const getAnimalTipoURL = () => BASE_URL + 'api/v1/AnimalTipo/dropdown';
// *** PedidoDetalleTipoParametro ***
export const getPedidoDetalleTipoParametroURL = () =>
    BASE_URL + 'api/v1/PedidoDetalleTipoParametro/dropdown';
// *** AnimalTipo *******************
export const getTransporteTipoURL = () =>
    BASE_URL + 'api/v1/TransporteTipo/dropdown';
