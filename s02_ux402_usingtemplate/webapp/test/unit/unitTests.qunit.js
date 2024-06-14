/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student04/com/sap/training/ux402/templateusage/ux402usingtemplate/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});