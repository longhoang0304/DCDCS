import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flexBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  appTitle: {
    width: '100%',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  appTitleContainer: {
    width: '90%',
    height: '50%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '90%',
    marginTop: 10,
  },
  helpHeader: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  headerText: {
    width: '100%',
    // height: 200,
    textAlign: 'center',
    fontSize: 32,
    color: '#fff',
  },
  scrollViewBox: {
    width: '100%',
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
  helpImg: {
    height: 250,
  },
  inputGroup: {
    width: '90%',
  },
  inputBlock: {
    height: 50,
  },
  inputEle: {
    color: '#fff',
  },
  labelEle: {
    color: '#fff',
  },
  buttonLoginGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
  },
});

export default styles;