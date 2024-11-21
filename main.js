'use strict';

const utils = require('@iobroker/adapter-core');
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
    this.on('ready', this.onReady.bind(this));
    this.on('stateChange', this.onStateChange.bind(this));
    // this.on('objectChange', this.onObjectChange.bind(this));
    // this.on('message', this.onMessage.bind(this));
    this.on('unload', this.onUnload.bind(this));
  }
  async onReady() {
    await this.setObjectNotExistsAsync('testVariable', {
      type: 'state',
      common: {
        name: 'testVariable',
        type: 'boolean',
        role: 'indicator',
        read: true,
        write: true,
      },
      native: {},
    });

    this.subscribeStates('testVariable');

    await this.setStateAsync('testVariable', true);

    await this.setStateAsync('testVariable', { val: true, ack: true });

    await this.setStateAsync('testVariable', { val: true, ack: true, expire: 30 });

    let result = await this.checkPasswordAsync('admin', 'iobroker');
    this.log.info('check user admin pw iobroker: ' + result);

    result = await this.checkGroupAsync('admin', 'admin');
    this.log.info('check group user admin group admin: ' + result);
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