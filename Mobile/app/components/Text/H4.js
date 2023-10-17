import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const H4 = (props) => { // eslint-disable-line
  const { children } = props;

  return (
    <Text
      style={{
        fontSize: 54,
        fontWeight: 'bold',
      }}
    >
      { children }
    </Text>
  );
};

H4.propTypes = {
  children: PropTypes.any,
};

export default H4;