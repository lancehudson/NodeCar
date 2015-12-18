var dgram = require('dgram');
var net = require('net');
var keypress = require('keypress');

var port = 9003;
var notConnected = true;

var s = dgram.createSocket('udp4');

s.on('message', function(msg, rinfo) {
  var matches = msg.toString().match(/NodeCar:(\d+)/);
  if (matches[1] && notConnected) {
    notConnected = false;
    startControl(rinfo.address, matches[1]);
  }
});

s.bind(port);

var startControl = function(host, port) {
  var car = net.connect(port, host, function() {
    console.log('Connected');
    var controller = function(ch, key) {
      if (key.name === 'c' && key.ctrl) {
        console.log('bye bye');
        process.exit();
      }
      if (key.name === 'space') {
        car.write('0');
      }
      if (key.name === 'up') {
        car.write('1');
      }
      if (key.name === 'down') {
        car.write('2');
      }
      if (key.name === 'right') {
        car.write('4');
      }
      if (key.name === 'left') {
        car.write('3');
      }
      if (key.name === 'q') {
        car.write('6');
      }
      if (key.name === 'a') {
        car.write('7');
      }
      if (key.name === 'w') {
        car.write('8');
      }
      if (key.name === 's') {
        car.write('9');
      }
    };

    keypress(process.stdin);

    process.stdin.on('keypress', controller);
    process.stdin.setRawMode(true);
    process.stdin.resume();
  });
};
