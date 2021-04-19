/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/ns/ui5/manager/managerUI/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
