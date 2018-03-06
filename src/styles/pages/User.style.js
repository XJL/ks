/**
 * Created by zhuman on 16/9/22.
 */
import {StyleSheet} from 'react-native';
import {fixedFontSize, HAIR_LINE} from '../../constants/style';

export var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
        paddingBottom: 17,
        backgroundColor: '#ccac55',
        marginBottom: 11
    },
    headerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerItemValue: {
        fontFamily: 'Arial',
        fontSize: 27,
        color: '#ffffff',
        marginBottom: 20
    },
    headerItemName: {
        fontSize: fixedFontSize(14),
        color: '#ffffff'
    },

    itemList: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 11
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderTopWidth: HAIR_LINE,
        borderColor: '#dddddd'
    },
    lastItemRow: {
        borderBottomWidth: HAIR_LINE,
    },
    itemRowContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemRowContentName: {
        fontSize: fixedFontSize(15),
        color: '#303030',
        letterSpacing: -0.5
    },
    itemRowContentValue: {
        fontSize: fixedFontSize(12),
        color: '#a7a7a7',
        letterSpacing: -0.5
    },
    optRow: {
        justifyContent: 'center'
    }
});