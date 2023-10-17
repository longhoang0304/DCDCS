import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const H2 = (props) => { // eslint-disable-line
  const { children } = props;

  return (
    <Text
      style={{
        fontSize: 68,
        fontWeight: 'bold',
      }}
    >
      { children }
    </Text>
  );
};

H2.propTypes = {
  children: PropTypes.any,
};

export default H2;