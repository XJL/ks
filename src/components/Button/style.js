import {StyleSheet} from 'react-native';
import {fixedFontSize, GlobalStyles} from '../../constants/style';

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButton: {
        ...GlobalStyles.buttonStyle.button
    },

    outlineButton: {
        ...GlobalStyles.buttonStyle.outlineButton
    },

    buttonText: {
        color: '#fefeff',
        fontSize: fixedFontSize(13),
    },

    outlineText: {
        fontSize: fixedFontSize(13),
        color: 'gray'
    }
});