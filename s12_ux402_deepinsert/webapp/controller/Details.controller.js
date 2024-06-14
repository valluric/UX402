sap.ui.define([
	"com/sap/training/ux402/deepinsert/ux402_deepinsert/controller/BaseController",
	"sap/ca/ui/model/format/AmountFormat",
	"sap/ca/ui/model/type/Date"
], function(Controller, AmountFormat, Date) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.deepinsert.ux402_deepinsert.controller.Details", {
		_oItemTemplate: null,
		_oNavigationTable: null,
		_sItemPath: "",
		_sNavigationPath: "",

		onInit: function() {
			this._oView = this.getView();
			this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
			this._oRouter = this._oComponent.getRouter();
			this._oNavigationTable = this.byId("navigationTable");
			this._oItemTemplate = this.byId("navigationListItem").clone();

			// Get Context Path for Page 2 Screen
			this._oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
		},

		// Bind Review Table using oData Reviews Entity
		_bindNavigationTable: function(sURL) {
			this._oNavigationTable.bindItems({
				path: sURL,
				template: this._oItemTemplate
			});
		},

		_onRoutePatternMatched: function(oEvent) {
			if (oEvent.getParameter("name") !== "Details") {
				return;
			}

			this._sItemPath = "/" + oEvent.getParameters().arguments.entity;
			this._sNavigationPath = this._sItemPath + "/" + "ToLineItems";

			// Bind Object Header and Form using oData
			this.byId("DetailsPage").bindElement({
				path: this._sItemPath
			});

			// Bind Review Table using oData Reviews Entity
			this._bindNavigationTable(this._sNavigationPath);
		},

		onNavBack: function() {
			window.history.go(-1);
		}
	});
});