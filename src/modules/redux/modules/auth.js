import { createAction, handleActions } from 'redux-actions';
import DeviceInfo from 'react-native-device-info';

import * as Request from '../../../modules/network/request';
import {appVersion} from '../../../constants/def';

const initialState = null;

const ActonKey = {
    LOGIN: "/login",
}

export default handleActions({
    [ActonKey.LOGIN]: (state, action) => ({
        ...state,
        ...action
    })
}, initialState);

export const Action = {
    loginAction: createAction(ActonKey.LOGIN),
};

export function login(data) {
    return async function (dispatch, getState) {
        setTimeout(()=>console.warn("login"), 1000);
    }
}

export function sendCode() {
    return async function (dispatch, getState) {
        console.warn("sendCode");
    }
}