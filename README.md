# Museum

## Server

Get the [server](https://github.com/theminkantoso/museum.server)

## Install

- Java SDK: [https://www.oracle.com/java/technologies/javase-jdk15-downloads.html](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html)
- Node: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Android Studio: [https://developer.android.com/studio](https://developer.android.com/studio)

## Prepare

- Cài `react-native`
```
npm install -g react-native-cli
```

- Cài Android SDK cho Android Studio. Chạy Android Studio -> làm theo hướng dẫn

- Cài emulator bằng Genymotion. Download Genymotion -> configure -> tạo emulator mới có trong list

- Đảm bảo tất cả các lệnh sau đều cho ra kết quả, nếu không thì kiểm tra lại PATH.
```
java -version        # folder cài đặt java sdk
emulator -list-avds  # folder Android/Sdk/emulator
adb                  # folder Android/Sdk/platform-tools
react-native -h
```

## Run
Mở cmd trong folder Frontend-museum
- Cài các dependencies
```
npm install
```
- Chạy
```
npx react-native run-android
```
 
