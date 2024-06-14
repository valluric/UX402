sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("student00.com.sap.training.ux402.mockdata.ux402mockdata.controller.SalesOrders", {
            onInit: function () {

                var oRouter = this.getRouter();
                oRouter.getRoute("salesorders").attachMatched(this._onObjectMatched, this);

			},

            

            getRouter: function() {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },

            _onObjectMatched: function(oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                this._sCustomerId = oArgs.customerid;
                var oView = this.getView();
                
                oView.bindElement({
                    path: "/BusinessPartnerSet('" + this._sCustomerId + "')",
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function() {
                            oView.setBusy(true);
                        },
                        dataReceived: function() {
                            oView.setBusy(false);
                        }      
                    }

                });                 
            },

            _onBindingChange: function() {
                var oElementBinding;

                oElementBinding = this.getView().getElementBinding();

                // No data for the binding 
                if (oElementBinding && !oElementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("notFound");
                }
            },

            onNavBack: function() {
                var oHistory, sPreviousHash;
                
                oHistory = sap.ui.core.routing.History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("overview", true /*no history*/);
                }
                
            }
        });
    });
