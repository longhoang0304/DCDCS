import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const H5 = (props) => { // eslint-disable-line
  const { children } = props;

  return (
    <Text
      style={{
        fontSize: 48,
        fontWeight: 'bold',
      }}
    >
      { children }
    </Text>
  );
};

H5.propTypes = {
  children: PropTypes.any,
};

export default H5;