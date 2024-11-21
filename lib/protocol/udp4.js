'use strict';

const base = require('./base').Base
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
var server = dgram.createSocket("udp4");

// Client sends UDP broadcast
class BaseClient {
  constructor(adapter) {
    this.adapter = adapter
    this.start()
  }
  start() {
    client.bind(9988, () => {
      client.setBroadcast(true);
    });
    var data = {
      id: '48cbd88f969eb3c486085cfe7b5eb1e4',
      devName: '*'
    }
    var message = JSON.stringify(data);
    const that = this
    client.send(message, 0, message.length, 9988, '255.255.255.255', function (err, bytes) {
      that.adapter.log.warn('sending-----')
      client.close();
    });
  }
}
// Server receiving device reply
class BaseServer extends base  {
  constructor(adapter, objectHelper) {
    super(adapter,objectHelper);
    this.adapter = adapter
    this.objectHelper = objectHelper
    this.start()
  }
  start() {
    const that = this
    
    server.on("error", function (err) {
      that.adapter.log.warn(`server error ${err.stack}`)
      server.close();
    });
    // Server receiving
    server.on("message", async function (msg, rinfo) {
      that.adapter.log.warn(`server got ${msg} from ${rinfo.address}: ${rinfo.port}`)
      if (msg) {
        that.adapter.setStateAsync('info.connection', { val: false, ack: true });
        const json = JSON.parse(msg.toString())
        // init Objects
        that.initObjects(json);
      }
    });
    // Server listening
    server.on("listening", function () {
      var address = server.address();
      that.adapter.log.warn(`server listening${address.address}: ${address.port}`)
    });
    server.bind(9989);
  }
  // check isonline
  isOnline() {
    return this.adapter.onlineCheck(this.deviceId);
  }
}

module.exports = {
  BaseClient,
  BaseServer
};
