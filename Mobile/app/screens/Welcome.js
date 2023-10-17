import React, { PureComponent } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { WhiteText } from '../components/Text';
import WallpaperBackground from '../components/Common/WallpaperBackground';
import LoadingDialog from '../components/Common/LoadingDialog';
import styles from './styles';

class Welcome extends PureComponent {
  componentDidUpdate() {
    const { isLogin, healthCheck, navigation } = this.props;

    if (!healthCheck) {
      return;
    }
    if (healthCheck === 2) {
      Alert.alert(
        'Error',
        'Cannot connect to server',
        [
          {
            text: 'Try again',
            onPress: () => this.checkInternetConnection(),
          },
          {
            text: 'Cancel',
            onPress: () => null,
          },
        ],
      );
      return;
    }
    if (!isLogin || healthCheck === 3) {
      navigation.navigate('LoginScreen');
      return;
    }
    navigation.navigate('HomeStack');
  }

  checkInternetConnection() {
    const { connect } = this.props;
    connect();
  }

  render() {
    const titleStyle = [styles.appTitle];
    const { isLoading } = this.props;

    return (
      <WallpaperBackground>
        <LoadingDialog isShow={isLoading} >
          <Text style={{ fontSize: 16 }}>Connecting to server</Text>
        </LoadingDialog>
        <TouchableOpacity
          style={[styles.fullscreen, styles.flexBox]}
          onPress={() => this.checkInternetConnection()}
        >
          <WhiteText style={titleStyle}>
            DCDCS App
          </WhiteText>
          <WhiteText>
            Tap to continue
          </WhiteText>
        </TouchableOpacity>
      </WallpaperBackground>
    );
  }
}

export default Welcome;