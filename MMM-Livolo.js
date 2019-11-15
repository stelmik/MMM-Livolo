/**
 * Magic Mirror
 * Module: MMM-Livolo
 *
 * By Krzysztof Stelmach http://www.stelmach.info
 * MIT Licensed.
 */
Module.register('MMM-Livolo',{

	requiresVersion: '2.1.0',

	defaults: {
		sensorPin: 29,		// physical pin number (pin 29 = GPIO-05)
		remoteID: 4979,
		debugMode: true,
		repeats: 150,
		notifications: {
			LIVOLO_BUTTON: "LIVOLO_BUTTON"
		}
	},

	start: function () {
		Log.info('Starting module: ' + this.name);
		this.sendSocketNotification('CONFIG', this.config);
	},

	notificationReceived: function (notification, payload, sender) {
		switch(notification) {
			case this.config.notifications.LIVOLO_BUTTON:
				this.sendSocketNotification('LIVOLO_BUTTON', payload);
				break;
		}
	},

});