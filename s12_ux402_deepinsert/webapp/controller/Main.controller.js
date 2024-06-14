sap.ui.define([
	"com/sap/training/ux402/deepinsert/ux402_deepinsert/controller/BaseController",
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.deepinsert.ux402_deepinsert.controller.Main", {
		onInit: function() {
			if (sap.ui.Device.support.touch === false) {
				this.getView().addStyleClass("sapUiSizeCompact");
			}
		}
	});
});