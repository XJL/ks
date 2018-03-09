/**
 * Created by zhuman on 16/9/22.
 */
import {StyleSheet} from 'react-native';
import {fixedFontSize, HAIR_LINE} from '../../constants/style';

export var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // header: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     paddingTop: 30,
    //     paddingBottom: 17,
    //     backgroundColor: '#ccac55',
    //     marginBottom: 11
    // },
    // headerItem: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-between'
    // },
    // headerItemValue: {
    //     fontFamily: 'Arial',
    //     fontSize: 27,
    //     color: '#ffffff',
    //     marginBottom: 20
    // },
    // headerItemName: {
    //     fontSize: fixedFontSize(14),
    //     color: '#ffffff'
    // },

    header: {
        backgroundColor: '#333333'
    },
    header_logo: {
        marginVertical: 20,
        alignSelf: 'center',
        height: 100,
        width: 100,
    },
    header_item_row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#555555',
    },
    header_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    header_item_text: {
        fontSize: fixedFontSize(16),
        color: "#ffffff",
    },
    header_item_text_gap: {
        marginTop: 10
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
        backgroundColor: 'black'
    },
    main_info_title_text: {
        fontSize: fixedFontSize(20),
        color: "black",
        marginHorizontal: 10
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
        height: 50,
        backgroundColor: '#dddddd',
        alignItems: 'center',
        paddingVertical: 15
    },
    logout_btn_text: {
        fontSize: fixedFontSize(16),
        color: "#999999",
    },


    // itemList: {
    //     flex: 1,
    //     backgroundColor: 'white',
    //     marginBottom: 11
    // },
    // itemRow: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 15,
    //     paddingVertical: 15,
    //     borderTopWidth: HAIR_LINE,
    //     borderColor: '#dddddd'
    // },
    // lastItemRow: {
    //     borderBottomWidth: HAIR_LINE,
    // },
    // itemRowContent: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    // },
    // itemRowContentName: {
    //     fontSize: fixedFontSize(15),
    //     color: '#303030',
    //     letterSpacing: -0.5
    // },
    // itemRowContentValue: {
    //     fontSize: fixedFontSize(12),
    //     color: '#a7a7a7',
    //     letterSpacing: -0.5
    // },
    // optRow: {
    //     justifyContent: 'center'
    // }
});