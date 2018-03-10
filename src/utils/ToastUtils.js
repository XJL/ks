import Toast from 'react-native-root-toast';

var ToastUtils = {

    toastLongOptions:{
        position: Toast.positions.CENTER,
        duration: Toast.durations.LONG,
        shadow: true,
        animation: true,
        delay: 0,
    },

    toastShortOptions: {
        position: Toast.positions.CENTER,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        delay: 0,
    },

    toastLong: function(msg) {
        this.toast && this.toast.destroy();
        this.toast = Toast.show(msg, this.toastLongOptions);
    },

    toastShort: function(msg) {
        this.toast && this.toast.destroy();
        this.toast = Toast.show(msg, this.toastShortOptions);
    },
};

export default ToastUtils;