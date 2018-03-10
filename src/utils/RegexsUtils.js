/**
 * 正则匹配规则
 */
const RegexsUtils = {
    //校验手机号码: 手机号码由三位号码段加8位0~9数字组成,其中现有号码段有 130~139; 145,147; 15[012356789]; 170,171,176,177,178; 180~189。
    phoneNum: new RegExp('^0?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[57])[0-9]{8}$'),
    password: new RegExp('^\\d{6}$'),
    imageCode: new RegExp('^\\d{4}$'),
};

export default RegexsUtils;