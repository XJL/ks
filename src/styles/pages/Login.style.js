import {StyleSheet} from 'react-native';
import {fixedFontSize, GlobalStyles, HAIR_LINE} from '../../constants/style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 1
    },
    logo: {
        marginTop: '10.7%',
        marginBottom: '9.7%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    
    text_box: {
        flexDirection: 'row',
        borderBottomWidth: HAIR_LINE,
        borderColor: "#dddddd",
        marginHorizontal: 20
    },
    text_box_text: {
        fontSize: fixedFontSize(16),
        fontFamily: "PingFangSC-Light",
        color: '#666666',
        padding: 0,
        paddingRight: 10,
        height: 40,
        alignItems: 'center',
        flex: 1,
    },
    text_box_controller: {
        height: 40,
        justifyContent: 'center',
    },
    text_box_controller_text: {
        fontSize: fixedFontSize(14),
        color: '#c93900',
        fontFamily: "PingFangSC-Light",
    },
    pic_code: {
        height: 40,
        width: 120,
    },
    text_box_gap_top: {
        marginTop: "4.5%"
    },

    errorText: {
        ...GlobalStyles.errorText,
        marginTop: 18,
        marginBottom: 5,
        fontSize: fixedFontSize(11),
    },

    login_btn: {
        marginTop: '6.2%',
        marginBottom: '3.1%',
        marginHorizontal: 20,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#c93900",
        justifyContent: 'center',
        alignItems: 'center'
    },
    login_btn_disabled: {
        borderRadius: 22,
        backgroundColor: "rgba(201, 57, 0, 0.4)"
    },
    login_button_text: {
        fontFamily: "PingFangSC-Regular",
        fontSize: fixedFontSize(18),
        color: "#ffffff",
    },

    optRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    opt_row_text: {
        fontFamily: "PingFangSC-Light",
        fontSize: fixedFontSize(13),
        color: "#666666"
    }
});