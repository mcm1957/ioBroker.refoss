'use strict';

const dataoptions = require('../datapoints')
const SelfHttp = require('../protocol/http').SelfHttp

class Base {
  constructor(adapter, objectHelper) {
    this.adapter = adapter
    this.objectHelper = objectHelper;
    this.deviceId = null;
    this.deviceMode = null
    this.ip = null
    this.device = {};
    this.httpData = {}
  }
  async initObjects(deveiceInfo) {
    this.ip = deveiceInfo.ip
    this.getDeviceId(deveiceInfo)
    if (deveiceInfo.devName == 'em06') {
      return new Promise((resolve, reject) => {
        const httpAck = new SelfHttp(this.adapter, deveiceInfo)
        this.httpData = httpAck.httpData
        resolve(this.httpData)
      }).then(res => {
        // this.adapter.log.warn(`base----httpData----${JSON.stringify(this.httpData)}`)
        this.deleteOldObjects()
        this.createObjects()
      })
    }
  }
  async deleteOldObjects() {
    const objList = await this.adapter.getAdapterObjectsAsync();
    const dps = dataoptions.getDeviceByClass()
    if (dps) {
      for (const o in objList) {
        const tmpObj = objList[o];
        if (tmpObj && tmpObj._id && tmpObj.type) {
          // remove namespace
          const stateId = tmpObj._id.replace(`${this.adapter.namespace}.${this.deviceId}.`, '');
          // Just delete states of this device!
          if (tmpObj.type === 'state' && tmpObj._id.startsWith(`${this.adapter.namespace}.${this.deviceId}`)) {
            if (!dps[stateId]) {
              try {
                if (this.objectHelper.getObject(tmpObj._id)) {
                  this.objectHelper.deleteObject(tmpObj._id);
                } else {
                  await this.adapter.delForeignObjectAsync(tmpObj._id);
                }

                delete objList[tmpObj._id];
                delete this.device[stateId];

                this.adapter.log.debug(`Deleted unused state "${tmpObj._id}"`);
              } catch (err) {
                this.adapter.log.error(`Could not delete unused state "${tmpObj._id}": ${err}`);
              }
            }
          }
        }
      }
    }
    // Delete empty channels
    for (const o in objList) {
      const tmpObj = objList[o];
      if (tmpObj && tmpObj.type && tmpObj._id && tmpObj.type === 'channel') {
        // Search for states in current channel
        let found = false
        for (const j in objList) {
          const tmpidj = objList[j];
          if (!tmpidj) {
            continue;
          }

          if (tmpidj && tmpidj.type && tmpidj._id && tmpidj.type === 'state' && tmpidj._id.startsWith(tmpObj._id)) {
            found = true;
            break;
          }
        }
        if (found === false) {
          try {
            if (this.objectHelper.getObject(tmpObj._id)) {
              this.objectHelper.deleteObject(tmpObj._id);
            } else {
              await this.adapter.delForeignObjectAsync(tmpObj._id, { recursive: true });
            }

            delete objList[tmpObj._id];

            this.adapter.log.debug(`Deleted unused channel "${tmpObj._id}"`);
          } catch (err) {
            this.adapter.log.error(`Could not delete unused channel "${tmpObj._id}": ${err}`);
          }
        }
      }
    }
  }
  async createObjects() {
    return new Promise((resolve, reject) => {
      try {
        const deviceStates = dataoptions.getDeviceByClass()
        if (deviceStates) {
          for (const stateId in deviceStates) {
            const state = deviceStates[stateId];
            state.state = stateId;
            this.objectHelper.setOrUpdateObject(this.deviceId, {
              type: 'device',
              common: {
                name: `Device ${this.deviceId}`,
                statusStates: {
                  onlineId: `${this.adapter.namespace}.${this.deviceId}.online`,
                },
              },
              native: {},
            }, ['name'])
            const channel = stateId.split('.').slice(0, 1).join();
            if (channel !== stateId) {
              const channelId = `${this.deviceId}.${channel}`;
              this.objectHelper.setOrUpdateObject(channelId, {
                type: 'channel',
                common: {
                  name: `Channel ${channel}`,
                },
              }, ['name']);
            }
            const fullStateId = `${this.deviceId}.${stateId}`;

            let controlFunction;

            // HTTP
            // if (state.http.http_cmd) {

            // }

            // Init value or funct
            let value = undefined;

            if (state.http?.init_funct) {
              value = state.http.init_funct(this);
            }
            this.objectHelper.setOrUpdateObject(fullStateId, {
              type: 'state',
              common: state.common,
            }, ['name'], value, controlFunction, false);
          }
        }
        this.objectHelper.processObjectQueue(() => {
          // this.http = deviceStatesHttp;
          this.device = deviceStates;
          this.adapter.log.debug(`[createObjects] Finished object creation of ${this.getLogInfo()}`);
          resolve(true);
        });

      } catch (error) {
        this.adapter.log.warn(`[createObjects] Error----${error}`);
      }
    })
  }
  getDeviceId(deveiceInfo) {
    this.deviceId = 'refoss' + deveiceInfo.devName + '#' + deveiceInfo.mac.replaceAll(':', '')
  }
  getIP() {
    return this.ip;
  }
  getElectricity(channel, type) {
    for(let i in this.httpData) {
      if(i + 1 == channel) {
        return this.httpData[i][type]
      }
    }
  }
  /**
 * Returns a string for logging with the IP address, name of device
 * @return {String}
 */
  getLogInfo() {
    return `${this.ip ?? ''} (${this.deviceId})`.trim();
  }

}

module.exports = {
  Base
};