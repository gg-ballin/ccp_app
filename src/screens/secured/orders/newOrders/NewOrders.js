/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import Header from '../../../../components/common/Header';
import DismissKeyboard from '../../../../components/common/DismissKeyboard';
import {Colors} from '../../../../theme/index';
import {connect} from 'react-redux';
import {
    Section1Actions,
    Section2Actions,
    Section3Actions,
    Section4Actions,
    Section5Actions,
} from '../../../../redux/actions';
import FirstSection from './Section_1';
import SecondSection from './Section_2';
import ThirdSection from './Section_3';
import FourthSection from './Section_4';
import FifthSection from './Section_5';
import ModalResponse from '../../../../components/modal/ModalResponse';
import ModalInfo from '../../../../components/common/ModalInfo';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const NewOrder = ({
    navigation,
    section,
    pedidoSuccess,
    showModalResponseOrder,
    showModalRespOrder,
    setModalNoData,
    modalNoData,
    loading,
    clearSection1,
    clearSection2,
    clearSection3,
    clearSection4,
    clearSection5,
}) => {
    const handleSections = () => {
        if (section === 1) {
            return <FirstSection />;
        } else if (section === 2) {
            return <SecondSection />;
        } else if (section === 3) {
            return <ThirdSection />;
        } else if (section === 4) {
            return <FourthSection />;
        } else if (section === 5) {
            return <FifthSection />;
        } else {
            return;
        }
    };
    const handleClearAllSections = () => {
        clearSection1();
        clearSection2();
        clearSection3();
        clearSection4();
        clearSection5();
    };
    const noDataModal = () => {
        return (
            <ModalInfo
                loading={loading}
                hasLoading={false}
                size="medium"
                title="Falta información para realizar la compra"
                buttonTitle="Volver"
                colorTextBtn={Colors.White}
                onPressButton={() => {
                    showModalResponseOrder(false);
                    setModalNoData(false);
                }}
            />
        );
    };
    const modalResponse = () => {
        debugger;
        return (
            <ModalResponse
                loading={loading}
                hasLoading={false}
                size="full"
                title="Compra realizada con éxito"
                buttonTitle="Ir a compras"
                colorTextBtn={Colors.White}
                onPressButton={() => {
                    showModalResponseOrder(false);
                    setModalNoData(false);
                    handleClearAllSections();
                    navigation.navigate('ORDERS');
                }}
            />
        );
    };
    console.log('loading: ', loading);
    console.log('pedidoSuccess: ', pedidoSuccess);
    console.log('showModalRespOrder: ', showModalRespOrder);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.Red}}>
            <DismissKeyboard>
                <View style={styles.Container}>
                    <Header
                        onPress={() => {
                            if (!loading) {
                                navigation.goBack();
                                handleClearAllSections();
                            }
                        }}
                        title="Nueva Compra"
                    />
                    {handleSections()}
                </View>
            </DismissKeyboard>
            {showModalRespOrder ? modalResponse() : null}
            {modalNoData ? noDataModal() : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignItems: 'center',
    },
    ContentContainer: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.85,
        backgroundColor: Colors.Hint,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    TitleContainer: {
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    Title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 35,
        color: Colors.White,
    },
    Next: {
        width: '90%',
    },
    searchSection: {
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    titleItem: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 10,
    },
    pickerContainer: {
        width: '90%',
    },
});

const mapStateToProps = (state) => ({
    section: state.orders.section,
    accessToken: state.login.accessToken,
    pedidoSuccess: state.section5.pedidoSuccess,
    pedidoResponse: state.section5.pedidoResponse,
    pedidoStatusMsg: state.section5.pedidoStatusMsg,
    showModalRespOrder: state.section5.showModalRespOrder,
    modalNoData: state.section5.modalNoData,
    loading: state.section5.loading,
});

const mapDispatchToProps = (dispatch) => ({
    clearSection1: () => {
        dispatch(Section1Actions.clearSection1());
    },
    clearSection2: () => {
        dispatch(Section2Actions.clearSection2());
    },
    clearSection3: () => {
        dispatch(Section3Actions.clearSection3());
    },
    clearSection4: () => {
        dispatch(Section4Actions.clearSection4());
    },
    clearSection5: () => {
        dispatch(Section5Actions.clearSection5());
    },
    showModalResponseOrder: (bool) => {
        dispatch(Section5Actions.showModalResponseOrder(bool));
    },
    setModalNoData: (bool) => {
        dispatch(Section5Actions.setModalNoData(bool));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
