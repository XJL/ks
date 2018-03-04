import {StyleSheet} from 'react-native';
import {fixedFontSize} from '../../constants/style';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderColor: '#dddddd',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingRight: 25,
        borderColor: '#dddddd',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },

    focus: {
        borderColor: '#caa855'
    },

    blur: {
        borderColor: '#dddddd'
    },

    icon: {
        height: 24,
    },

    headerView: {
        borderColor: '#dddddd',
        borderRightWidth: 1,
        paddingRight: 10,
        marginRight: 5,
        width: 90
    },

    header: {
        color: '#241c09',
        fontSize: fixedFontSize(13),
        textAlign: 'right'
    },

    input: {
        flex: 1,
        padding: 0,
        marginHorizontal: 5,
        alignSelf: 'center',
        height: 24,
        fontSize: fixedFontSize(13),
        color: '#333333',
    }
});