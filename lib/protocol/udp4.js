'use strict';

const base = require('./base').Base;
var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var server = dgram.createSocket('udp4');
const datapoints = require('../datapoints');

/**
 * Client sends UDP broadcast
 */
class BaseClient {
    /**
     *
     * @param adapter adapter
     */
    constructor(adapter) {
        this.adapter = adapter;
        this.start();
    }
    /**
     * start
     */
    start() {
        client.bind(9988, () => {
            client.setBroadcast(true);
        });
        var data = {
            id: '48cbd88f969eb3c486085cfe7b5eb1e4',
            devName: '*',
        };
        var message = JSON.stringify(data);
        for (let i = 0; i < 3; i++) {
            this.adapter.setTimeout(() => {
                this.send(message, i);
            }, 1000);
        }
    }
    /**
     *
     * @param message message
     * @param count flag
     */
    send(message, count) {
        client.send(message, 0, message.length, 9988, '255.255.255.255', () => {
            this.adapter.log.debug(`[UDP] broadcast port: 9988`);
            if (count == 2) {
                client.close();
                this.adapter.setTimeout(() => {
                    this.start();
                }, 3600000); // Send every 60 minutes
            }
        });
    }
}
/**
 * Server receiving device reply
 */
class BaseServer {
    /**
     *
     * @param adapter adapter
     * @param objectHelper objectHelper
     */
    constructor(adapter, objectHelper, devices) {
        this.adapter = adapter;
        this.objectHelper = objectHelper;
        this.deviceBase = [];
        this.deviceUuidList = []; // e.g. 2310166363058874000134298f1f41e8
      
        // Add know devices without message
        for (const device of devices) {

          this.adapter.log.debug(`Add know device ${device["_id"]}`)

          this.deviceUuidList.push(device["common"]["deveiceInfo"]["uuid"])
          const bs = new base(adapter, objectHelper, device["common"]["deveiceInfo"])
          this.deviceBase.push(bs)
        }
        this.start();
    }
    /**
     * start
     */
    start() {
        server.on('error', err => {
            this.adapter.log.error(`[UDP] server error ${err.stack}`);
            server.close();
        });
        // Server receiving
        server.on('message', async (msg, rinfo) => {
            this.adapter.log.debug(`[UDP] server got ${msg} from ${rinfo.address}: ${rinfo.port}`);
            if (msg) {
                let deveiceInfo;
                try {
                    deveiceInfo = JSON.parse(msg.toString());
                } catch (error) {
                    this.adapter.log.error(error.toString());
                    return;
                }
                if (!deveiceInfo.devName || !deveiceInfo.uuid) {
                    this.adapter.log.error(`Missing required fields in deveiceInfo: ${JSON.stringify(deveiceInfo)}`);
                    return;
                }
                // Verify devName and uuid
                const devName = this.sanitizeDevName(deveiceInfo.devName);
                if (!this.isValidUuid(deveiceInfo.uuid)) {
                    this.adapter.log.error(`Invalid UUID: ${deveiceInfo.uuid}`);
                    return;
                }
                // Init Objects
                if (this.deviceExists(devName) && !this.deviceUuidList.includes(deveiceInfo.uuid)) {
                    // Currently only supported, We will gradually support different models of devices in the future
                    this.deviceUuidList.push(deveiceInfo.uuid);
                    const bs = new base(this.adapter, this.objectHelper, deveiceInfo);
                    this.deviceBase.push(bs);
                }
            }
        });
        // Server listening
        server.on('listening', () => {
            var address = server.address();
            this.adapter.log.debug(`[UDP] server listening${address.address}: ${address.port}`);
        });
        server.bind(9989);
    }
    /**
     *
     * @param devName device name
     * @returns boolean
     */
    deviceExists(devName) {
        return datapoints.getDeviceTypeByClass(devName) ? true : false;
    }
    /**
     *
     * Verify devName
     *
     * @param devName devName
     * @returns devName
     */
    sanitizeDevName(devName) {
        return (devName || '').toString().replace(/[^a-zA-Z0-9_-]/g, '_');
    }
    /**
     *
     * Verify uuid
     *
     * @param uuid uuid
     * @returns uuidRegex
     */
    isValidUuid(uuid) {
        const uuidRegex = /^[0-9a-f]{32}$/i;
        return uuidRegex.test(uuid);
    }
    /**
     * destroy
     */
    destroy() {
        for (const i in this.deviceBase) {
            this.deviceBase[i].destroy();
        }
        server.close();
    }
}

module.exports = {
    BaseClient,
    BaseServer,
};
