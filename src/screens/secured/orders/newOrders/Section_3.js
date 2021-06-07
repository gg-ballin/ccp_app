/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Switch,
    FlatList,
    TouchableOpacity,
    Platform,
    Text,
} from 'react-native';
import Button from '../../../../components/buttons/Button';
import SearchButton from '../../../../components/buttons/SearchButton';
// import Text from '../../../../components/textfields/TextCustom';
import {Colors} from '../../../../theme/index';
import {connect} from 'react-redux';
import {OrderActions, Section3Actions} from '../../../../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from '../../../../components/modal/Modal';
import Input from '../../../../components/inputs/Input';
import moment from 'moment';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ThirdSection = ({
    setSection,
    // Comisionista
    comisionista,
    comisionistaSelected,
    comisionistaSearched,
    setSelectedComisionista,
    setSearchComisionista,
    comisionistaSwitch,
    setSwitchComisionista,
    addComisionista,
    getComisionistas,
    // Destino
    destinos,
    destinoSelected,
    destinoSearched,
    setSearchDestino,
    setSelectedDestino,
    // Destino Disponibilidad
    destinoId,
    getDestinoDisponibilidad,
    setDestinoFecha,
    setDestinoId,
    showFechas,
    destinoFecha,
    setColorDay,
    colorDay,
    // Token
    accessToken,
}) => {
    const [destinoModal, setDestinoModal] = useState(false);
    const [comisionistaModal, setComisionistaModal] = useState(false);

    const toggleSwitch = () => setSwitchComisionista(!comisionistaSwitch);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        const fecha = moment(date, 'YYYY-MM-DD');
        const parsedFecha = fecha.format('YYYY-MM-DD');
        const dia = moment(fecha, 'YYYY-MM-DD HH:mm:ss');
        const parsedDia = handleDias(dia.format('dddd'));
        if (show && selectedDate) {
            setColorDay(parsedDia);
            getDestinoDisponibilidad(destinoId, parsedFecha, accessToken);
            setDestinoFecha(parsedFecha);
        }
    };
    const showWeek = () => {
        return (
            <View style={styles.ContainerWeek}>
                <View
                    style={[
                        styles.WeekDay,
                        {
                            backgroundColor:
                                colorDay === 'Lu' ? Colors.Green : Colors.White,
                        },
                    ]}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>Lu</Text>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {destinoFecha.Lunes}
                    </Text>
                    <View />
                </View>
                <View
                    style={[
                        styles.WeekDay,
                        {
                            backgroundColor:
                                colorDay === 'Ma' ? Colors.Green : Colors.White,
                        },
                    ]}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>Ma</Text>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {destinoFecha.Martes}
                    </Text>
                    <View />
                </View>
                <View
                    style={[
                        styles.WeekDay,
                        {
                            backgroundColor:
                                colorDay === 'Mi' ? Colors.Green : Colors.White,
                        },
                    ]}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>Mi</Text>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {destinoFecha.Miercoles}
                    </Text>
                    <View />
                </View>
                <View
                    style={[
                        styles.WeekDay,
                        {
                            backgroundColor:
                                colorDay === 'Ju' ? Colors.Green : Colors.White,
                        },
                    ]}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>Ju</Text>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {destinoFecha.Jueves}
                    </Text>
                    <View />
                </View>
                <View
                    style={[
                        styles.WeekDay,
                        {
                            backgroundColor:
                                colorDay === 'Vi' ? Colors.Green : Colors.White,
                        },
                    ]}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>Vi</Text>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {destinoFecha.Viernes}
                    </Text>
                    <View />
                </View>
                <View
                    style={[
                        styles.WeekDay,
                        {
                            backgroundColor:
                                colorDay === 'Sa' ? Colors.Green : Colors.White,
                        },
                    ]}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>Sa</Text>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {destinoFecha.Sabado}
                    </Text>
                    <View />
                </View>
                <View
                    style={[
                        styles.WeekDay,
                        {backgroundColor: Colors.RedError},
                    ]}>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>Do</Text>
                    <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                        {destinoFecha.Domingo}
                    </Text>
                </View>
            </View>
        );
    };
    const handleDias = (dia) => {
        let diaParsed;
        switch (dia) {
            case 'Monday':
                diaParsed = 'Lu';
                return diaParsed;
            case 'Tuesday':
                diaParsed = 'Ma';
                return diaParsed;
            case 'Wednesday':
                diaParsed = 'Mi';
                return diaParsed;
            case 'Thursday':
                diaParsed = 'Ju';
                return diaParsed;
            case 'Friday':
                diaParsed = 'Vi';
                return diaParsed;
            case 'Saturday':
                diaParsed = 'Sa';
                return diaParsed;
            case 'Sunday':
                diaParsed = 'Do';
                return diaParsed;
            default:
                return null;
        }
    };
    const showDestinoModal = () => {
        const filtereData = destinoSearched
            ? destinos.filter((dest) =>
                  dest.Descripcion.toLowerCase().includes(
                      destinoSearched.toLowerCase(),
                  ),
              )
            : destinos;
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={destinoModal}
                    title="Ingresá el destino"
                    height="75%"
                    button={true}
                    onPress={() => {
                        setDestinoModal(false);
                    }}
                    onCloseModal={() => setDestinoModal(false)}>
                    <Input
                        value={destinoSearched}
                        autoFocus
                        onChangeText={(text) => setSearchDestino(text)}
                        style={styles.modalInputStyles}
                        placeholder="Escriba aquí"
                    />
                    <View style={{marginBottom: 115, marginTop: 15}}>
                        <FlatList
                            data={filtereData}
                            ListEmptyComponent={
                                <Text>No se hallaron resultados</Text>
                            }
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.btnModalSelect}
                                        onPress={() => {
                                            setSelectedDestino(item);
                                            setDestinoId(item.Id);
                                            setDestinoModal(false);
                                        }}>
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 10,
                                                fontFamily: 'Poppins-SemiBold',
                                            }}>
                                            {item.Descripcion}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    const showComisionistaModal = () => {
        console.log('comisionistas', comisionista);
        const filtereData = comisionistaSearched
            ? comisionista.filter((comi) =>
                  comi.Descripcion.toLowerCase().includes(
                      comisionistaSearched.toLowerCase(),
                  ),
              )
            : comisionista;
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={comisionistaModal}
                    title="Buscá por comisionista"
                    height="75%"
                    button={true}
                    onPress={() => {
                        setComisionistaModal(false);
                        setSearchComisionista('');
                    }}
                    onCloseModal={() => {
                        setComisionistaModal(false);
                        setSearchComisionista('');
                    }}>
                    <Input
                        autoFocus
                        value={comisionistaSearched}
                        onChangeText={(text) => setSearchComisionista(text)}
                        style={styles.modalInputStyles}
                        placeholder="Escriba aquí"
                    />
                    {filtereData.length === 0 ? (
                        <Button
                            title="Agregar comisionista"
                            style={{
                                width: '75%',
                                alignSelf: 'center',
                                marginTop: 15,
                            }}
                            textStyle={{color: Colors.White}}
                            onPress={() => {
                                addComisionista(
                                    comisionistaSearched,
                                    accessToken,
                                );
                                debugger;
                                getComisionistas(accessToken);
                                setComisionistaModal(false);
                                setSearchComisionista('');
                            }}
                        />
                    ) : null}
                    <View style={{marginBottom: 115, marginTop: 15}}>
                        <FlatList
                            data={filtereData}
                            ListEmptyComponent={
                                <Text>No se hallaron resultados</Text>
                            }
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.btnModalSelect}
                                        onPress={() => {
                                            setSelectedComisionista(item);
                                            setComisionistaModal(false);
                                        }}>
                                        <Text
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 10,
                                                fontFamily: 'Poppins-SemiBold',
                                            }}>
                                            {item.Descripcion}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    return (
        <View style={styles.ContentContainer}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Tercera Sección</Text>
                <Text style={styles.part}>Parte 3 de 5</Text>
            </View>
            <View style={styles.ComisionSection}>
                <View style={styles.comisionContainer}>
                    <Text style={styles.titleItem}>Comisionista</Text>
                    <Switch
                        trackColor={{
                            false: Colors.DarkGrey,
                            true: Colors.Green,
                        }}
                        thumbColor={
                            comisionistaSwitch ? Colors.White : '#f4f3f4'
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={comisionistaSwitch}
                    />
                </View>
                {comisionistaSwitch ? (
                    <View style={{}}>
                        <SearchButton
                            searched={
                                comisionistaSelected
                                    ? comisionistaSelected.Descripcion
                                    : null
                            }
                            onPress={() => setComisionistaModal(true)}
                        />
                    </View>
                ) : null}
            </View>
            <View style={styles.destinySection}>
                <Text style={styles.titleItem}>Destino</Text>
                <View style={{height: 10}} />
                <SearchButton
                    searched={
                        destinoSelected ? destinoSelected.Descripcion : null
                    }
                    onPress={() => setDestinoModal(true)}
                />
            </View>
            <View
                style={{
                    marginTop: 15,
                    // backgroundColor: 'blue',
                    width: '90%',
                    height: 24,
                }}>
                {destinoSelected && destinoSelected.Descripcion ? (
                    <>
                        {!show ? (
                            <Button
                                style={{
                                    backgroundColor: !destinos
                                        ? Colors.InputGray
                                        : Colors.White,
                                }}
                                title={
                                    !destinoSelected
                                        ? 'Calendario'
                                        : '🗓️ Elija la fecha'
                                }
                                textStyle={{
                                    color: !destinos
                                        ? Colors.White
                                        : Colors.Black,
                                }}
                                disabled={!destinoSelected}
                                onPress={() => setShow(true)}
                            />
                        ) : null}
                    </>
                ) : null}
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    timeZoneOffsetInMinutes={60}
                    style={{
                        width: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        marginTop: Platform.OS === 'ios' ? null : null,
                    }}
                    display={'default'}
                    onChange={onChange}
                />
            )}
            <View
                style={{
                    // height: 40,
                    width: '90%',
                    marginTop: 35,
                }}
            />
            {showFechas ? showWeek() : null}
            {destinoModal ? showDestinoModal() : null}
            {comisionistaModal ? showComisionistaModal() : null}

            <View style={styles.Next}>
                <Button
                    title="Atrás"
                    style={{backgroundColor: Colors.Red, width: '45%'}}
                    textStyle={{color: Colors.White, fontSize: 20}}
                    onPress={() => setSection(2)}
                />
                <Button
                    title="Siguiente"
                    style={{backgroundColor: Colors.Red, width: '45%'}}
                    textStyle={{color: Colors.White, fontSize: 20}}
                    onPress={() => {
                        getComisionistas(accessToken);
                        setSection(4);
                    }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    ContentContainer: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.85,
        backgroundColor: Colors.Hint,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        // justifyContent: 'space-evenly',
    },
    TitleContainer: {
        alignItems: 'center',
        width: '100%',
        height: 45,
        marginTop: 20,
    },
    Title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 30,
        color: Colors.White,
    },
    part: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
    },
    ComisionSection: {
        width: '90%',
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'space-between',
    },
    comisionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    destinySection: {
        width: '90%',
        marginTop: 15,
    },
    titleItem: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
    },
    Transport: {
        width: '90%',
    },
    CirclesContainer: {
        width: '90%',
    },
    CircleItem: {
        flexDirection: 'row',
    },
    TitleSelect: {
        fontFamily: 'Poppins-Medium',
        color: Colors.White,
        marginLeft: 10,
    },
    Circle: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
    },
    pickerStyles: {
        backgroundColor: Colors.White,
        borderRadius: 12,
    },
    containerModal: {
        position: 'absolute',
        opacity: 0.76,
        height: HEIGHT,
        width: WIDTH,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        // backgroundColor: 'red',
        zIndex: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnModalSelect: {
        // backgroundColor: 'green',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.Orange,
    },
    modalInputStyles: {
        backgroundColor: Colors.Hint,
        color: Colors.White,
    },
    ContainerWeek: {
        // backgroundColor: 'green',
        width: '95%',
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    WeekDay: {
        borderWidth: 1,
        height: '100%',
        width: 45,
        justifyContent: 'space-evenly',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: Colors.White,
    },
    Next: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        bottom: 20,
        position: 'absolute',
    },
});

const mapStateToProps = (state) => ({
    // Comisionista
    comisionista: state.section3.comisionista,
    comisionistaSelected: state.section3.comisionistaSelected,
    comisionistaSearched: state.section3.comisionistaSearched,
    comisionistaSwitch: state.section3.comisionistaSwitch,
    // Destinos
    destinos: state.section3.destinos,
    destinoSearched: state.section3.destinoSearched,
    destinoSelected: state.section3.destinoSelected,
    // Destino Disponibilidad
    destino_disponibilidad: state.section3.destino_disponibilidad,
    destinoId: state.section3.destinoId,
    destinoFechaSelected: state.section3.destinoFechaSelected,
    showFechas: state.section3.showFechas,
    destinoFecha: state.section3.destinoFecha,
    colorDay: state.section3.colorDay,
    // Token
    accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
    setSection: (section) => {
        dispatch(OrderActions.setSection(section));
    },
    setSearchComisionista: (comisionista) => {
        dispatch(Section3Actions.setSearchComisionista(comisionista));
    },
    setSelectedComisionista: (comisionista) => {
        dispatch(Section3Actions.setSelectedComisionista(comisionista));
    },
    getComisionistas: (accessToken) => {
        dispatch(Section3Actions.getComisionistas(accessToken));
    },
    setSwitchComisionista: (bool) => {
        dispatch(Section3Actions.setSwitchComisionista(bool));
    },
    addComisionista: (comisionista, accessToken) => {
        dispatch(Section3Actions.addComisionista(comisionista, accessToken));
    },
    setSelectedDestino: (destino) => {
        dispatch(Section3Actions.setSelectedDestino(destino));
    },
    setSearchDestino: (destino) => {
        dispatch(Section3Actions.setSearchDestino(destino));
    },
    getDestinoDisponibilidad: (destinoId, fecha, accessToken) => {
        dispatch(
            Section3Actions.getDestinoDisponibilidad(
                destinoId,
                fecha,
                accessToken,
            ),
        );
    },
    setDestinoFecha: (destino) => {
        dispatch(Section3Actions.setDestinoFecha(destino));
    },
    setDestinoId: (destino) => {
        dispatch(Section3Actions.setDestinoId(destino));
    },
    setColorDay: (destino) => {
        dispatch(Section3Actions.setColorDay(destino));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThirdSection);
