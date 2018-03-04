import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text,} from 'react-native';

import {styles} from './style';

import Button from '../Button';

const propTypes = {
    text: PropTypes.string, // 未倒数时的文字
    max: PropTypes.number, // 倒数最大值
    auto: PropTypes.bool, // 自动开始倒数
};

const defaultProps = {
    text: '获取验证码',
    max: 60,
    auto: false,

};

export default class CountDown extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            countDownBegin: Date.now(),
            countDown: this.props.auto ? this.props.max : 0
        };

        this.timer;
    }

    componentWillMount() {
        if (this.props.auto) {
            this.timer = setInterval(this.updateTimer, 1000);
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    onPress() {
        this.setState({countDown: this.props.max, countDownBegin: Date.now()});
        this.timer = setInterval(this.updateTimer, 1000);
        this.props.onPress && this.props.onPress();
    }

    updateTimer = () => {
        const last = this.props.max - Math.floor((Date.now() - this.state.countDownBegin) / 1000);

        if (last >= 1) {
            this.setState({countDown: last});
        } else {
            this.setState({countDown: 0});
            clearInterval(this.timer);
            this.timer = null;
        }
    };

    render() {
        const {countDown} = this.state;
        return (
            <Button
                text={countDown ? countDown+"s" : this.props.text}
                enable={countDown === 0}
                onPress={() => this.onPress()}
                style={[styles.buttonEnable, this.props.style]}
                disableStyle={[styles.buttonDisable, this.props.disableStyle]}
            />
        );
    }
}

CountDown.propTypes = propTypes;
CountDown.defaultProps = defaultProps;
