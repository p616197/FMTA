sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("com.ns.emp.EmployeeUI.controller.Main", {
            
			onInit: function () {
                // console.log('Siva test 2');
                // var that = this;
                // // @ts-ignore
                // $.ajax({
                //     url: "/comnsempEmployeeUI/Northwind_Dest/V3/Northwind/Northwind.svc/Suppliers?$format=json",
                //     method: "GET",
                //     async: false,
                //     success: function (result, xhr, data) {
                //         var supplierData = data.responseJSON.value;
                //         var existingData = that.getView().getModel();
                //         that.getView().setModel(existingData);
                //     }
                // });
            },
            
            // @ts-ignore
            onStartPress: function (oEvent) {
                console.log("Siva 2");
                var startContext = {
                    "FirstName": "test",
                    "LastName": "test",
                    "Country": "test",
                    "HireDate": "test",
                    "JobTitle": "test",
                    "Relocation": "test",
                    "Equipment": "test"
                };
                //onboard is the actual workflow name
                var workflowStartPayload = {definitionId: "onboard", context: startContext}

                // Start workflow 
                // @ts-ignore
                $.ajax({
                    url: "/comnsempEmployeeUI/bpmworkflowruntime/v1/xsrf-token",
                    method: "GET",
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    // @ts-ignore
                    success: function (result, xhr, data) {
                        var token = data.getResponseHeader("X-CSRF-Token");
                        if (token === null) return;
 
                        // Start workflow 
                        // @ts-ignore
                        $.ajax({
                            url: "/comnsempEmployeeUI/bpmworkflowruntime/v1/workflow-instances",
                            type: "POST",
                            data: JSON.stringify(workflowStartPayload),
                             headers: {
                                "X-CSRF-Token": token,
                                "Content-Type": "application/json"
                            },
                            async: false,
                            // @ts-ignore
                            success: function (data) {
                                sap.m.MessageBox.information("The workflow is started");
                            },
                            // @ts-ignore
                            error: function (data) {
                                sap.m.MessageBox.information("The workflow is in error");
                            }
                        });
                    }
                });
            }
		});
	});
