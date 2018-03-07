import URI from 'urijs';

import * as urls from '../../constants/urls';
import {NativeModules, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// const FileUpload = NativeModules.FileUpload;
const NetworkFailed = '加载失败，请检查网络状态！';

export const client = 'app';
export {appVersion as version} from '../../constants/def';
export const udid = DeviceInfo.getUniqueID();

export const URLs = urls;

export async function apiGet(urlKey, params = {}, format = 'JSON') {
    return await request(urlKey, 'GET', params, format);
}

export async function apiPost(urlKey, params = {}, format = 'FORM') {
    return await request(urlKey, 'POST', params, format);
}

// export async function fileUpload(urlKey, files, params = {}) {
//     const url = urls.host + urlKey;
//
//     const obj = {
//         uploadUrl: url,
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json; charset=utf-8',
//             'enctype': 'multipart/form-data'
//         },
//         fields: {
//             ...params,
//         },
//         files: files.map((el,index)=>{
//             return {
//                 name: 'files'+(index+1),
//                 filename:'file'+index+'.jpg',
//                 filepath: el,
//             }
//         }),
//         scale : 0,
//         compress : 0.5,
//     }
//
//     return await new Promise((resolve, reject)=> {
//         FileUpload.upload(obj, function (err, result) {
//             const r = result ? JSON.parse(result.data) : {};
//             if (err || r.message) {
//                 const error = new Error(r.message);
//                 error.code = r.code;
//                 reject(error)
//             }
//             else {
//                 resolve(r);
//             }
//         })
//     })
// }

async function request(urlKey, method, params = {}, format, token = '') {
    let url = urlKey;

    if (!url) {
        throw new Error('请求错误：地址不能为空');
    }
    url = `${urls.host}/ks_manager/${urlKey}.do`;

    let options = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': format === 'JSON' ? 'application/json' : 'application/x-www-form-urlencoded'
        }
    };

    if (token) {
        params.token = token;
    }

    if (method === 'GET') {
        url = URI(url).query(params).toString();
        if (__DEV__){
            // console.log(`GET ${url} `);
        }
    }
    else if (method === 'POST' || method === 'PUT') {
        let bodyString = "";
        if(format === 'JSON') {
            bodyString = JSON.stringify(params);
            options = {...options, body: bodyString};
        }else {
            for (let param in params) {
                bodyString += (param + '=' + encodeURIComponent(params[param]) + '&');
            }
            options = {...options, body: bodyString.substring(0, bodyString.length - 1)};
        }
        if (__DEV__ && !/heartBeat/.test(url)){
            // console.log(`POST ${url}: ${bodyString} `);
        }
    }

    try {
        let response = await fetch(url, options);
        if (response.ok) {
            let json = await response.text();
            if (__DEV__ && !/heartBeat/.test(url)) {
                // console.log(`RESP ${json}`);
            }

            let jsonObj = JSON.parse(json);
            if (!jsonObj) {
                throw new Error("Wrong json: " + json);
            }

            if (jsonObj instanceof Array) {
                return jsonObj;
            }
            else if (jsonObj.type == 1) {
                // 成功返回整个json对象
                return jsonObj;
            }
            else if (jsonObj.type == -1) {
                if (jsonObj.msg) {
                    throw new Error(jsonObj.msg);
                }
                else {
                    throw new Error('未知错误');
                }
            }
            else {
                if (jsonObj.msg) {
                    throw new Error(jsonObj.msg);
                }
                else {
                    throw new Error('未知错误');
                }
            }
        }
        console.warn('[Request error]: URLKey: ' + urlKey, 'HTTP status: ' + response.status);
        throw new Error(NetworkFailed);
    }
    catch (error) {
        if (error.message === 'Network request failed') {
            console.warn('[Request error]: URLKey: ' + urlKey, 'message: ' + error.message);
            throw new Error('加载失败，请检查网络状态！');
        }
        else if ( error.message === NetworkFailed) {
            throw  error;
        }
        else {
            if (__DEV__) {
                // console.warn('[Request error]: URLKey: ' + urlKey, 'message: ' + error.message);
            }
            throw error;
        }
    }
}
