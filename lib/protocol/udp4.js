'use strict';

const base = require('./base').Base
var dgram = require("dgram");
var client = dgram.createSocket("udp4");
var server = dgram.createSocket("udp4");
const datapoints = require('../datapoints')

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
    this.send(message)
    for (let i = 0; i < 2; i++) {
      this.adapter.setTimeout(() => {
        this.send(message, i)
      }, 1000)
    }
  }
  send(message, count) {
    const that = this
    client.send(message, 0, message.length, 9988, '255.255.255.255', function (err, bytes) {
      that.adapter.log.debug(`[UDP] broadcast port: 9988`)
      if (count == 1) {
        client.close()
      }
    });
  }
}
// Server receiving device reply
class BaseServer{
  constructor(adapter, objectHelper, devices) {
    this.adapter = adapter
    this.objectHelper = objectHelper
    this.deviceBase = []
    this.deviceUuidList = [] // e.g. 2310166363058874000134298f1f41e8

    // Add know devices without message
    for (const device of devices) {

      this.adapter.log.debug(`Add know device ${device["_id"]}`)

      this.deviceUuidList.push(device["common"]["deveiceInfo"]["uuid"])
      const bs = new base(adapter, objectHelper, device["common"]["deveiceInfo"])
      this.deviceBase.push(bs)
    }

    this.start()
  }
  start() {
    const that = this
    server.on("error", function (err) {
      that.adapter.log.error(`[UDP] server error ${err.stack}`)
      server.close();
    });
    // Server receiving
    server.on("message", async function (msg, rinfo) {
      that.adapter.log.debug(`[UDP] server got ${msg} from ${rinfo.address}: ${rinfo.port}`)
      if (msg) {
        const deveiceInfo = JSON.parse(msg.toString())
        // Init Objects
        if (that.deviceExists(deveiceInfo.devName) && !that.deviceUuidList.includes(deveiceInfo.uuid)) { // Currently only supported, We will gradually support different models of devices in the future
          that.deviceUuidList.push(deveiceInfo.uuid)
          const bs = new base(that.adapter, that.objectHelper, deveiceInfo)
          that.deviceBase.push(bs)
        }
      }
    });
    // Server listening
    server.on("listening", function () {
      var address = server.address();
      that.adapter.log.debug(`[UDP] server listening${address.address}: ${address.port}`)
    });
    server.bind(9989);
  }
  deviceExists(devName) {
    return datapoints.getDeviceTypeByClass(devName) ? true : false;
}
  destroy() {
    for (const i in this.deviceBase) {
      this.deviceBase[i].destroy();
    }
    server.close();
  }
}

module.exports = {
  BaseClient,
  BaseServer
};
