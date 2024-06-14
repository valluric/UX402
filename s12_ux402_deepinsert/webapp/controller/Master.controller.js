sap.ui.define([
	"com/sap/training/ux402/deepinsert/ux402_deepinsert/controller/BaseController",
	"sap/ca/ui/model/format/AmountFormat",
	"sap/m/TablePersoController"
], function(Controller, AmountFormat, TablePersoController) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.deepinsert.ux402_deepinsert.controller.Master", {
		_oCatalog: null,
		_oResourceBundle: null,

		onInit: function() {
			this._oView = this.getView();
			var oItemTemplate = this.byId("columnListItem").clone();
			this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
			this._oResourceBundle = this._oComponent.getModel("i18n").getResourceBundle();
			this._oRouter = this._oComponent.getRouter();
			this._oCatalog = this.byId("catalogTable");

			this._initViewPropertiesModel();
			this._oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
		},

		// The model created here is used to set values or view element properties that cannot be bound
		// directly to the OData service. Setting view element attributes by binding them to a model is preferable to the
		// alternative of getting each view element by its ID and setting the values directly because a JSon model is more
		// robust if the customer removes view elements (see extensibility).
		_initViewPropertiesModel: function() {
			var oViewElemProperties = {};
			oViewElemProperties.catalogTitleText = "SalesOrderSet";
			if (sap.ui.Device.system.phone) {
				oViewElemProperties.availabilityColumnWidth = "80%";
				oViewElemProperties.pictureColumnWidth = "5rem";
				oViewElemProperties.btnColHeaderVisible = true;
				oViewElemProperties.searchFieldWidth = "100%";
				oViewElemProperties.catalogTitleVisible = false;
				// in phone mode the spacer is removed in order to increase the size of the search field
				this.byId("tableToolbar").removeContent(this.byId("toolbarSpacer"));
			} else {
				oViewElemProperties.availabilityColumnWidth = "18%";
				oViewElemProperties.pictureColumnWidth = "9%";
				oViewElemProperties.btnColHeaderVisible = false;
				oViewElemProperties.searchFieldWidth = "30%";
				oViewElemProperties.catalogTitleVisible = true;
			}
			this._oViewProperties = new sap.ui.model.json.JSONModel(oViewElemProperties);
			this._oView.setModel(this._oViewProperties, "viewProperties");
		},

		onNavBack: function() {
			window.history.go(-1);
		},

		// --- List Handling

		// Handler method for the table search.
		onSearchPressed: function() {
			var sValue = this.byId("searchField").getValue();
			var oFilter = new sap.ui.model.Filter("SalesOrderID",
				sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = this.byId("catalogTable").getBinding("items");
			oBinding.filter([oFilter]);
		},

		// --- Navigation
		onLineItemPressed: function(oEvent) {
			this._oRouter.navTo("Details", {
				from: "main",
				entity: oEvent.getSource().getBindingContext().getPath().substr(1),
				tab: null
			});
		},

		addSalesOrder: function() {
			console.log("in addSalesOrder");
			this._oRouter.navTo("CreateSalesOrder");
		},
		
		_onRoutePatternMatched: function(oEvent) {
			if (oEvent.getParameter("name") !== "main") {
				return;
			}

			this.getView().getModel().refresh();
		}
	});
});