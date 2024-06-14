/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sap/training/ux402/deepinsert/ux402_deepinsert/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
