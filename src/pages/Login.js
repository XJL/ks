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
import {login, sendCode} from '../modules/redux/modules/auth';

class Login extends Component {
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

    componentDidMount() {
        this.sendCode();
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

    // 登陆
    async login() {
        if(this.verify()) {
            this.setState({waiting: true});
            const data = {
                username: this.state.input_user,
                password: this.state.input_pwd,
                changeCode: this.state.input_code
            };
            try {
                await this.props.login(data);
                this.toastLong("登陆成功");
                this.props.navigator.resetTo({location: '/user'});
            }
            catch (error) {
                this.toastLong(error.message);
            }
            this.setState({waiting: false});
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

    // 去忘记密码页面
    goForget() {
        this.props.navigator.push({location: '/reset'});
    }

    // 去注册页面
    goRegister() {
        this.props.navigator.push({location: '/register'});
    }

    // 是否显示密码
    togglePwd() {
        this.setState({showPwd: !this.state.showPwd});
    }

    render() {
        const btnCanPress = (this.state.input_user && this.state.input_pwd && this.state.input_code && !this.state.waiting)?true:false;

        return (
            <View style={styles.container}>
                <NavBar
                    title={"登陆"}
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

                    <TouchableOpacity
                        style={[styles.login_btn, !btnCanPress && styles.login_btn_disabled]}
                        activeOpacity={1}
                        disabled={!btnCanPress}
                        onPress={()=>this.login()}
                    >
                        <Text style={styles.login_button_text}>登陆</Text>
                    </TouchableOpacity>

                    < View style={styles.optRow}>
                        <Text
                            style={styles.opt_row_text}
                            onPress={()=>this.goRegister()}
                        >
                            快速注册
                        </Text>
                        <Text
                            style={styles.opt_row_text}
                            onPress={()=>this.goForget()}
                        >
                            找回密码
                        </Text>
                    </View>
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
        login: (data)=>dispatch(login(data)), // 登陆
    })
)(Login)