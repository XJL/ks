import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {GlobalColors, fixedFontSize, HAIR_LINE, SCREEN_WIDTH} from '../../constants/style';

const btnThemeColor = GlobalColors.theme;
const btnDisableColor = '#cccccc';

class BaseButton extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // 外边框样式
        style: PropTypes.any,
        // 没有边框按钮的文字自定义样式
        textStyle: PropTypes.any,
        // 主按钮是否可点
        enable: PropTypes.bool,
        // 次按钮是否可点
        secondEnable: PropTypes.bool,
        // 只有一个按钮时的按钮文案
        text: PropTypes.string,
        // 有两个按钮时,主按钮文案
        mainText: PropTypes.string,
        // 有两个按钮时,副按钮文案
        secondText: PropTypes.string,
        // 有两个按钮时,按钮是否均分
        isEqual: PropTypes.bool,
        // 只有一个按钮,但有插入文案
        subText: PropTypes.string,
    };

    static defaultProps = {
        enable: true,
        secondEnable: true,
        isEqual: false,
    };

    onBaseBtnPress() {
        if (!this.props.enable) return;

        this.props.onPress && this.props.onPress();
    }

    onBaseSecondBtnPress() {
        if (!this.props.secondEnable) return;

        this.props.onSecondBtnPress && this.props.onSecondBtnPress();
    }
}

/**
 * 带边框,只有一个按钮
 */
class FrameButton extends BaseButton {
    render() {
        const {style, enable, text} = this.props;

        return(
            <View style={[styles.frameContainer, style]}>
                <TouchableOpacity
                    style={[styles.frameBtn, !enable && styles.disableBtn]}
                    activeOpacity={1}
                    onPress={()=>this.onBaseBtnPress()}
                >
                    <Text style={styles.btnTextWhite}>{text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

/**
 * 带边框,带主次按钮,主次按钮都可设置是否可点击,
 * isEqual为true时,主次按钮一样宽
 */
class FrameMainButton extends BaseButton {
    render() {
        const {style, enable, secondEnable, mainText, secondText, isEqual} = this.props;

        return(
            <View style={[styles.frameMainContainer, style]}>
                <TouchableOpacity
                    style={[styles.frameSecondBtn, isEqual && styles.equalBtn, !secondEnable && styles.disableSecondBtn]}
                    activeOpacity={1}
                    onPress={()=>this.onBaseSecondBtnPress()}
                >
                    <Text style={[styles.btnTextTheme, !secondEnable && styles.disableBtnText]}>{secondText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.frameMainBtn, isEqual && styles.equalBtn, !enable && styles.disableBtn]}
                    activeOpacity={1}
                    onPress={()=>this.onBaseBtnPress()}
                >
                    <Text style={styles.btnTextWhite}>{mainText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

/**
 * 带边框,带文字和按钮
 */
class FrameTextButton extends BaseButton {
    render() {
        const {style, enable, text, subText} = this.props;

        return(
            <View style={[styles.frameMainContainer, style]}>
                <Text style={styles.subText}>{subText}</Text>
                <TouchableOpacity
                    style={[styles.frameSubBtn, !enable && styles.disableBtn]}
                    activeOpacity={1}
                    onPress={()=>this.onBaseBtnPress()}
                >
                    <Text style={styles.btnTextWhite}>{text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

/**
 * 普通按钮,没有边框,可通过style改变按钮大小
 */
class NormalButton extends BaseButton {
    render() {
        const {style, enable, text, textStyle, activeOpacity} = this.props;

        return(
            <TouchableOpacity
                style={[styles.normalBtn, style, !enable && styles.disableBtn]}
                activeOpacity={activeOpacity || 1}
                onPress={()=>this.onBaseBtnPress()}
            >
                <Text style={[styles.btnTextWhite, textStyle]}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

/**
 * 白底按钮,没有边框,可设置大小底色等
 */
class TransparentButton extends BaseButton {
    render() {
        const {style, enable, text, textStyle} = this.props;

        return(
            <TouchableOpacity
                style={[styles.transparentBtn, style, !enable && styles.disableSecondBtn]}
                activeOpacity={1}
                onPress={()=>this.onBaseBtnPress()}
            >
                <Text style={[styles.btnTextTheme, textStyle, !enable && styles.disableBtnText]}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

export {
    FrameButton,
    FrameMainButton,
    FrameTextButton,
    NormalButton,
    TransparentButton,
}

const styles = StyleSheet.create({
    frameContainer: {
        height: 64,
        backgroundColor: 'white',
        paddingHorizontal: 12,
        justifyContent: 'center',
        borderTopWidth: HAIR_LINE,
        borderColor: GlobalColors.spLineColor1,
    },
    frameBtn: {
        height: 44,
        backgroundColor: btnThemeColor,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    frameMainContainer: {
        height: 64,
        backgroundColor: 'white',
        paddingHorizontal: 12,
        borderTopWidth: HAIR_LINE,
        borderColor: GlobalColors.spLineColor1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    frameSecondBtn: {
        height: 44,
        width: SCREEN_WIDTH * 0.3,
        borderRadius: 2,
        borderWidth: HAIR_LINE,
        borderColor: btnThemeColor,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    frameMainBtn: {
        height: 44,
        width: SCREEN_WIDTH * 0.6,
        borderRadius: 2,
        backgroundColor: btnThemeColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    equalBtn: {
        width: SCREEN_WIDTH * 0.45,
    },
    subText: {
        fontSize: fixedFontSize(15),
        color: '#666666',
        width: SCREEN_WIDTH * 0.6,
        textAlign: 'right',
    },
    frameSubBtn: {
        height: 44,
        width: SCREEN_WIDTH * 0.3,
        borderRadius: 2,
        backgroundColor: btnThemeColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    normalBtn: {
        height: 44,
        borderRadius: 2,
        backgroundColor: btnThemeColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    transparentBtn: {
        height: 44,
        borderRadius: 2,
        borderWidth: HAIR_LINE,
        borderColor: btnThemeColor,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disableSecondBtn: {
        borderColor: btnDisableColor,
    },
    disableBtn: {
        backgroundColor: btnDisableColor,
    },
    btnTextWhite: {
        fontSize: fixedFontSize(16),
        color: 'white',
    },
    btnTextTheme: {
        fontSize: fixedFontSize(16),
        color: btnThemeColor,
    },
    disableBtnText: {
        fontSize: fixedFontSize(16),
        color: btnDisableColor,
    }
});