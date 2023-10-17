import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

const LoadingDialog = (props) => {
  const { isShow, children } = props;

  return (
    <PopupDialog
      ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      show={isShow}
      width={0.65}
      height={100}
      dismissOnTouchOutside={false}
    >
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#4298f4" />
        {children}
      </View>
    </PopupDialog>
  );
};

LoadingDialog.propTypes = {
  isShow: PropTypes.bool,
  children: PropTypes.any,
};


export default LoadingDialog;