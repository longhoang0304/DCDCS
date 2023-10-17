import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { ListItem, Icon } from 'react-native-elements';

const keyExtractor = (item, index) => String(index);

const ProductSelectDialog = (props) => {
  const {
    isShow,
    onPress,
    selected,
    productList,
    toggleDialog,
  } = props;

  return (
    <PopupDialog
      dialogTitle={<DialogTitle title='Product List' />}
      show={isShow}
      width={0.85}
      height={350}
      onDismissed={toggleDialog}
    >
      <FlatList
        data={productList}
        extraData={selected}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => onPress(index)}
            title={item.name}
            rightIcon={selected === index ? <Icon name='check' type='feather' color='#00c41d'/> : undefined}
          />
        )}
      />

    </PopupDialog>
  );
};

ProductSelectDialog.defaultProps = {
  productList: [],
};

ProductSelectDialog.propTypes = {
  isShow: PropTypes.bool,
  selected: PropTypes.number,
  onPress: PropTypes.func,
  toggleDialog: PropTypes.func,
  productList: PropTypes.array,
};


export default ProductSelectDialog;