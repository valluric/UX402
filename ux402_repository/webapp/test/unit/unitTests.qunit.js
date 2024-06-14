/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student02comsaptrainingux402repository/ux402_repository/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
