import {useState} from 'react';
import {Animated} from 'react-native';

export default () => {
    const opacityValue = useState(new Animated.Value(0))[0];
    const animateOpacity = ({duration, delay}) => {
        Animated.timing(opacityValue, {
            toValue: 1,
            duration,
            delay,
            useNativeDriver: true,
        }).start();
    };

    const opacity = opacityValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return [opacity, animateOpacity, opacityValue];
};
