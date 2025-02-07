'use strict';

const utils = require('@iobroker/adapter-core');
const objectHelper = require('@apollon/iobroker-tools').objectHelper;
const BaseClient = require('./lib/protocol/udp4').BaseClient;
const BaseServer = require('./lib/protocol/udp4').BaseServer;
const adapterName = require('./package.json').name.split('.').pop();

// @ts-ignore
const tcpPing = require('tcp-ping');

class Refoss extends utils.Adapter {
  /**
   * @param {Partial<utils.AdapterOptions>} [options={}]
   */
  constructor(options) {
    super({
      ...options,
      // @ts-ignore
      name: adapterName,
    });
    this.isUnloaded = false;
    this.baseClient = null;
    this.baseServer = null;
    this.onlineCheckTimeout = null;
    this.onlineDevices = {}
    this.on('ready', this.onReady.bind(this));
    // this.on('objectChange', this.onObjectChange.bind(this));
    // this.on('message', this.onMessage.bind(this));
    this.on('unload', this.onUnload.bind(this));
  }
  async onReady() {
    try {
      this.subscribeStates('*');
      objectHelper.init(this);

      await this.initOnlineStatus();

      await this.onlineStatusCheck();

      this.setTimeout(() => {
        // Create UDP broadcast
        this.clientServer = new BaseClient(this)
        this.server = new BaseServer(this, objectHelper)
      }, 100)
    } catch (error) {

    }
  }

  /**
   * @param {() => void} callback
   */
  onUnload(callback) {
    this.isUnloaded = true;

    if (this.onlineCheckTimeout) {
      this.clearTimeout(this.onlineCheckTimeout);
      this.onlineCheckTimeout = null;
    }

    this.initOnlineStatus();
    try {
      if (this.server) {
        this.server.destroy()
      }
      callback();
    } catch (e) {
      callback();
    }
  }
  async initOnlineStatus() {
    const deviceIds = await this.getAllDeviceIds();
    for (const d in deviceIds) {
      const deviceId = deviceIds[d];
      const idOnline = `${deviceId}.online`;
      const onlineState = await this.getStateAsync(idOnline);

      if (onlineState) {
        await this.setStateAsync(idOnline, { val: false, ack: true });
      }
    }
    this.onlineDevices = {};
    await this.setStateAsync('info.connection', { val: false, ack: true });
  }
  /**
   * Online-Check TCP ping
   */
  async onlineStatusCheck() {
    const valPort = 80;
    if (this.onlineCheckTimeout) {
      this.clearTimeout(this.onlineCheckTimeout);
      this.onlineCheckTimeout = null;
    }

    try {
      const deviceIds = await this.getAllDeviceIds();
      for (const deviceId of deviceIds) {
        const stateHostaname = await this.getStateAsync(`${deviceId}.hostname`);
        const valHostname = stateHostaname ? stateHostaname.val : undefined;
        if (valHostname) {
          this.log.debug(`[onlineStatusCheck] Checking ${deviceId} on ${valHostname}:${valPort}`);
          tcpPing.probe(valHostname, valPort, (error, isAlive) => {
            this.deviceStatusUpdate(deviceId, isAlive)
          })
        }
      }

    } catch (error) {
      this.log.error(error.toString());
    }

    this.onlineCheckTimeout = this.setTimeout(() => {
      this.onlineCheckTimeout = null;
      this.onlineStatusCheck();
    }, 15 * 1000); // Restart online check in 15 seconds
  }
  async deviceStatusUpdate(deviceId, status) {
    if (this.isUnloaded) return;
    if (!deviceId) return;

    // Update online status
    const idOnline = `${deviceId}.online`;

    const onlineState = await this.getStateAsync(idOnline);

    if (onlineState) {
      // Compare to previous value
      const prevValue = onlineState.val ? (onlineState.val === 'true' || onlineState.val === true) : false;
      if (prevValue != status) {
        await this.setStateAsync(idOnline, { val: status, ack: true });
      }
    }

    // Update connection state
    const oldOnlineDeviceCount = Object.keys(this.onlineDevices).length;

    if (status) {
      this.onlineDevices[deviceId] = true;
    } else if (Object.prototype.hasOwnProperty.call(this.onlineDevices, deviceId)) {
      delete this.onlineDevices[deviceId];
    }

    const newOnlineDeviceCount = Object.keys(this.onlineDevices).length;

    // Check online devices
    if (oldOnlineDeviceCount !== newOnlineDeviceCount) {
      this.log.debug(`[deviceStatusUpdate] Online devices: ${JSON.stringify(Object.keys(this.onlineDevices))}`);
      if (newOnlineDeviceCount > 0) {
        await this.setStateAsync('info.connection', { val: true, ack: true });
      } else {
        await this.setStateAsync('info.connection', { val: false, ack: true });
      }
    }
  }

  async getAllDeviceIds() {
    const devices = await this.getDevicesAsync();
    return devices.map(device => this.removeNamespace(device._id));
  }
  isOnline(deviceId) {
    return Object.prototype.hasOwnProperty.call(this.onlineDevices, deviceId);
  }

  removeNamespace(id) {
    const re = new RegExp(`${this.namespace}*\\.`, 'g');
    return id.replace(re, '');
  }

}

if (require.main !== module) {
  // Export the constructor in compact mode
  /**
   * @param {Partial<utils.AdapterOptions>} [options={}]
   */
  module.exports = (options) => new Refoss(options);
} else {
  // otherwise start the instance directly
  new Refoss();
}