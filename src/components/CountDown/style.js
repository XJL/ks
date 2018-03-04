import {StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/style';

export var styles = StyleSheet.create({
    container: {
        flex: 1
    },

    buttonDisable: {
        ...GlobalStyles.buttonStyle.buttonDisable,
        backgroundColor: '#cccccc',
    },

    buttonEnable: {
        ...GlobalStyles.buttonStyle.button,
        backgroundColor: '#ccac55',
    }
});