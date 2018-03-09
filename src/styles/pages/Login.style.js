import {StyleSheet} from 'react-native';
import {fixedFontSize, GlobalStyles, HAIR_LINE} from '../../constants/style';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1
    },
    logo: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 50,
    },
    
    text_box: {
        flexDirection: 'row',
        borderBottomWidth: HAIR_LINE,
        borderColor: "#dddddd",
        marginHorizontal: 20
    },
    text_box_text: {
        fontSize: fixedFontSize(15),
        color: '#bc9956',
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
        color: 'red'
    },
    pic_code: {
        height: 40,
        width: 120,
    },
    text_box_gap_top: {
        marginTop: 13
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
        marginTop: 30,
        marginBottom: 10
    },
    optRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
});