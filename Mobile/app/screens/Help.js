import React from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';

const Help = () => {
  const titleStyle = [styles.headerText];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewBox}>
      <ImageBackground style={styles.helpImg} source={require('../assets/images/helpdesk.jpg')}>
        <View style={[styles.helpHeader, styles.flexBox]}>
            <Text h1 style={titleStyle}>
                INFORMATION
            </Text>
        </View>
      </ImageBackground>
      <View style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
        <Text>
            Thank you for choosing DCDCS. This is your mobile application to control your DCDCS system at home. Mobile application is complete free. Please make sure that you won't have to charge any money to download this application.
        </Text>
        <Text>
        </Text>
        <Text>
            If you can't login. Please check your bill and manual go along with your product for instruction.
        </Text>
        <Text>
        </Text>
        <Text>
          If you don't remember your password. Then please try the default password, which is your registered mobile phone number when brought the product.
        </Text>
        <Text>
        </Text>
        <Text>
          For more information, please contact us with:
        </Text>
        <Text>
        </Text>
        <Text>
          Phone: 01676000000
        </Text>
        <Text>
          Email: support@dcdcs.com
        </Text>
      </View>
    </ScrollView>
  );
};

export default Help;