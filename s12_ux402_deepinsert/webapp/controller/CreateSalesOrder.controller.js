sap.ui.define([
	"com/sap/training/ux402/deepinsert/ux402_deepinsert/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("com.sap.training.ux402.deepinsert.ux402_deepinsert.controller.CreateSalesOrder", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		onInit: function() {
			this.getRouter().getRoute("CreateSalesOrder").attachPatternMatched(this._onRoutePatternMatched, this);			
		},
		_onRoutePatternMatched : function(oEvent) {
			this._setupAddModel();
		},
		_setupAddModel :  function() {
			var date = new Date();
			date.setDate(date.getDate() + 7);
			var AMD = {
				"CustomerID": "100000000",
				"CustomerName": "SAP",
				"Note": "",
				"CurrencyCode": "USD",
				"ToLineItems": []

            };
            var product = {
                "addProductID" : "",
                "addNote" : "",
                "addQuantity" : ""				
            };
			this.createModel = new sap.ui.model.json.JSONModel(AMD);
            this.productModel = new sap.ui.model.json.JSONModel(product);
			this.getView().setModel(this.createModel, "createCollection");
            this.getView().setModel(this.productModel, "product");
			this.nextLI = 10;
		},

		addSalesOrderLI: function() {
                       
			// associate controller with the fragment			
			if (!this.oAddDialog) {
				this.oAddDialog = sap.ui.xmlfragment("com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateLIDialog",this);
				this.getView().addDependent(this.oAddDialog);

				// toggle compact style
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.oAddDialog);
			} else {				
                this.getView().getModel("product").setProperty("/addProductId", "");
                this.getView().getModel("product").setProperty("/addNote", "");
                this.getView().getModel("product").setProperty("/addQuantity", "");
	
			}
			this.oAddDialog.open();
		},

		handleOK: function() {
			var prodID = this.getView().getModel("product").getProperty("/addProductId");
            var note = this.getView().getModel("product").getProperty("/addNote");
            var qty = this.getView().getModel("product").getProperty("/addQuantity");
			var date = new Date();
			date.setDate(date.getDate() + 7);

			var newLI = {
				ProductID: prodID,
				Quantity: qty,
				QuantityUnit: "EA",
				ItemPosition: this.nextLI.toString(),
				Note: note,
				CurrencyCode: "USD",
				DeliveryDate: date
			};

			this.nextLI = this.nextLI + 10;
			this.getView().getModel("createCollection").getData().ToLineItems.push(newLI);
			this.getView().getModel("createCollection").updateBindings();
			console.log("in handelOK " + prodID + "  " + note);
			this.oAddDialog.close();
		},

		handleCancel: function() {
			console.log("in handelCancel");
			this.oAddDialog.close();
		},

		//Implement function _showSOCreatedSuccess
		_showSOCreatedSuccess: function(oData, oResponse) {                     
            var oResourceModel = this.getOwnerComponent().getModel("i18n");
            var sMessage = oResourceModel.getResourceBundle().getText("SalesOrderCreated", [oData.SalesOrderID]);
            
            MessageBox.show(sMessage,{
                icon: MessageBox.Icon.SUCCESS,
                title: oResourceModel.getProperty("sucTitle"),
                actions: [MessageBox.Action.OK],
                onClose: function (oAction) {
                    this.getOwnerComponent().getRouter().navTo("main", {}, true);                    
                }.bind(this)}                
                                                              
                                
            );
        },

		
		//Implement function _showSOCreatedError
		_showSOCreatedError: function(oError) {
            try {
                var oMessage = JSON.parse(oError.responseText);
                MessageToast.show(oMessage.error.message.value);                     
            } catch(err) {
                MessageToast.show(oError.responseText);               
            }    
        },          
		
		onSOSave: function() {
			var oDate = new Date();
            oDate.setDate(oDate.getDate() + 7);
            var sSOData = this.getView().getModel("createCollection").getData();
            sSOData.CustomerID = this._pad(sSOData.CustomerID, 10);
          
			for(let i = 0; i < sSOData.ToLineItems.length; i++ ) {
				let oLineData = sSOData.ToLineItems[i];
				oLineData.DeliveryDate = oDate;
				oLineData.ItemPosition = this._padLeadingZeros(oLineData.ItemPosition, 10).toString();                                                
			}

            var oModel = this.getOwnerComponent().getModel();
            oModel.create("/SalesOrderSet", sSOData, {
                success: $.proxy(this._showSOCreatedSuccess, this),
                error: this._showSOCreatedError,
                changeSetId: "CreateSO"                                 
            })                                     
        },

		onSOCancel: function() {
			window.history.go(-1);
        },
        
		onNavBack: function() {
			window.history.go(-1);
        },
        
		_pad: function(n, width, z) {
			z = z || '0';
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		},

		_padLeadingZeros : function(n, size) {
			let s = n + '';
			while (s.length < size) s = "0" + s;
			return s;
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.training.ux402.deepinsert.ux402_deepinsert.view.CreateSalesOrder
		 */
		//	onExit: function() {
		//
		//	}

	});
});