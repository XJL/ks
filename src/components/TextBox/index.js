import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TextInput} from 'react-native';

import {styles} from './style';

const propTypes = {};

const defaultProps = {};

export default class TextBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocus: this.props.autoFocus ? this.props.autoFocus : false,
            borderColor: '#d3d3d3'
        };
    }

    focus() {
        this.textInput.focus();
    }

    onFocus() {
        this.setState({isFocus: true});
        this.props.onFocus && this.props.onFocus();
    }

    onBlur() {
        this.setState({isFocus: false});
        this.props.onBlur && this.props.onBlur();
    }

    render() {
        const {style, iconInactive, iconActive, header, renderController, inputStyle,
            defaultValue, headerStyle, headerText,...other} = this.props;
        const {isFocus} = this.state;

        return (
            <View
                style={[
            header ? styles.headerContainer : styles.container,
            isFocus ? styles.focus : styles.blur,
            style
          ]}
            >
                {
                    iconInactive
                        ? <Image style={styles.icon} source={isFocus ? iconActive : iconInactive} />
                        : header && (
                        <View style={[styles.headerView, headerStyle]}>
                            <Text style={[styles.header, headerText]}>{header}</Text>
                        </View>
                    )
                }
                <TextInput
                    defaultValue={defaultValue || ''}
                    ref={ref=>this.textInput=ref}
                    style={[styles.input, inputStyle]}
                    underlineColorAndroid="transparent"
                    onFocus={()=>this.onFocus()}
                    onBlur={()=>this.onBlur()}
                    placeholderTextColor='#d4d4d4'
                    {...other}
                />
                {renderController && renderController()}
            </View>
        );
    }
}

TextBox.propTypes = propTypes;
TextBox.defaultProps = defaultProps;
