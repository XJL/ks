/**
 * 用户信息页
 */
import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import LinearGradient from 'react-native-linear-gradient';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-root-toast';
import {styles} from '../styles/pages/User.style';
import Contacts from 'react-native-contacts';
import {logout, uploadContact} from '../modules/redux/modules/auth';
import {AppImage} from '../resource/AppImage';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
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

    componentWillMount() {
        try {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                    // error
                } else {
                    // contacts returned in []
                    console.log(contacts)
                    let list = [];
                    contacts.map((index, el)=> {
                        list[index] = {
                            mail_list_name: el.givenName,
                            mail_list_phone: el.phoneNumbers && el.phoneNumbers[0] && el.phoneNumbers[0].number,
                            personalid: ""
                        }
                    });
                    let data = {mailList: list};
                    // this.props.uploadContact(data);
                }
            })
        }
        catch (error) {
            this.toastShort(error.message);
        }
    }

    // 推出登陆
    async logout() {
        try {
            // await this.props.logout();
            this.props.navigator.resetTo({location: '/'});
        }
        catch (error) {
            this.setState({error: error.message});
        }
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
                <NavigationBar title={{title: "我"}}/>
                <ScrollView
                    style={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    // refreshControl={
                    //     <RefreshController
                    //         refreshing={this.state.isRefreshing}
                    //         onRefresh={()=>this.onRefresh(true)}
                    //     />
                    // }
                >
                    <View style={styles.header}>
                        <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.header_bg}
                        />
                        <Image source={AppImage.logo} style={styles.header_logo}/>
                        <View style={styles.header_item_row}>
                            <View style={styles.header_item}>
                                <Text style={styles.header_item_text}>20万</Text>
                                <Text style={[styles.header_item_text, styles.header_item_text_gap]}>申请金额</Text>
                            </View>
                            <View style={styles.header_item}>
                                <Text style={styles.header_item_text}>6个月</Text>
                                <Text style={[styles.header_item_text, styles.header_item_text_gap]}>申请期限</Text>
                            </View>
                            <View style={styles.header_item}>
                                <Text style={styles.header_item_text}>申请中</Text>
                                <Text style={[styles.header_item_text, styles.header_item_text_gap]}>审批进度</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.main_info_title_row}>
                        <View style={styles.main_info_title_line}/>
                        <Text style={styles.main_info_title_text}>借款人信息</Text>
                        <View style={styles.main_info_title_line}/>
                    </View>
                    
                    <View style={styles.main_info_list}>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>姓名</Text>
                            <Text style={styles.main_info_row_value}>许建林</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>身份证号</Text>
                            <Text style={styles.main_info_row_value}>123123123</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>手机号码</Text>
                            <Text style={styles.main_info_row_value}>123123123123</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>贷款类型</Text>
                            <Text style={styles.main_info_row_value}>随便</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>还款方式</Text>
                            <Text style={styles.main_info_row_value}>每天还款</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>贷款方式</Text>
                            <Text style={styles.main_info_row_value}>小额借款</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>扣款明细</Text>
                            <Text style={styles.main_info_row_value}>查看</Text>
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity
                    style={styles.logout_btn}
                    activeOpacity={1}
                    onPress={()=>this.logout()}
                >
                    <Text style={styles.logout_btn_text}>退出</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(
    state=>({
        userInfo: state.auth.userInfo
    }),
    dispatch=>({
        logout: ()=>dispatch(logout()),
        uploadContact: (data)=>dispatch(uploadContact(data)),
    })
)(User)