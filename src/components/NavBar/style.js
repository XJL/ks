import {StyleSheet} from 'react-native';
import {fixedFontSize} from '../../constants/style';

export const styles = StyleSheet.create({
    navbar: {
        height: 44,
        backgroundColor: "#19191f"
    },
    title: {
        color: '#ffffff',
        fontSize: fixedFontSize(18),
        fontFamily: "PingFangSC-Light",
    },
    btn_text: {
        width: 50,
        alignItems: 'center',
    }
});