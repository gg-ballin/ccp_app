/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    ScrollView,
    Text,
} from 'react-native';
// import Text from '../../../../components/textfields/TextCustom';
import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/Input';
import ListItem from '../../../../components/items/ListItem';
import {Colors} from '../../../../theme/index';
import {connect} from 'react-redux';
import Modal from '../../../../components/modal/Modal';
import {OrderActions, Section2Actions} from '../../../../redux/actions';
import {Keyboard} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const SecondSection = ({
    setSection,
    setTipoCompra,
    setAnimal,
    animalSelected,
    animales,
    al_rinde,
    tipo_compra,
    cantidadKgVivo,
    kgKgVivo,
    precioKgVivo,
    setCantidadKgVivo,
    setKgKgVivo,
    setPrecioKgVivo,
    kgvivo_array,
    addNewKgVivo,
    // al rinde
    cantidadAlRinde,
    precioPactadoAlRinde,
    setCantidadAlRinde,
    setPrecioPacAlRinde,
    setSelectedAlRindeItem,
    selectedAlRindeItem,
    editAlRindeItem,
    al_rinde_array,
    clearAlRindeValues,
}) => {
    const [animalModal, setAnimalModal] = useState(false);
    const [listKgVivoModal, setListKgModal] = useState(false);
    const [precioPac, setPrecioPac] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [alrindeModal, setAlrindeModal] = useState(false);
    const handleHeightGrid = () => {
        const isX =
            Platform.OS === 'ios' && (HEIGHT > 800 || WIDTH > 800)
                ? true
                : false;
        if (isX) {
            return 200;
        } else {
            if (Platform.OS === 'ios') {
                return 175;
            } else {
                return 185;
            }
        }
    };
    const showAnimalModal = () => {
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={animalModal}
                    title="Eleg?? el tipo de animal"
                    height="75%"
                    button={true}
                    onPress={() => {
                        setAnimalModal(false);
                    }}
                    onCloseModal={() => {
                        setAnimalModal(false);
                    }}>
                    <View style={{marginTop: 15, marginBottom: 115}}>
                        <FlatList
                            data={animales}
                            ListEmptyComponent={
                                <Text>No se hallaron resultados</Text>
                            }
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.btnModalSelect}
                                        onPress={() => {
                                            setAnimal(item);
                                            setAnimalModal(false);
                                        }}>
                                        <Text style={styles.descriptionStyle}>
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
    const showKgVivo = () => {
        return (
            <>
                <View style={styles.inputContainers}>
                    <View>
                        <Text style={styles.titleInput}>Cantidad</Text>
                        <Input
                            value={cantidadKgVivo}
                            onChangeText={(text) => setCantidadKgVivo(text)}
                            placeholder="Escriba"
                            keyboardType="number-pad"
                            style={{width: 83}}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleInput}>Kg</Text>
                        <Input
                            value={kgKgVivo}
                            onChangeText={(text) => setKgKgVivo(text)}
                            placeholder="Escriba"
                            keyboardType="number-pad"
                            style={{width: 83}}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleInput}>Precio</Text>
                        <Input
                            value={precioKgVivo}
                            onChangeText={(text) => setPrecioKgVivo(text)}
                            placeholder="Escriba"
                            keyboardType="number-pad"
                            style={{width: 83}}
                        />
                    </View>
                </View>
                <Button
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: Colors.White,
                    }}
                    title={
                        animalSelected
                            ? animalSelected.Descripcion === undefined
                                ? 'Seleccionar Animal'
                                : animalSelected.Descripcion
                            : 'Seleccionar Animal'
                    }
                    onPress={() => setAnimalModal(true)}
                />
            </>
        );
    };
    const showAlRinde = () => {
        return (
            <>
                <View style={[styles.grid, {height: handleHeightGrid()}]}>
                    <View style={styles.gridTitlesContainer}>
                        <Text style={styles.titleGrid}>Tipo</Text>
                        <Text style={styles.titleGrid}>{'Cat. '}</Text>
                        <Text style={styles.titleGrid}>{'$  '}</Text>
                        <Text style={styles.titleGrid}>{'        $Pac'}</Text>
                        <Text style={styles.titleGrid}>{'           '}</Text>
                    </View>
                    <ScrollView style={{width: '100%'}}>
                        {al_rinde.map((item) => {
                            return (
                                <ListItem
                                    tipo={item.AnimalTipo}
                                    categoria={item.Categoria}
                                    precio={item.Precio}
                                    precioPactado={
                                        item.PrecioPactado
                                            ? item.PrecioPactado
                                            : ''
                                    }
                                    cantidad={
                                        item.Cantidad ? item.Cantidad : ''
                                    }
                                    onPress={() => {
                                        setSelectedAlRindeItem(item);
                                        setAlrindeModal(true);
                                        clearAlRindeValues();
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
                <Button
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: Colors.White,
                    }}
                    title={
                        animalSelected
                            ? animalSelected.Descripcion === undefined
                                ? 'Seleccionar Animal'
                                : animalSelected.Descripcion
                            : 'Seleccionar Animal'
                    }
                    onPress={() => setAnimalModal(true)}
                />
            </>
        );
    };
    const renderSelectors = () => {
        return (
            <View style={styles.containerTipo}>
                <Text style={styles.titleItem}>Tipo de Compra</Text>
                <View style={styles.CirclesContainer}>
                    <View style={styles.CircleItem}>
                        <TouchableOpacity
                            style={{flexDirection: 'row'}}
                            onPress={() => setTipoCompra('kgvivo')}>
                            <View style={styles.Circle}>
                                <View
                                    style={[
                                        styles.InnerCircle,
                                        {
                                            backgroundColor:
                                                tipo_compra === 'kgvivo'
                                                    ? Colors.Red
                                                    : null,
                                        },
                                    ]}
                                />
                            </View>
                            <Text style={styles.jail}>Kg Vivo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 5}} />
                    <View style={styles.CircleItem}>
                        <TouchableOpacity
                            style={{flexDirection: 'row'}}
                            onPress={() => setTipoCompra('alrinde')}>
                            <View style={styles.Circle}>
                                <View
                                    style={[
                                        styles.InnerCircle,
                                        {
                                            backgroundColor:
                                                tipo_compra === 'alrinde'
                                                    ? Colors.Red
                                                    : null,
                                        },
                                    ]}
                                />
                            </View>
                            <Text style={styles.jail}>Al Rinde</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 15}} />
                <View style={styles.pickerContainer}>
                    {tipo_compra === 'kgvivo' ? showKgVivo() : showAlRinde()}
                </View>
            </View>
        );
    };

    const handleEditItem = () => {
        if (precioPactadoAlRinde) {
            selectedAlRindeItem.PrecioPactado = precioPactadoAlRinde;
            // selectedAlRindeItem.Cantidad = cantidadAlRinde;
            editAlRindeItem(selectedAlRindeItem, selectedAlRindeItem.Id);
            setAlrindeModal(false);
        }
    };
    const handleDismissAlRindeModal = () => {
        setAlrindeModal(false);
    };
    const showModalAlRinde = () => {
        console.log('alrinde item selected: ', selectedAlRindeItem);
        console.log('al_rinde: ', al_rinde);
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={alrindeModal}
                    title="Completa los campos"
                    height="80%"
                    button={true}
                    onPress={() => {
                        handleDismissAlRindeModal();
                    }}
                    onCloseModal={() => {
                        handleDismissAlRindeModal();
                    }}>
                    <Text style={{fontFamily: 'Poppins-Medium'}}>
                        Precio Pactado
                    </Text>
                    <View style={{height: 5}} />
                    <Input
                        keyboardType="number-pad"
                        value={precioPactadoAlRinde}
                        autoFocus
                        onChangeText={(text) => setPrecioPacAlRinde(text)}
                        style={styles.modalInputStyles}
                        placeholder="Escriba aqu??"
                    />
                    <View
                        style={{
                            width: '100%',
                            marginTop: 10,
                            alignItems: 'center',
                        }}>
                        <Button
                            title="Guardar"
                            style={{width: '45%'}}
                            disabled={!cantidadAlRinde && !precioPactadoAlRinde}
                            textStyle={{
                                color: precioPactadoAlRinde
                                    ? Colors.White
                                    : Colors.Hint,
                            }}
                            onPress={() =>
                                precioPactadoAlRinde ? handleEditItem() : null
                            }
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    const showModalListKgVivo = () => {
        console.log('KgVivo: ', kgvivo_array);
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={listKgVivoModal}
                    title="Detalle"
                    height="75%"
                    button={true}
                    onPress={() => {
                        setListKgModal(false);
                    }}
                    onCloseModal={() => setListKgModal(false)}>
                    <View style={{marginBottom: 115, marginTop: 25}}>
                        <FlatList
                            data={kgvivo_array}
                            renderItem={({item}) => {
                                return (
                                    <View
                                        style={{
                                            backgroundColor: Colors.Red,
                                            width: '100%',
                                            marginBottom: 10,
                                            borderRadius: 12,
                                            paddingTop: 7,
                                            paddingLeft: 12,
                                            height:
                                                Platform.OS === 'ios'
                                                    ? 95
                                                    : 110,
                                            flexDirection: 'column',
                                        }}>
                                        <View>
                                            <Text
                                                style={styles.AnimalTipoStyles}>
                                                Animal: {item.AnimalTipo}
                                            </Text>
                                            <Text
                                                style={styles.AnimalTipoStyles}>
                                                Cabezas: {item.Cantidad}
                                            </Text>
                                            <Text
                                                style={styles.AnimalTipoStyles}>
                                                Peso: {item.Peso}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={styles.AnimalTipoStyles}>
                                                Precio: ${item.PrecioPactado}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.ContentContainer}>
            <View style={styles.TitleContainer}>
                <Text adjustsFontSizeToFit style={styles.Title}>
                    Segunda Seccion
                </Text>
                <Text style={styles.part}>Parte 2 de 5</Text>
            </View>
            {renderSelectors()}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                }}>
                {tipo_compra === 'alrinde' ? (
                    <>
                        <Button
                            title="Info"
                            onPress={() => setListKgModal(true)}
                            style={{
                                width: '30%',
                                height: 30,
                                marginBottom: 10,
                                backgroundColor: Colors.White,
                                borderWidth: 1,
                                borderColor: Colors.Red,
                            }}
                            textStyle={{color: Colors.Red}}
                        />
                        <Button
                            title="Agregar AR"
                            onPress={() => {
                                addNewKgVivo(
                                    animalSelected.Descripcion,
                                    animalSelected.Id,
                                    cantidadKgVivo,
                                    kgKgVivo,
                                    precioKgVivo,
                                );
                                Keyboard.dismiss();
                            }}
                            style={{
                                width: '40%',
                                height: 30,
                                marginBottom: 10,
                                backgroundColor: Colors.Red,
                                borderWidth: 1,
                                borderColor: Colors.White,
                            }}
                            textStyle={{color: Colors.White}}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            title="Info"
                            onPress={() => setListKgModal(true)}
                            style={{
                                width: '30%',
                                height: 30,
                                marginBottom: 10,
                                backgroundColor: Colors.White,
                                borderWidth: 1,
                                borderColor: Colors.Red,
                            }}
                            textStyle={{color: Colors.Red}}
                        />
                        <Button
                            title="Agregar"
                            onPress={() => {
                                addNewKgVivo(
                                    animalSelected.Descripcion,
                                    animalSelected.Id,
                                    cantidadKgVivo,
                                    kgKgVivo,
                                    precioKgVivo,
                                );
                                Keyboard.dismiss();
                            }}
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                marginBottom: 10,
                                backgroundColor: Colors.Red,
                                borderWidth: 1,
                                borderColor: Colors.White,
                            }}
                            textStyle={{color: Colors.White}}
                        />
                    </>
                )}
            </View>
            <View />
            {/* <View /> */}
            {alrindeModal ? showModalAlRinde() : null}
            {listKgVivoModal ? showModalListKgVivo() : null}
            {animalModal ? showAnimalModal() : null}
            <View style={styles.Next}>
                <Button
                    title="Atr??s"
                    style={styles.BtnStyle}
                    textStyle={{color: Colors.White, fontSize: 20}}
                    onPress={() => {
                        setSection(1);
                        setTipoCompra('kgvivo');
                    }}
                />
                <Button
                    title="Siguiente"
                    style={{backgroundColor: Colors.Red, width: '45%'}}
                    textStyle={{color: Colors.White, fontSize: 20}}
                    onPress={() => setSection(3)}
                />
            </View>
        </KeyboardAvoidingView>
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
        justifyContent: 'space-evenly',
    },
    TitleContainer: {
        alignItems: 'center',
        width: '100%',
        height: 45,
        top: -20,
        // position: 'absolute',
        // top: 15,
    },
    modalInputStyles: {
        backgroundColor: Colors.Hint,
        color: Colors.White,
        width: '100%',
    },
    Title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 30,
        color: Colors.White,
    },
    part: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        // marginBottom: 10,
    },
    inputContainers: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        // backgroundColor: 'green',
        justifyContent: 'space-evenly',
    },
    titleInput: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 3,
    },

    titleItem: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 10,
        width: '90%',
    },
    containerTipo: {
        // backgroundColor: 'red',
        marginTop: -25,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    CirclesContainer: {
        // backgroundColor: 'blue',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    CircleItem: {
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    jail: {
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
    pickerContainer: {
        width: '90%',
        // backgroundColor: Colors.Green,
    },
    pickerStyles: {
        backgroundColor: Colors.White,
        borderRadius: 12,
    },
    grid: {
        backgroundColor: Colors.White,
        alignItems: 'center',
        borderRadius: 14,
        width: '100%',
        marginBottom: 20,
    },
    gridTitlesContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        borderBottomColor: Colors.Hint,
        borderBottomWidth: 1,
    },
    titleGrid: {
        fontFamily: 'Poppins-Medium',
        color: Colors.Black,
    },
    Next: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        // bottom: 10,
        bottom: 20,
        position: 'absolute',
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
    descriptionStyle: {
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold',
    },
    BtnStyle: {
        backgroundColor: Colors.Red,
        width: '45%',
    },
    AnimalTipoStyles: {
        fontFamily: 'Poppins-SemiBold',
        color: Colors.White,
    },
});

const mapStateToProps = (state) => ({
    animales: state.section2.animales,
    tipo_compra: state.section2.tipo_compra,
    al_rinde: state.section2.al_rinde,
    animalSelected: state.section2.animalSelected,
    cantidadKgVivo: state.section2.cantidadKgVivo,
    kgKgVivo: state.section2.kgKgVivo,
    precioKgVivo: state.section2.precioKgVivo,
    kgvivo_array: state.section2.kgvivo_array,
    cantidadAlRinde: state.section2.cantidadAlRinde,
    precioPactadoAlRinde: state.section2.precioPactadoAlRinde,
    selectedAlRindeItem: state.section2.selectedAlRindeItem,
    al_rinde_array: state.section2.al_rinde_array,
});

const mapDispatchToProps = (dispatch) => ({
    setSection: (section) => {
        dispatch(OrderActions.setSection(section));
    },
    setTipoCompra: (text) => {
        dispatch(Section2Actions.setTipoCompra(text));
    },
    setAnimal: (animal) => {
        dispatch(Section2Actions.setAnimal(animal));
    },
    setCantidadKgVivo: (text) => {
        dispatch(Section2Actions.setCantidadKgVivo(text));
    },
    setKgKgVivo: (text) => {
        dispatch(Section2Actions.setKgKgVivo(text));
    },
    setPrecioKgVivo: (text) => {
        dispatch(Section2Actions.setPrecioKgVivo(text));
    },
    setCantidadAlRinde: (text) => {
        dispatch(Section2Actions.setCantidadAlRinde(text));
    },
    setPrecioPacAlRinde: (text) => {
        dispatch(Section2Actions.setPrecioPacAlRinde(text));
    },
    setSelectedAlRindeItem: (text) => {
        dispatch(Section2Actions.setSelectedAlRindeItem(text));
    },
    clearAlRindeValues: () => {
        dispatch(Section2Actions.clearAlRindeValues());
    },
    editAlRindeItem: (itemSelected, id) => {
        dispatch(Section2Actions.editAlRindeItem(itemSelected, id));
    },
    addNewKgVivo: (cantidad, KG, precio, animal, idAnimal) => {
        dispatch(
            Section2Actions.addNewKgVivo(
                cantidad,
                KG,
                precio,
                animal,
                idAnimal,
            ),
        );
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SecondSection);
