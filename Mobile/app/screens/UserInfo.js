import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button, Text, Divider } from 'react-native-elements';
import styles from './styles';
import InfoItem from '../components/Common/InfoItem';
import { H6 } from '../components/Text';
import LoadingDialog from '../components/Common/LoadingDialog';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newInfo: {
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
      },
    };
  }

  static alertError(errorMsg) {
    Alert.alert(
      'Error',
      errorMsg,
      [
        {
          text: 'OK',
        },
      ],
    );
  }

  componentDidMount() {
    const { info } = this.props;
    this.setState({ newInfo: { ...info, password: '' } });
  }

  componentDidUpdate() {
    const {
      navigation, isLogin, errorMsg, clearError,
    } = this.props;
    if (!isLogin) {
      navigation.navigate('Welcome');
      return;
    }
    if (errorMsg) {
      UserInfo.alertError(errorMsg);
      clearError();
    }
  }

  handleTextChange = (key) => (value) => {
    const { newInfo } = this.state;
    const info = { ...newInfo };
    info[key] = value;
    this.setState({ newInfo: info });
  }

  validateUsername = (username) => {
    if (username.trim().length < 4) return 'Username must be at lease 4 characters';
    if (username.trim().length > 32) return 'Username cannot exceed 32 characters';
    if (!username.trim().match(/^[a-zA-Z0-9]{4,32}$/)) return 'Username can only contains a-zA-z0-9 characters';
    return '';
  }

  validatePassword = (password) => {
    if (!password.length) return '';
    if (password.length < 6) return 'Password must be atlease 6 characters';
    if (password.length > 32) return 'Password cannot exceed 32 characters';
    return '';
  }

  validateEmail = (email) => {
    if (!email.trim().match(/^[^\s@]+@([^\s@]{2,}\.){1,2}[^\s]{2,}$/)) {
      return 'Email is not valid. Example: abc@gmail.com';
    }
    return '';
  }

  validatePhone = (phone) => {
    if (!phone.trim().length) return 'Mobile phone cannot be empty';
    if (!phone.trim().match(/^\d{6,}$/)) {
      return 'Invalid phone number';
    }
    return '';
  }

  validateAddress = (address) => {
    if (!address.trim().length) return 'Address cannot be empty';
    if (!address.trim().match(/^[\d\w\p{L}\p{Nd}\s]+$/)) {
      return 'Invalid address';
    }
    return '';
  }

  validate = () => {
    const { newInfo } = this.state;
    const {
      username, password,
      email, phone, address,
    } = newInfo;
    let errorMsg = this.validateUsername(username);
    if (errorMsg) return errorMsg;

    errorMsg = this.validatePassword(password);
    if (errorMsg) return errorMsg;

    errorMsg = this.validateEmail(email);
    if (errorMsg) return errorMsg;

    errorMsg = this.validatePhone(phone);
    if (errorMsg) return errorMsg;

    errorMsg = this.validateAddress(address);
    if (errorMsg) return errorMsg;
    return '';
  }

  updateInfo = () => {
    const { updateInfo } = this.props;
    const { newInfo } = this.state;
    const error = this.validate();
    if (error) {
      UserInfo.alertError(error);
      return;
    }
    this.setState({ error: '' });
    updateInfo(newInfo);
  }

  render() {
    const { newInfo } = this.state;
    const { logout, isLoading } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.userInfoContainer}
      >
        <LoadingDialog isShow={isLoading} >
          <Text style={{ fontSize: 16 }}>Updating Information!</Text>
        </LoadingDialog>
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
          <Text style={{
            width: '100%',
            textAlign: 'center',
            color: '#333',
          }}>
            <H6>
              PROFILE
            </H6>
          </Text>
        </View>
        <View style={{
          flex: 1,
          flexGrow: 4,
          justifyContent: 'center',
          width: '90%',
        }}>
          <InfoItem
            label='Username:'
            value={newInfo.username}
            onChange={this.handleTextChange('username')}
          />
          <Divider />
          <InfoItem
            label='Password:'
            value={newInfo.password}
            onChange={this.handleTextChange('password')}
            isPassword={true}
          />
          <Divider />
          <InfoItem
            label='Name:'
            value={newInfo.fullName}
            onChange={this.handleTextChange('fullName')}
          />
          <Divider />
          <InfoItem
            label='Address:'
            value={newInfo.address}
            onChange={this.handleTextChange('address')}
            multiLine
          />
          <Divider />
          <InfoItem
            label='Phone:'
            value={newInfo.phone}
            onChange={this.handleTextChange('phone')}
          />
          <Divider />
          <InfoItem
            label='Email:'
            value={newInfo.email}
            onChange={this.handleTextChange('email')}
          />
          <Divider />
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Button
              rounded
              title='Save Changes'
              buttonStyle={{
                backgroundColor: '#006aff',
              }}
              textStyle={{
                color: '#fff',
              }}
              onPress={this.updateInfo}
            />
          </View>
          <View style={{
            flex: 1,
          }}>
            <Button
              rounded
              title='Logout'
              buttonStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: '#f44245',
                borderWidth: 1,
              }}
              textStyle={{
                color: '#f44245',
              }}
              onPress={logout}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default UserInfo;