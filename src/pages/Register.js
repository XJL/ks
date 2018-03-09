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
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import {styles} from '../styles/pages/Login.style';
import InputScrollView from '../components/InputScrollView';
import NavBar from '../components/NavBar';
import {NormalButton} from '../components/ButtonSet';
import {AppImage} from '../resource/AppImage';

import {register, sendCode} from '../modules/redux/modules/auth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_user: "",
            input_pwd: "",
            input_code: "",
            error: "",
            waiting: false,
            showPwd: false, //默认不显示密码
        };

        this.toastLongOptions = {
            position: Toast.positions.CENTER,
            duration: Toast.durations.LONG,
            shadow: true,
            animation: true,
            delay: 0,
        };

        this.toastShortOptions = {
            position: Toast.positions.CENTER,
            duration: Toast.durations.SHORT,
            shadow: true,
            animation: true,
            delay: 0,
        };

        this.toast = null;
    }

    // 发送短信验证码
    async sendCode() {
        try {
            await this.props.sendCode();
        }
        catch (error) {
            this.toastShort(error.message);
        }
    }

    // 是否显示密码
    togglePwd() {
        this.setState({showPwd: !this.state.showPwd});
    }

    // 登陆
    async register() {
        if(this.verify()) {
            const data = {
                telephone: this.state.input_user,
                password: this.state.input_pwd,
                changeCode: this.state.input_code
            };
            try {
                // await this.props.register(data);
                this.props.navigator.push({location: '/splashScreen'});
            }
            catch (error) {
                this.toastLong(error.message);
            }
        }
    }

    // 输入检验
    verify() {
        let result = true;
        if(this.state.input_user == "") {
            result = false;
            this.toastShort("请输入手机号码");
        }
        else if(this.state.input_pwd == "") {
            result = false;
            this.toastShort("请输入密码");
        }
        else if(this.state.input_code == "") {
            result = false;
            this.toastShort("请输入验证码");
        }
        return result;
    }

    toastLong(msg) {
        this.toast && this.toast.destroy();
        this.toast = Toast.show(msg, this.toastLongOptions);
    }

    toastShort(msg) {
        this.toast && this.toast.destroy();
        this.toast = Toast.show(msg, this.toastShortOptions);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title={"注册"}
                    statusBar={{hidden: true}} // ios的状态栏才有效
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
                            onChangeText={input_user=>this.setState({input_user, error: ""})}
                        />
                    </View>
                    <View style={[styles.text_box, styles.text_box_gap_top]}>
                        <TextInput
                            style={styles.text_box_text}
                            underlineColorAndroid="transparent"
                            placeholder="请输入密码"
                            placeholderTextColor="#999999"
                            value={this.state.input_pwd}
                            secureTextEntry={!this.state.showPwd}
                            keyboardType="default"
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

                    <NormalButton
                        text="注册"
                        style={styles.loginButton}
                        enable={(this.state.input_user && this.state.input_pwd && this.state.input_code && !this.state.waiting)?true:false}
                        onPress={()=>this.register()}
                    />
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
        register: (data)=>dispatch(register(data)) // 登陆
    })
)(Register)