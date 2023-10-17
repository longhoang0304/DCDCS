import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';

const ListItem = (props) => {
  const {
    title, subTitle, key,
  } = props;
  return (
    <TouchableOpacity
      key={key}
    >
      <View>
        <Text>{subTitle}</Text>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  key: PropTypes.string.isRequired,
  onEdit: PropTypes.bool,
};

export default ListItem;