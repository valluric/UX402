/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student00comsaptrainingux402mockdata/ux402_mockdata/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
