angular.module("vehicleApp")
    .controller("editServiceCtrl", ($scope, $routeParams, $location, vehicleService) => {

        var id = $routeParams.id;
        $scope.currentService = null;

        $scope.updateServiceMsg = "";
        if (id == null) {
            $scope.errorMsg = "Service id not available.";
            $location.path("/vehicle");
        }
        vehicleService.getServiceByID("/VehicleWithService/GetServiceById/" + id, null)
            .then(r => {
                $scope.currentService = r.data;
                //console.log(r.data);
            }, err => {
                console.log(err);
            });
        $scope.ServiceEditDone = (frm) => {
            vehicleService.put("/VehicleWithService/UpdateService/" + id, $scope.currentService, null)
                .then(r => {
                    //console.log(r);
                    $scope.$emit('serviceUpdated', $scope.currentService);
                    $scope.updateServiceMsg = "Data updated."
                    $scope.currentService = {};
                    frm.$setPristine();
                    // $location.path("/companies");
                }, err => {
                    console.log(err);
                });
        }
    });