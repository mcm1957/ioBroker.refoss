'use strict';

const axios = require('axios');
const refossUtils = require('../utils/format')

function createHttp(adapter, httpInfo) {
  return new Promise((resolve, reject) => {
    try {
      let data = {
        "header": {
          "from": `/iob/${refossUtils.getRandomString(16)}/sub`,
          "messageId": refossUtils.getRandomString(32),
          "method": 'GET',
          "namespace": httpInfo.http_namespace,
          "payloadVersion": 1,
          "sign": refossUtils.getRandomString(32),
          "timestamp": refossUtils.getTimestampNow(),
          "triggerSrc": "ioBroker",
          "uuid": httpInfo.http_uuid,
        },
        "payload": httpInfo.http_payload
      }
      adapter.log.warn(`axios---${JSON.stringify(data)}---${httpInfo.http_ip}`)
      // @ts-ignore
      axios.post(`http://${httpInfo.http_ip}/config`, data).then(res => {
        adapter.log.warn(`res----${JSON.stringify(res.data)}`)
        resolve(res.data.payload)
        return res.data.payload
      }).catch(error => {
        adapter.log.warn(`axiosError---${error}`)
      });
    } catch (error) {
      adapter.log.warn(`error${error}`)
    }
  })
}

module.exports = { createHttp }