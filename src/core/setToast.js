import { ToastAndroid } from 'react-native'

export default function setToast(message) {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
}