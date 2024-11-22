'use strict';

const axios = require('axios');

class SelfHttp {
  constructor(adapter, deveiceInfo) {
    this.adapter = adapter
    this.deveiceInfo = deveiceInfo
    this.httpData = []
    this.createHttp()
  }
  async createHttp() {
    try {
      let data = {
        "header": {
          "from": `/iob/${this.getRandomString(16)}/sub`,
          "messageId": this.getRandomString(32),
          "method": 'GET',
          "namespace": 'Appliance.Control.ElectricityX',
          "payloadVersion": 1,
          "sign": this.getRandomString(32),
          "timestamp": this.getTimestampNow(),
          "triggerSrc": "ioBroker",
          "uuid": this.deveiceInfo.uuid,
        },
        "payload": {
          "electricity": [{
            "channel": 0xffff
          }]
        }
      }
      // @ts-ignore
      await axios.post(`http://${this.deveiceInfo.ip}/config`, data).then(res => {
        this.adapter.log.warn(`res----${JSON.stringify(res.data)}`)
        this.httpData = res.data.payload.electricity
      }).catch(error => {
        this.adapter.log.warn(`axiosError---${error}`)
      });
    } catch (error) {
      this.adapter.log.warn(`error${error}`)
    }
  }
  // Generate a random 16/32 byte string
  getRandomString(len) {
    len = len || 32
    var $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var maxPos = $chars.length;
    var rand = '';
    for (let i = 0; i < len; i++) {
      rand += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return rand;
  }
  getTimestampNow() {
    return Math.round(new Date().getTime() / 1000).toString()
  }
}

module.exports = {
  SelfHttp
};