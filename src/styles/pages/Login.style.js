import {StyleSheet} from 'react-native';
import {fixedFontSize, GlobalStyles} from '../../constants/style';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1
    },
    logo: {
        marginTop: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 50
    },
    textBox: {
        marginTop: 13,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 0,
    },
    inputStyle: {
        marginHorizontal: 10,
        fontSize: fixedFontSize(15),
        color: '#bc9956',
    },
    countDown: {
        width: 120,
    },
    countDownDisable: {
        width: 120,
    },
    errorText: {
        ...GlobalStyles.errorText,
        marginTop: 18,
        marginBottom: 5,
        fontSize: fixedFontSize(11),
    },
    loginButton: {
        backgroundColor: '#bc9956',
        marginHorizontal: 10,
        marginVertical: 5
    },
});