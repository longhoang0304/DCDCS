import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Text } from 'react-native-elements';
import styles from './styles';
import WallpaperBackground from '../components/Common/WallpaperBackground';
import { WhiteText, H4 } from '../components/Text';
import LoadingDialog from '../components/Common/LoadingDialog';


class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: 'crabbycrab',
      password: '1234567',
    };
  }

  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }

  componentDidUpdate() {
    const { isLogin, navigation } = this.props;
    if (isLogin) navigation.navigate('HomeStack');
  }

  login() {
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  }

  render() {
    const { navigation, isLoading, errorMsg } = this.props;
    const { username, password } = this.state; // eslint-disable-line

    return (
      <WallpaperBackground>
        <LoadingDialog isShow={isLoading} >
          <Text style={{ fontSize: 16 }}>Logging in</Text>
        </LoadingDialog>
        <View style={[styles.fullscreen, styles.flexBox]}>
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            <H4>
              <WhiteText>LOG IN</WhiteText>
            </H4>
            </Text>
          </View>
          <View style={{
            width: '90%',
          }}>
            <FormLabel>
              <WhiteText>Username</WhiteText>
            </FormLabel>
            <FormInput
              inputStyle={{
                color: '#fff',
                paddingLeft: 5,
              }}
              value={username}
              placeholder='Please enter your username'
              placeholderTextColor='#ddd'
              onChangeText={value => this.handleChange('username', value)}
              underlineColorAndroid='#fff'
            />
            <FormLabel>
              <WhiteText>Password</WhiteText>
            </FormLabel>
            <FormInput
              inputStyle={{
                color: '#fff',
                paddingLeft: 5,
              }}
              secureTextEntry={true}
              value={password}
              placeholder='Please enter your password'
              placeholderTextColor='#ddd'
              onChangeText={value => this.handleChange('password', value)}
              underlineColorAndroid='#fff'
            />
            {errorMsg ? <FormValidationMessage>{errorMsg}</FormValidationMessage> : null}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'stretch',
              marginTop: 15,
              width: '90%',
            }}
          >
            <Button
              rounded
              backgroundColor='rgba(255, 255, 255, 0.2)'
              onPress={() => this.login()}
              title='LOGIN'
            />
            <Button
              textStyle={{
                textDecorationLine: 'underline',
              }}
              rounded
              backgroundColor='rgba(0, 0, 0, 0)'
              onPress={() => navigation.navigate('Help')}
              title='Need a help?'
            />
          </View>
        </View>
      </WallpaperBackground>
    );
  }
}

export default Login;