var socket = {};
socket.init = function (http, topic) {
    this.http = http;
    this.topic = topic;
    if (typeof io != 'undefined') {
        this.socket = io.connect(this.http);
        this.fn();
        console.log(topic);
        this.socket.emit('init', {topic: this.topic});
    } else {
        console.log('socket not exists');
    }
};
/*初始化长连接接口方法*/
socket.fn = function () {
    this.socket.on('init', function (data) {
        if (data.code == 100) {
            console.log('connect ok');
        } else {
            console.log(data.message);
        }
    });
    this.socket.on('msg', function (data) {
        if (socket.msg && typeof socket.msg == 'function') {
            if (typeof data == 'string') data = JSON.parse(data);
            socket.msg(data);
        }
    });
    /*断开连接*/
    this.socket.on('disconnect', function () {
        console.log('断开连接');
    });
    /*成功重新连接*/
    this.socket.on('reconnect', function () {
        this.emit('init', {topic: socket.topic});
        console.log('重新连接');
    });
};
