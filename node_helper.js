'use strict';

/**
 * Magic Mirror
 * Module: MMM-Livolo
 *
 * By Krzysztof Stelmach http://www.stelmach.info
 * MIT Licensed.
 */
const NodeHelper = require('node_helper');
const Livolo = require('livolo');

module.exports = NodeHelper.create({

    start: function () {
		console.log('Starting node helper: ' + this.name);
    },

    getCode: function (btn) {
        var signal = null;
        switch (btn) {
            case 'a':
            case 'A':
                signal = 8;
                break;
            case 'b':
            case 'B':
                signal = 16;
                break;
            case 'c':
            case 'C':
                signal = 56;
                break;
            case 'd':
            case 'D':
            case 'off':
            case 'OFF':
                signal = 42;
                break;
            case '#1':
                signal = 0;
                break;
            case '#2':
                signal = 96;
                break;
            case '#3':
                signal = 120;
                break;
            case '#4':
                signal = 24;
                break;
            case '#5':
                signal = 80;
                break;
            case '#6':
                signal = 48;
                break;
            case '#7':
                signal = 108;
                break;
            case '#8':
                signal = 12;
                break;
            case '#9':
                signal = 72;
                break;
            case '#10':
                signal = 40;
                break;
            case '#off':
            case '#OFF':
                signal = 106;
                break;
            case 'scene1':
            case '#scene1':
                signal = 90;
                break;
            case 'scene2':
            case '#scene2':
                signal = 114;
                break;
            case 'scene3':
            case '#scene3':
                signal = 10;
                break;
            case 'scene4':
            case '#scene4':
                signal = 18;
                break;
            case 'dimmer+L':
            case '#dimmer+L':
                signal = 92;
                break;
            case 'dimmer-L':
            case '#dimmer-L':
                signal = 116;
                break;
            case 'dimmer+R':
            case '#dimmer+R':
                signal = 126;
                break;
            case 'dimmer-R':
            case '#dimmer-R':
                signal = 26;
                break;
        }
        return signal;
    },

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG') {
			this.config = payload;
			Livolo.open(this.config.sensorPin, {
				debugMode: this.config.debugMode,
				repeats: this.config.repeats
			});
		} else if (notification === 'LIVOLO_BUTTON') {
			var signal = this.getCode(payload.button);
			if (signal != null) {
				Livolo.sendButton(self.config.remoteID, signal);
			}
		}
	},

});