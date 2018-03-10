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
import {AppImage} from '../resource/AppImage';

import {reset} from '../modules/redux/modules/auth';

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_user: "",
            input_pwd: "",
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

    // 登陆
    async logout() {
        if(this.verify()) {
            const data = {
                username: this.state.input_user,
                password: this.state.input_pwd,
            };
            try {
                await this.props.reset(data);
                this.props.navigator.pop();
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

    // 是否显示密码
    togglePwd() {
        this.setState({showPwd: !this.state.showPwd});
    }

    render() {
        const btnCanPress = (this.state.input_user && this.state.input_pwd && !this.state.waiting)?true:false;

        return (
            <View style={styles.container}>
                <NavBar
                    title={"找回密码"}
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

                    <TouchableOpacity
                        style={[styles.login_btn, !btnCanPress && styles.login_btn_disabled]}
                        activeOpacity={1}
                        disabled={!btnCanPress}
                        onPress={()=>this.logout()}
                    >
                        <Text style={styles.login_button_text}>确定</Text>
                    </TouchableOpacity>
                </InputScrollView>
            </View>
        );
    }
}

export default connect(
    state=>({

    }),
    dispatch=>({
        sendCode: ()=>dispatch(sendCode()), // 获取验证码
        reset: (data)=>dispatch(reset(data)) // 登陆
    })
)(Reset)