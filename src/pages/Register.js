/**
 * 登陆页
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import ToastUtils from '../utils/ToastUtils';
import {connect} from 'react-redux';
import {styles} from '../styles/pages/Login.style';
import InputScrollView from '../components/InputScrollView';
import NavBar from '../components/NavBar';
import {AppImage} from '../resource/AppImage';
import RegexsUtils from '../utils/RegexsUtils';

import {register, sendCode, checkUser} from '../modules/redux/modules/auth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_user: "",
            input_pwd: "",
            input_code: "",
            error: "",
            authSuccess: false, // 手机号码系统校验结果
            waiting: false,
            showPwd: false, //默认不显示密码
        };
    }

    componentDidMount() {
        this.sendCode();
    }

    // 发送短信验证码
    async sendCode() {
        try {
            await this.props.sendCode();
        }
        catch (error) {
            ToastUtils.toastShort(error.message);
        }
    }

    // 是否显示密码
    togglePwd() {
        this.setState({showPwd: !this.state.showPwd});
    }

    // 校验用户手机号码
    async checkUser() {
        try {
            if (RegexsUtils.phoneNum.test(this.state.input_user)) {
                await this.props.checkUser(this.state.input_user);
                this.setState({authSuccess: true});
            }
        }
        catch (error) {
            ToastUtils.toastShort(error.message);
        }
    }

    // 注册
    async register() {
        if(this.verify()) {
            this.setState({waiting: true});
            const data = {
                telephone: this.state.input_user,
                password: this.state.input_pwd,
                changeCode: this.state.input_code
            };
            try {
                await this.props.register(data);
                ToastUtils.toastLong("注册成功");
                this.props.navigator.resetTo({location: '/'});
            }
            catch (error) {
                ToastUtils.toastLong(error.message);
            }
            this.setState({waiting: false});
        }
    }

    // 输入检验
    verify() {
        let result = true;
        if(this.state.input_user == "") {
            result = false;
            ToastUtils.toastShort("请输入手机号码");
        }
        else if(!RegexsUtils.phoneNum.test(this.state.input_user)) {
            result = false;
            ToastUtils.toastShort("手机号码格式错误");
        }
        else if(this.state.input_pwd == "") {
            result = false;
            ToastUtils.toastShort("请输入密码");
        }
        else if(!RegexsUtils.password.test(this.state.input_pwd)) {
            result = false;
            ToastUtils.toastShort("密码格式错误");
        }
        else if(this.state.input_code == "") {
            result = false;
            ToastUtils.toastShort("请输入验证码");
        }
        else if(!RegexsUtils.imageCode.test(this.state.input_code)) {
            result = false;
            ToastUtils.toastShort("验证码格式错误");
        }
        return result;
    }

    render() {
        const btnCanPress = (this.state.input_user && this.state.input_pwd && !this.state.waiting && this.state.authSuccess)?true:false;

        return (
            <View style={styles.container}>
                <NavBar
                    title={"注册"}
                    statusBar={{hidden: true}} // ios的状态栏才有效
                    leftText="返回"
                    leftFunc={()=>this.props.navigator.pop()}
                />
                <InputScrollView
                    style={styles.contentContainer}
                    onResponderRelease={()=>dismissKeyboard()}
                >
                    <Image source={AppImage.logo} style={styles.logo}/>

                    <View style={styles.text_box}>
                        <TextInput
                            style={styles.text_box_text}
                            underlineColorAndroid="transparent"
                            placeholder="请输入手机号"
                            placeholderTextColor="#999999"
                            value={this.state.input_user}
                            keyboardType="numeric"
                            onBlur={()=>this.checkUser()}
                            onChangeText={input_user=>this.setState({input_user, error: "", authSuccess: false})}
                        />
                    </View>
                    <View style={[styles.text_box, styles.text_box_gap_top]}>
                        <TextInput
                            style={styles.text_box_text}
                            underlineColorAndroid="transparent"
                            placeholder="请输入6位数字密码"
                            placeholderTextColor="#999999"
                            value={this.state.input_pwd}
                            secureTextEntry={!this.state.showPwd}
                            keyboardType="numeric"
                            onChangeText={input_pwd=>this.setState({input_pwd})}
                        />
                        <TouchableOpacity
                            style={styles.text_box_controller}
                            activeOpacity={0.9}
                            onPress={()=>this.togglePwd()}
                        >
                            <Text style={styles.text_box_controller_text}>
                                {this.state.showPwd ? "隐藏密码" : "显示密码"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.text_box, styles.text_box_gap_top]}>
                        <TextInput
                            style={styles.text_box_text}
                            underlineColorAndroid="transparent"
                            placeholder="请输入验证码"
                            placeholderTextColor="#999999"
                            value={this.state.input_code}
                            keyboardType="numeric"
                            onChangeText={input_code=>this.setState({input_code, error: ""})}
                        />
                        <TouchableOpacity
                            style={[styles.text_box_controller, styles.pic_code]}
                            activeOpacity={0.9}
                            onPress={()=>this.sendCode()}
                        >
                            <Image
                                source={{uri: this.props.codeContent && this.props.codeContent.img}}
                                style={styles.pic_code}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.login_btn, !btnCanPress && styles.login_btn_disabled]}
                        activeOpacity={1}
                        disabled={!btnCanPress}
                        onPress={()=>this.register()}
                    >
                        <Text style={styles.login_button_text}>注册</Text>
                    </TouchableOpacity>
                </InputScrollView>
            </View>
        );
    }
}

export default connect(
    state=>({
        codeContent: state.auth.codeContent, // 验证码信息
    }),
    dispatch=>({
        sendCode: ()=>dispatch(sendCode()), // 获取验证码
        register: (data)=>dispatch(register(data)), // 注册
        checkUser: (user)=>dispatch(checkUser(user)), // 校验手机号
    })
)(Register)