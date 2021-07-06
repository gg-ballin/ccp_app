/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    SafeAreaView,
    Platform,
    Dimensions,
    Animated,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import BoardInfo from '../../../components/common/BoardInfo';
import useAnimatedOpacity from '../../../hooks/useAnimatedOpacity';
import {Colors} from '../../../theme';
import {connect} from 'react-redux';
import { HomeActions, OrderActions } from '../../../redux/actions';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeScreen = ({navigation, getPCP7Days, getPedidosTodos,accessToken}) => {
    const animLine = useState(new Animated.Value(0))[0];
    const [selected, setSelected] = useState(0);
    const [opacity, animateOpacity, opacityValue] = useAnimatedOpacity();

    useFocusEffect(
        React.useCallback(() => {
            setSelected(0);
            animateOpacity({duration: 300, delay: 100});
            return () => {
                opacityValue.setValue(0);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    );

    useEffect(() => {
        animatedLine();
        // getPCP7Days(accessToken);
        // check if array must be with one specific value so it doesn't
        // shows ai constantly
        // if (pedidosTodos.length < 1) {
        getPedidosTodos(accessToken);
        // }
    }, [selected]);
    const buildIconText = (text) => {
        let textName = text;
        return textName.charAt(0);
    };
    const animatedLine = () => {
        Animated.spring(animLine, {
            toValue: selected === 0 ? 0 : 1,
            useNativeDriver: true,
        }).start();
    };
    const translateX = animLine.interpolate({
        inputRange: [0, 1],
        outputRange: [0, responsiveWidth(50)],
        extrapolate: 'clamp',
    });

    const translateCupos = animLine.interpolate({
        inputRange: [0, 1],
        outputRange: [responsiveWidth(100), 0],
    });

    const translatePrecios = animLine.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -responsiveWidth(100)],
    });
    const handleTitles = () => {
        return (
            <View style={styles.options}>
                <TouchableWithoutFeedback
                    style={[styles.handler, {backgroundColor: 'blue'}]}
                    onPress={() => setSelected(0)}>
                    <View style={styles.handlerContent}>
                        <Text style={styles.txtHandler}>PRECIOS</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    style={styles.handler}
                    onPress={() => setSelected(1)}>
                    <View style={styles.handlerContent}>
                        <Text style={styles.txtHandler}>CUPOS FAENA</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
    const handleLine = () => {
        return (
            <View style={styles.containerLine}>
                <View style={styles.line}>
                    <Animated.View
                        style={[
                            styles.selectedLine,
                            {
                                transform: [{translateX}],
                            },
                        ]}
                    />
                </View>
            </View>
        );
    };
    const handlePrecios = () => {
        return (
            <>
                <View style={styles.containerPrecios}>
                    <Text style={{color: Colors.White, fontFamily: 'Poppins-SemiBold', fontSize: 20}}>Precio Compra</Text>
                    <View style={styles.containerBoardInfo}>
                        <BoardInfo number="0" title="% Mes" />
                        <BoardInfo number="0" title="% Semana" />
                    </View>
                </View>
                <View style={styles.containerPrecios}>
                    <Text style={{color: Colors.White, fontFamily: 'Poppins-SemiBold', fontSize: 20}}>Precio de la carne</Text>
                    <View style={styles.containerBoardInfo}>
                        <BoardInfo number="0" title="% Mes"  />
                        <BoardInfo number="0" title="% Semana" />
                    </View>
                </View>
              </>
        );
    };
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.containerKAV}>
                <View style={styles.header}>
                    <Text style={styles.title}>Home</Text>
                </View>
                <Animated.View style={{flex: 1}}>
                    {handleTitles()}
                    {handleLine()}
                    {selected === 0 && (
                        <Animated.View
                        style={[
                            {
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: [
                                    {translateX: translatePrecios},
                                ],
                            },
                        ]}>
                        {handlePrecios()}
                        </Animated.View>
                    )}
                    {selected === 1 && (
                        <Animated.View
                            style={[
                                {
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: [{translateX: translateCupos}]},
                            ]}>
                            {/* {handleTodas()} */}
                            <View style={styles.containerMensajes}>
                                <Text style={styles.mensajes}>Próximamente</Text>
                                <Text style={styles.mensajeRegular}>Acá vas a poder ver todos los cupos disponibles para faena</Text>
                            </View>
                        </Animated.View>
                    )}
                </Animated.View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {height: -2, width: 0},
        shadowRadius: 1,
        shadowOpacity: 0.2,
    },
    header: {
        marginTop: 15,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        fontSize: 30,
    },
    options: {
        // top: 25,
        marginTop: responsiveHeight(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: WIDTH,
        alignSelf: 'center',
        // height: responsiveHeight(5),
        // height: '15%',
    },
    handler: {
        flex: 1,
        height: '100%',
        width: responsiveWidth(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    handlerContent: {
        flex: 1,
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtHandler: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: responsiveFontSize(2.4),
        color: Colors.White,
    },
    containerLine: {
        alignSelf: 'center',
        // height: 5,
        width: WIDTH * 0.9,
        marginTop: 10,
    },
    line: {
        height: 3,
        width: responsiveWidth(80),
        // backgroundColor: 'grey',
    },
    selectedLine: {
        borderRadius: 45,
        height: 3,
        // alignSelf: 'auto',
        width: responsiveWidth(40),
        backgroundColor: Colors.Orange,
    },
    containerKAV: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    containerContent: {
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
        height: HEIGHT * 0.65,
    },
    containerMensajes: {
        backgroundColor: Colors.White,
        width: '100%',
        height: 200,
        marginTop: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPrecios: {
        backgroundColor: Colors.Hint,
        width: '100%',
        height: 200,
        marginTop: 15,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'space-evenly',
    },
    containerBoardInfo: {
        alignItems: 'center',
        flexDirection:'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    mensajes: {
        // color: Colors.Orange,
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    mensajeRegular: {
        // color: Colors.Orange,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        // paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
    NewOrderBtn: {
        marginBottom: 10,
        // alignSelf: 'flex-end',
        alignItems: 'center',
    },
});

const HomeContainer = (props) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.Red}}>
            <HomeScreen {...props} />
        </SafeAreaView>
    );
};
const mapStateToProps = (state) => ({
    pcp7Days: state.home.pcp7Days,
    pcp30Days: state.home.pcp30Days,
    pfp7Days: state.home.pfp7Days,
    pfp30Days: state.home.pfp30Days,
    accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
    getPCP7Days: (accessToken) => {
        dispatch(HomeActions.getPCP7Days(accessToken));
    },
    getPedidosTodos: (accessToken) => {
        dispatch(OrderActions.getPedidosTodos(accessToken));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
