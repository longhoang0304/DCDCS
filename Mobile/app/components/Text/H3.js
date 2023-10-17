import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const H3 = (props) => { // eslint-disable-line
  const { children } = props;

  return (
    <Text
      style={{
        fontSize: 60,
        fontWeight: 'bold',
      }}
    >
      { children }
    </Text>
  );
};

H3.propTypes = {
  children: PropTypes.any,
};

export default H3;