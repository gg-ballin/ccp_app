import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';

const IconButton = ({children, onPress, style}) => {
    return (
        <TouchableOpacity
            style={{...style, ...commonStyle}}
            hitSlop={{bottom: 30, left: 30, right: 30, top: 30}}
            onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};
const commonStyle = {zIndex: 9999};

export default IconButton;
