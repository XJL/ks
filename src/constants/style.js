import {Platform, PixelRatio, Dimensions} from 'react-native';

const isAndroid = Platform.OS === 'android';

// 屏幕宽度
export const SCREEN_WIDTH = Dimensions.get('window').width;
// 屏幕高度
export const SCREEN_HEIGHT = Dimensions.get('window').height;
// 1px像素线
export const HAIR_LINE = 1 / PixelRatio.get();
// 像素比例
export const PIXEL_RATIO = PixelRatio.get();

export const GlobalColors = {
    theme: '#ccac55',
    bgColor: '#f2f2f2',// 页面底色
    errorColor: '#e02800',// 错误提示颜色值
    titleColor: '#333333',// 标题颜色
    spLineColor1: '#ececec',// 分割线颜色
    spLineColor2: '#e4e4e4',
    placeholderColor: '#999999',
    navThemeBgColor: '#1d1e28',// 导航栏主题色
    navThemeTextColor: '#daaf4e',// 导航栏文字主题色
    navBlackTextColor: '#4a4a4a',// 导航栏黑色字
};

export const GlobalStyles = {
    /**
     * 导航栏左边返回按钮样式
     */
    navBackBtn: {
        backButton: {
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 12,
        },
        backImage: {
            width: 16,
            height: 16,
        },
    },

    /**
     * 导航栏右边按钮样式
     */
    navRightBtn: {
        rightButton: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        rightButtonText: {
            fontSize: fixedFontSize(16),
            color: GlobalColors.navThemeTextColor,
            textAlign: 'center'
        },
    },

    /**
     * 透明导航栏,绝对定位,用于变换导航栏主题的界面
     */
    navTransparentBg: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },

    /**
     * 错误提示语样式
     */
    errorText: {
        fontSize: fixedFontSize(14),
        color: GlobalColors.errorColor,
        textAlign: 'center'
    },

    /**
     * 产品特色标签,如D+1,多重保障,多资产等
     */
    tag : {
        featuredTag: {
            height: 20,
            borderWidth: HAIR_LINE,
            borderColor: '#94c8e2',
            borderRadius: 2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 7,
        },
        featuredTagText: {
            fontSize: fixedFontSize(11),
            color: '#94c8e2',
            letterSpacing: -0.5
        }
    },

    /**
     * 产品类型标签,如新手标,月月鑫等
     */
    productTag: {
        productTagImg: {
            width: 60,
            height: 20,
            paddingRight: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        productTagText: {
            fontSize: fixedFontSize(11),
            color: 'white',
            backgroundColor: 'transparent'
        },
    },

    /**
     * Button组件的样式,后续要删除,新做的界面不可使用这个样式
     */
    buttonStyle: {
        button: {
            backgroundColor: '#bc9956',
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5
        },
        outlineButton: {
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1
        },
        buttonDisable: {
            backgroundColor: '#d3d3d3',
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5
        },
    }
};

/**
 * 防止字体根据手机系统设置的字体而变大缩小
 */
export function fixedFontSize(fontSize) {
    if(Platform.OS === 'android') {
        return fontSize / PixelRatio.getFontScale();
    }else {
        // 适配iPhone5, 4, iPad
        if (PIXEL_RATIO === 2 && SCREEN_WIDTH < 360) {
            return fontSize * 0.8;
        }else {
            return fontSize;
        }
    }
}