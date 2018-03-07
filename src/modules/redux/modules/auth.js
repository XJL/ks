/**
 * 用户行为信息管理模块
 */
import { createAction, handleActions } from 'redux-actions';
import DeviceInfo from 'react-native-device-info';

import * as Request from '../../../modules/network/request';
import {appVersion} from '../../../constants/def';

const initialState = {};

const ActonKey = {
    LOGIN: "/login",
    CLEAR_CODE: "/clear_code",
    SEND_CODE: "/sendCode",
    REGISTER: "/register",
    LOGOUT: "/logout",
};

export default handleActions({
    [ActonKey.LOGIN]: (state, action) => ({
        ...state,
        ...action
    }),
    [ActonKey.LOGOUT]: (state, action) => ({
        ...state,
        ...action
    }),
    [ActonKey.CLEAR_CODE]: (state, action) => ({
        ...state,
        ...action
    }),
    [ActonKey.SEND_CODE]: (state, action) => ({
        ...state,
        ...action
    }),
    [ActonKey.REGISTER]: (state, action) => ({
        ...state,
        ...action
    }),
}, initialState);

export const Action = {
    loginAction: createAction(ActonKey.LOGIN),
    logoutAction: createAction(ActonKey.LOGOUT),
    clearCodeAction: createAction(ActonKey.CLEAR_CODE),
    sendCodeAction: createAction(ActonKey.SEND_CODE),
    registerAction: createAction(ActonKey.REGISTER),
};

// 登陆
export function login(data) {
    return async function (dispatch, getState) {
        try {
            const code = getState().auth.codeContent;
            let requestData = data;
            if(code) {
                requestData.token = code.token;
            }
            else {
                throw new Error("请先获取验证码");
            }
            // 登陆
            const rsp = await Request.apiPost(Request.URLs.login, requestData);
            dispatch(Action.loginAction({userInfo: rsp.returnMap}));
            dispatch(Action.clearCodeAction({codeContent: null}));
        }
        catch (error) {
            throw error;
        }
    }
}
// 退出登陆
export function logout() {
    return async function (dispatch, getState) {
        try {
            await Request.apiPost(Request.URLs.logout);
            dispatch(Action.logoutAction({userInfo: null}));
        }
        catch (error) {
            throw error;
        }
    }
}

// 获取验证码
export function sendCode() {
    return async function (dispatch, getState) {
        try {
            const rsp = await Request.apiPost(Request.URLs.sendCode);
            dispatch(Action.sendCodeAction({codeContent: rsp.content}));
        }
        catch (error) {
            throw error;
        }
    }
}

// 注册
export function register(data) {
    return async function (dispatch, getState) {
        try {
            const code = getState().auth.codeContent;
            let requestData = data;
            if(code) {
                requestData.token = code.token;
            }
            else {
                throw new Error("请先获取验证码");
            }
            await Request.apiPost(Request.URLs.register, requestData);
            dispatch(Action.clearCodeAction({codeContent: null}));
        }
        catch (error) {
            throw error;
        }
    }
}

// 上报通讯录
// export function uploadContact(data) {
//     return async function (dispatch, getState) {
//         try {
//             const code = getState().auth.codeContent;
//             let requestData = data;
//             if(code) {
//                 requestData.token = code.token;
//             }
//             else {
//                 throw new Error("请先获取短信验证码");
//             }
//             await Request.apiPost(Request.URLs.register, requestData);
//             dispatch(Action.clearCodeAction({codeContent: null}));
//         }
//         catch (error) {
//             throw error;
//         }
//     }
// }


