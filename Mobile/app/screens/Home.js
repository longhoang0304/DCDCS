import moment from 'moment';
import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Text } from 'react-native-elements';
import _ from 'lodash';

import { H1, H6, WhiteText } from '../components/Text';
import WeatherImage from '../components/Common/WeatherImage';
import WallpaperBackground from '../components/Common/WallpaperBackground';
import DryerSettingDialog from '../components/Common/DryerSettingDialog';
import LoadingDialog from '../components/Common/LoadingDialog';
import ProductSelectDialog from '../components/Common/ProductSelectDialog';
import * as RequestAction from '../constants/RequestActions';
import * as SystemState from '../constants/SystemState';
// import styles from './styles';

const DCButtonName = ['Dry clothes', 'Collect clothes', 'Resume', 'Pause', 'Dry clothes'];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY'),
      time: moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss'),
      showDryerSettingDialog: false,
      showProductDialog: false,
      dcState: 2,
      dryerState: 2,
      dryerMinute: 5,
    };
    this.getDataId = null;
    this.requestDataId = null;
    this.timeId = null;
  }

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
    this.timeId = setInterval(this.updateTime.bind(this), 1000);
  }

  componentDidUpdate() {
    const {
      updateSelection,
      productList,
      selected,
      getData,
      publishAction,
      sysState,
    } = this.props;
    const {
      dcState,
      dryerState,
    } = this.state;
    const _dcState = SystemState.getDCMotorState(sysState); // eslint-disable-line
    const _dryerState = SystemState.getDryerState(sysState); // eslint-disable-line

    if (dcState !== _dcState) {
      this.setState({ dcState: _dcState });
    }
    if (dryerState !== _dryerState) {
      this.setState({ dryerState: _dryerState });
    }
    if (selected < 0 && productList.length !== 0) {
      const payload = {
        action: RequestAction.REQUEST_DATA,
      };
      updateSelection(0);
      this.getDataId = setInterval(getData, 500);
      this.requestDataId = setInterval(() => publishAction(payload), 1000);
    }
    this.mounted = true;
  }

  clearInterval = () => {
    const { getDataId, requestDataId, timeId } = this;
    clearInterval(getDataId);
    clearInterval(requestDataId);
    clearInterval(timeId);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  static determineDCAction = (sysState) => {
    if (sysState === SystemState.DRYING) return RequestAction.COLLECT_CLOTHES;
    if (sysState === SystemState.IDLING) return RequestAction.DRY_CLOTHES;
    if (sysState === SystemState.MOVING) return RequestAction.PAUSE_MOTOR;
    if (sysState === SystemState.PAUSED) return RequestAction.RESUME_MOTOR;
    return null;
  }

  static determineDryerAction = (sysState) => {
    if (sysState === SystemState.IDLING) return RequestAction.START_DRYER_MOBILE;
    if (sysState === SystemState.DRYER_STARTED) return RequestAction.STOP_DRYER;
    return null;
  }

  handleDC = (dcState) => {
    const { publishAction, sysState } = this.props;
    const action = Home.determineDCAction(sysState);
    const payload = {
      action,
    };
    if (action) publishAction(payload, 1); // eslint-disable-line
    this.setState({ dcState });
  }

  handleDryer = (timer) => {
    const { publishAction, sysState } = this.props;
    const { dryerState } = this.state;
    const action = Home.determineDryerAction(sysState);
    const payload = {
      action,
      timer,
    };
    if (action) publishAction(payload, 1); // eslint-disable-line
    this.setState({ dryerState: !dryerState });
    this.toggleDryerSettingDialog();
  }

  alertDCControl() {
    const { dcState } = this.state;
    Alert.alert(
      'CONFIRM',
      `Do you want to ${DCButtonName[dcState]}?`,
      [
        {
          text: 'Yes, do it',
          onPress: () => this.handleDC(!dcState),
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  toggleDryerSettingDialog = () => {
    const { showDryerSettingDialog } = this.state;
    this.setState({ showDryerSettingDialog: !showDryerSettingDialog });
  }

  toggleProductDialog = () => {
    const { showProductDialog } = this.state;
    this.setState({ showProductDialog: !showProductDialog });
  }

  handleSelection = (index) => {
    const { updateSelection } = this.props;
    updateSelection(index);
    this.toggleProductDialog();
  }

  static genGreeting() {
    const hour = moment().tz('Asia/Ho_Chi_Minh').hour();
    const greetngs = [
      'Good morning',
      'Have a great day',
      'Good afternoon',
      'Good evening',
      'Good night',
    ];
    if (hour >= 4 && hour <= 8) return greetngs[0];
    if (hour >= 9 && hour <= 12) return greetngs[1];
    if (hour >= 13 && hour <= 17) return greetngs[2];
    if (hour >= 18 && hour <= 20) return greetngs[3];
    return greetngs[4];
  }

  updateTime() {
    const { mounted } = this;
    if (!mounted) return;
    this.setState({
      date: moment().tz('Asia/Ho_Chi_Minh').format('ddd, DD MMM YYYY'),
      time: moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss'),
    });
  }

  render() {
    const {
      date,
      time,
      dcState,
      dryerState,
      dryerMinute,
      showProductDialog,
      showDryerSettingDialog,
    } = this.state;
    const {
      info,
      isRain,
      isCloud,
      // humidity,
      sysState,
      selected,
      failedRate,
      dryingTime,
      navigation,
      productList,
      temperature,
      isLoadingUser,
      isLoadingProduct,
      isPublishingAction,
    } = this.props;
    const isLoading = isLoadingProduct || isLoadingUser || isPublishingAction;

    return (
      <WallpaperBackground>
        <LoadingDialog isShow={isLoading} >
          <Text style={{ fontSize: 16 }}>Gathering information</Text>
        </LoadingDialog>
        <ProductSelectDialog
          isShow={showProductDialog}
          selected={selected}
          productList={productList}
          onPress={this.handleSelection}
          toggleDialog={this.toggleProductDialog}
        />
        <DryerSettingDialog
          state={dryerState}
          minute={dryerMinute}
          isShow={showDryerSettingDialog}
          onChange={_minute => this.setState({ dryerMinute: _minute })}
          toggleDialog={this.toggleDryerSettingDialog}
          handleDryer={(timer) => this.handleDryer(timer)}
        />
        {/* =============== END POPUP DIALOG ================= */}
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <View style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingLeft: 15,
              paddingTop: 15,
              paddingRight: 15,
              flexDirection: 'row',
            }}
          >
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <H1><WhiteText>{_.isNumber(temperature) ? `${temperature}°` : 'N/A'}</WhiteText></H1>
              <H6><WhiteText>{failedRate < 11 ? SystemState.getStateName(sysState) : 'OFFLINE'}</WhiteText></H6>
              {sysState === SystemState.DRYER_STARTED ?
                <WhiteText style={{ fontSize: 24, fontWeight: 'bold' }}>
                Drying Time: {dryingTime}m
              </WhiteText>
              : null}
              <WhiteText style={{ fontSize: 24, fontWeight: 'bold' }}>
                {productList[selected] && productList[selected].name}
              </WhiteText>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}
            >
              <WeatherImage isRain={isRain} isCloud={isCloud}/>
              <WhiteText style={{ fontSize: 18 }}>{date}</WhiteText>
              <WhiteText style={{ fontSize: 24, fontWeight: 'bold' }}>{time}</WhiteText>
            </View>
          </View>
          <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              paddingBottom: 15,
            }}>
              <Button
                buttonStyle={{
                  backgroundColor: 'rgba(0, 242, 255, 0.6)',
                  marginHorizontal: 0,
                  marginVertical: 0,
                  marginBottom: 15,
                }}
                disabled={dcState === 4}
                disabledStyle={{
                  backgroundColor: 'rgba(180, 180, 180, 0.3)',
                }}
                rounded={true}
                title={`${DCButtonName[dcState]}`}
                onPress={() => this.alertDCControl()}
              />
              <Button
                buttonStyle={{
                  backgroundColor: 'rgba(0, 255, 187, 0.6)',
                  marginHorizontal: 0,
                  marginVertical: 0,
                  marginBottom: 15,
                }}
                disabled={dryerState === 2}
                disabledStyle={{
                  backgroundColor: 'rgba(180, 180, 180, 0.3)',
                }}
                rounded={true}
                title='Dryer setting'
                onPress={() => this.toggleDryerSettingDialog()}
              />
              <Button
                buttonStyle={{
                  backgroundColor: 'rgba(194, 96, 255, 0.6)',
                  marginHorizontal: 0,
                  marginVertical: 0,
                }}
                rounded={true}
                title='Change device'
                onPress={() => this.toggleProductDialog()}
              />
            </View>
            <View
              style={{
                flex: 1,
                paddingBottom: 15,
                paddingRight: 15,
              }}
            >
              <View style={{
                flexGrow: 2,
              }}/>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={() => navigation.navigate('UserInfo')}
              >
                <WhiteText style={{
                  fontSize: 18,
                }}>
                  {`${Home.genGreeting()},`}
                </WhiteText>
                <H6>
                  <WhiteText>{info.fullName}</WhiteText>
                </H6>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </WallpaperBackground>
    );
  }
}

export default Home;