import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const WhiteText = (props) => { // eslint-disable-line
  const { children } = props;
  const whiteStyle = {
    color: '#fff',
  };
  const { style } = props;
  const compStyle = [style, whiteStyle];
  return (
    <Text
      style={compStyle}
    >
      { children }
    </Text>
  );
};

WhiteText.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
};

export default WhiteText;