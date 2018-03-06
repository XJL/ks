/**
 * Created by jian on 17-10-26.
 */
import { BackHandler, Platform } from 'react-native';

// 当前绑定的返回事件
let currentBackFunc;
// 当前绑定的导航器
let navigator;

/**
 * 绑定默认事件
 */
const bindDefaultBack = function () {
    if (Platform.OS === 'android') {
        if(currentBackFunc) {
            BackHandler.removeEventListener('hardwareBackPress', currentBackFunc);
        }
        BackHandler.addEventListener('hardwareBackPress', onDefaultBack);
        currentBackFunc = onDefaultBack;
    }
};


/**
 * 默认物理返回事件
 * @returns {boolean}
 */
const onDefaultBack = function () {
    const nav = navigator;

    if(nav) {
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            // 在webview页面让这个返回键监听失效
            if (routers[routers.length - 1].location.indexOf('webview') > -1) {
                return true;
            }
            // 闪屏页后退键不操作
            if(routers[routers.length - 1].location.indexOf('splashScreen') > -1) {
                return true;
            }
            else {
                nav.pop();
                return true;
            }
        }
        return true;
    }
    return false;
};

/**
 * 绑定一个自定义的返回事件
 * @param func
 */
const onHandleBack = function (func) {
    if(typeof func == 'function') {
        try {
            if(currentBackFunc) {
                BackHandler.removeEventListener('hardwareBackPress', currentBackFunc);
            }
            BackHandler.addEventListener('hardwareBackPress', func);
            currentBackFunc = func;
        }
        catch (error) {
            if(__DEV__) {
                console.log('on handler back error', error.message);
            }
        }
    }
};

/**
 * 初始化模块
 * @param options
 */
const init = function (options) {
    if(options.navigator) navigator = options.navigator;
    bindDefaultBack();
};

/**
 * android推出应用
 */
const exit = function () {
    BackHandler.exitApp();
};

const BackManager = {
    init,
    bindDefaultBack,
    onHandleBack,
    exit
};

export default BackManager;