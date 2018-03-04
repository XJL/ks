import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from '../styles/pages/Login.style';
import InputScrollView from '../components/InputScrollView';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import CountDown from '../components/CountDown';
import NavBar from '../components/NavBar';
import {NormalButton} from '../components/ButtonSet';
import {AppImage} from '../resource/AppImage';

import {login, sendCode} from '../modules/redux/modules/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input_user: "",
            input_code: "",
            error: "",
            waiting: true
        }
    }

    // 发送短信验证码
    async sendCode() {
        this.props.sendCode();
    }

    // 登陆
    async login() {
        const data = {
            user: this.state.input_user,
            code: this.state.input_code
        };
        try {
            await this.props.login(data);
            this.props.navigator.push({
                location: '/splashScreen'
            });
        }
        catch (error) {
            this.setState({error: error.message});
        }
    }

    render() {
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
                    <TextBox
                        style={styles.textBox}
                        inputStyle={styles.inputStyle}
                        placeholder="输入手机号码"
                        value={this.state.input_user}
                        keyboardType="numeric"
                        onChangeText={input_user=>this.setState({input_user})}
                        renderController={()=>{
                            return (
                                <Button
                                    icon={require('../resource/images/textbox_clear.png')}
                                    onPress={()=>{ this.setState({input_user: ''}) }}
                                />
                            );
                        }}
                    />
                    <TextBox
                        style={styles.textBox}
                        inputStyle={styles.inputStyle}
                        placeholder="输入短信验证码"
                        value={this.state.input_code}
                        keyboardType="numeric"
                        onChangeText={input_code=>this.setState({input_code})}
                        renderController={()=>{
                            return (
                                <CountDown
                                    text="获取短信验证码"
                                    style={styles.countDown}
                                    disableStyle={styles.countDownDisable}
                                    onPress={()=>this.sendCode()}
                                />
                            );
                        }}
                    />

                    <Text style={styles.errorText}>{this.state.error}</Text>

                    <NormalButton
                        text="登录"
                        style={styles.loginButton}
                        enable={this.state.waiting}
                        onPress={()=>this.login()}
                    />
                </InputScrollView>
            </View>
        );
    }
}

export default connect(
    state=>({}),
    dispatch=>({
        sendCode: ()=>dispatch(sendCode()),
        login: (data)=>dispatch(login(data))
    })
)(Login)