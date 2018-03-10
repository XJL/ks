/**
 * Created by zhuman on 16/9/22.
 */
import {StyleSheet} from 'react-native';
import {fixedFontSize, HAIR_LINE, SCREEN_WIDTH} from '../../constants/style';

export var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        overflow: "hidden",
    },
    header_bg: {
        width: SCREEN_WIDTH,
    },
    header_logo: {
        alignSelf: 'center',
    },
    header_name: {
        alignSelf: 'center',
        fontFamily: "PingFangSC-Regular",
        fontSize: fixedFontSize(14),
        color: "#f5f5f5"
    },
    header_item_row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    header_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_item_text: {
        fontFamily: "PingFangSC-Light",
        fontSize: fixedFontSize(17),
        color: "#f5f5f5",
    },
    header_item_title: {
        fontFamily: "PingFangSC-Light",
        fontSize: fixedFontSize(13),
        color: "#f5f5f5"
    },

    main_info_title_row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    main_info_title_line: {
        width: 20,
        height: HAIR_LINE,
        backgroundColor: "#333333"
    },
    main_info_title_text: {
        fontSize: fixedFontSize(16),
        color: "#333333",
        marginHorizontal: 12,
        fontFamily: "PingFangSC-Light",
    },
    main_info_list: {
        paddingHorizontal: 30,
        flex: 1
    },
    main_info_row: {
        borderBottomWidth: HAIR_LINE,
        borderColor: '#dddddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    main_info_row_title: {
        fontSize: fixedFontSize(14),
        color: "#666666",
    },
    main_info_row_value: {
        fontSize: fixedFontSize(14),
        color: "#dddddd",
    },

    logout_btn: {
        backgroundColor: "#f5f5f5",
        alignItems: 'center',
        paddingVertical: 15
    },
    logout_btn_text: {
        fontSize: fixedFontSize(16),
        color: "#999999",
    },
});