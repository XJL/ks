/**
 * 用户信息页
 */
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
import {logout} from '../modules/redux/modules/auth';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }

    // 推出登陆
    async logout() {
        try {
            // await this.props.logout();
            this.props.navigator.popToTop();
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

                    <View style={styles.itemList}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.itemRow, styles.lastItemRow, styles.optRow]}
                            onPress={()=>this.logout()}
                        >
                            <Text>退出登陆</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default connect(
    state=>({
        userInfo: state.auth.userInfo
    }),
    dispatch=>({
        logout: ()=>dispatch(logout())
    })
)(User)