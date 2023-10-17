# Capstone Project Information
## Name:
- Design and construction sun drying wet clothes system (DCDCS)
## Vietnamese:
- Thiết kế và thi công hệ thống phơi đồ tự động
## Supervisor:
- (Mr.) Nguyễn Đức Lợi - loind@fpt.edu.vn
## Team Members
- Hoang Phi Long - Leader
- Nguyen Dinh Phong
- Trinh Binh

## Summary
This repository is the Android application part of Capstone project.

## Technologies
### Android Application
- [React Native](RN_README.md) - Framework for building native apps
- Redux and Redux Saga - State management with asynchonous support
- NodeJS

## Installation
### Requirement
- NodeJS 10.0.3
- Yarn Package Manager 1.7.0
- Android SDK & AVD
- Git-scm

### Setup React Native
```
yarn global add create-react-native-app react-native-cli
```

### Build App
1. Cloning repository
```sh
git clone https://github.com/longhoang0304/DCDCS.git
```
2. Change directory to DCDCS folder
```sh
cd DCDCS
```
3. Install packages and dependencies
```sh
yarn install
```
4. Start AVD from command line
```sh
emulator -avd [your avd name]
```
5. Start React Native app
```sh
yarn run android
```