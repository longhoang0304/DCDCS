import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { Text, Slider } from 'react-native-elements';

const DryerSettingDialog = (props) => {
  const {
    minute, isShow, toggleDialog,
    handleDryer, onChange, state,
  } = props;

  return (
    <PopupDialog
      dialogTitle={<DialogTitle title='Dryer setting' />}
      show={isShow}
      width={0.85}
      height={250}
      dismissOnTouchOutside={false}
    >
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <View style={{
          flex: 1,
          flexGrow: 3,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <Text h3 style={{
            color: '#444',
          }}>{state ? 'Dryer' : 'Drying'} time: {minute}m</Text>
          {state ? null :
          <Slider
            value={minute}
            maximumValue={120}
            minimumValue={5}
            step={5}
            style={{
              width: '90%',
            }}
            onValueChange={onChange}
            trackStyle={{
              height: 5,
            }}
            thumbStyle={{
              backgroundColor: '#4298f4',
              borderRadius: 100,
              width: 25,
              height: 25,
            }}
            minimumTrackTintColor='#4298f4'
            // maximumTrackTintColor='blue'
          />
          }
          {state ? null :
            <Text style={{
              color: '#444',
            }}>Please set up the time you want to dry your clothes</Text>
          }
        </View>
        <View style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <TouchableOpacity
            onPress={() => handleDryer(minute)}
            style={{
              width: '50%',
              borderTopWidth: 1,
              borderRightWidth: 1,
              backgroundColor: '#F9F9FB',
              borderColor: '#DAD9DC',
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderBottomLeftRadius: 8,
            }}
          >
            <Text style={{
              textAlign: 'center',
              color: '#444',
              fontSize: 16,
            }}>
              {state ? 'Stop' : 'Start'} dryer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleDialog()}
            style={{
              width: '50%',
              borderTopWidth: 1,
              backgroundColor: '#F9F9FB',
              borderColor: '#DAD9DC',
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderBottomRightRadius: 8,
            }}
          >
            <Text style={{
              textAlign: 'center',
              color: '#444',
              fontSize: 16,
            }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </PopupDialog>
  );
};

DryerSettingDialog.propTypes = {
  isShow: PropTypes.bool,
  minute: PropTypes.number,
  state: PropTypes.number,
  toggleDialog: PropTypes.func,
  handleDryer: PropTypes.func,
  onChange: PropTypes.func,
};


export default DryerSettingDialog;