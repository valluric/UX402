sap.ui.define([
		"com/sap/training/ux402/deepinsert/ux402_deepinsert/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.sap.training.ux402.deepinsert.ux402_deepinsert.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);