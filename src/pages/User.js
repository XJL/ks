import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {styles} from '../styles/pages/User.style';
import {AppImage} from '../resource/AppImage';

class User extends Component {
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
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.headerItem, {borderRightWidth: 0.8, borderColor: '#dddddd'}]}
                            onPress={()=>{}}
                        >
                            <Text style={styles.headerItemValue}>****</Text>
                            <Text style={styles.headerItemName}>贷款金额(元)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.headerItem}
                            onPress={()=>{}}
                        >
                            <Text style={styles.headerItemValue}>****</Text>
                            <Text style={styles.headerItemName}>总资产(元)</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemList}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemRow}
                            onPress={()=>{}}
                        >
                            <View style={styles.itemRowContent}>
                                <Text style={styles.itemRowContentName}>我的信息</Text>
                                <Text style={styles.itemRowContentValue}>****</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.itemRow}
                            onPress={()=>{}}
                        >
                            <View style={styles.itemRowContent}>
                                <Text style={styles.itemRowContentName}>我的信息</Text>
                                <Text style={styles.itemRowContentValue}>****</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.itemRow, styles.lastItemRow]}
                            onPress={()=>{}}
                        >
                            <View style={styles.itemRowContent}>
                                <Text style={styles.itemRowContentName}>我的信息</Text>
                                <Text style={styles.itemRowContentValue}>****</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemList}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.itemRow, styles.lastItemRow]}
                            onPress={()=>{}}
                        >
                            <View style={styles.itemRowContent}>
                                <Text style={styles.itemRowContentName}>我的信息</Text>
                                <Text style={styles.itemRowContentValue}>****</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemList}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.itemRow, styles.lastItemRow]}
                            onPress={()=>{}}
                        >
                            <View style={styles.itemRowContent}>
                                <Text style={styles.itemRowContentName}>我的信息</Text>
                                <Text style={styles.itemRowContentValue}>****</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemList}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.itemRow, styles.lastItemRow]}
                            onPress={()=>{}}
                        >
                            <View style={styles.itemRowContent}>
                                <Text style={styles.itemRowContentName}>我的信息</Text>
                                <Text style={styles.itemRowContentValue}>****</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state=>({}),
)(User)