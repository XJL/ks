/**
 * 用户行为信息管理模块
 */
import { createAction, handleActions } from 'redux-actions';
import * as Request from '../../../modules/network/request';

const initialState = {};

const ActonKey = {
    LOGIN: "/login",
    CLEAR_CODE: "/clear_code",
    SEND_CODE: "/sendCode",
    REGISTER: "/register",
    LOGOUT: "/logout",
    UPLOAD: "/upload",
};

export default handleActions({
    [ActonKey.LOGIN]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ActonKey.LOGOUT]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ActonKey.CLEAR_CODE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ActonKey.SEND_CODE]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ActonKey.REGISTER]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ActonKey.UPLOAD]: (state, action) => ({
        ...state,
        ...action.payload
    }),
}, initialState);

export const Action = {
    loginAction: createAction(ActonKey.LOGIN),
    logoutAction: createAction(ActonKey.LOGOUT),
    clearCodeAction: createAction(ActonKey.CLEAR_CODE),
    sendCodeAction: createAction(ActonKey.SEND_CODE),
    registerAction: createAction(ActonKey.REGISTER),
    uploadAction: createAction(ActonKey.UPLOAD),
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
            dispatch(Action.loginAction({userInfo: rsp.content}));
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
            dispatch(Action.logoutAction({codeContent: null}));
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
        }
        catch (error) {
            throw error;
        }
    }
}

// 上报通讯录
export function uploadContact(data) {
    return async function (dispatch, getState) {
        try {
            let requestData = data;
            await Request.apiPost(Request.URLs.upload, requestData);
        }
        catch (error) {
            throw error;
        }
    }
}

// 重置密码
export function reset(data) {
    return async function (dispatch, getState) {
        try {
            let requestData = data;
            await Request.apiPost(Request.URLs.reset, requestData);
        }
        catch (error) {
            throw error;
        }
    }
}


