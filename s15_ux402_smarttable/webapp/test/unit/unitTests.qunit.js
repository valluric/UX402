/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student00comsaptrainingux402smarttable/ux402_smarttable/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
