/* eslint-disable react/prop-types */
import React from 'react';
import {Text} from 'react-native';

export default ({text, color, style, textStyle}) => {
  return (
    <Text style={textStyle} allowFontScaling={false}>
      {text}
    </Text>
  );
};
