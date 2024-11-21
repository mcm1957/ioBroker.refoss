'use strict';

const utils = require('@iobroker/adapter-core');
const objectHelper = require('@apollon/iobroker-tools').objectHelper;
const BaseClient = require('./lib/protocol/udp4').BaseClient;
const BaseServer = require('./lib/protocol/udp4').BaseServer;
const adapterName = require('./package.json').name.split('.').pop();

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
    this.baseClient = null;
    this.baseServer = null;
    this.on('ready', this.onReady.bind(this));
    this.on('stateChange', this.onStateChange.bind(this));
    // this.on('objectChange', this.onObjectChange.bind(this));
    // this.on('message', this.onMessage.bind(this));
    this.on('unload', this.onUnload.bind(this));
  }
  async onReady() {
    try {
      await this.mkdirAsync(this.namespace, 'scripts');
      this.subscribeForeignFiles(this.namespace, '*');
      this.subscribeStates('*');
      objectHelper.init(this);

      // create UDP broadcast
      this.clientServer = new BaseClient(this)
      this.server = new BaseServer(this, objectHelper)
    } catch (error) {
      
    }
  }

  /**
   * @param {() => void} callback
   */
  onUnload(callback) {
    try {

      callback();
    } catch (e) {
      callback();
    }
  }
  /**
   * Is called if a subscribed state changes
   * @param {string} id
   * @param {ioBroker.State | null | undefined} state
   */
  onStateChange(id, state) {
    if (state) {
      // The state was changed
      this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
    } else {
      // The state was deleted
      this.log.info(`state ${id} deleted`);
    }
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