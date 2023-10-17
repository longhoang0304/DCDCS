import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const H1 = (props) => { // eslint-disable-line
  const { children } = props;

  return (
    <Text
      style={{
        fontSize: 72,
        fontWeight: 'bold',
      }}
    >
      { children }
    </Text>
  );
};

H1.propTypes = {
  children: PropTypes.any,
};

export default H1;