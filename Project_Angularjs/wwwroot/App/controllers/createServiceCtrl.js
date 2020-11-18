angular.module("vehicleApp")
    .controller("createServiceCtrl", ($scope, vehicleService) => {
        $scope.currentServiceSingle = null;
        $scope.newServiceMsg = "";
        $scope.ServiceCreateDone = (frm) => {
            vehicleService.post("VehicleWithService/InsertService", $scope.currentServiceSingle, null)
                .then(r => {
                    console.log(r);
                    $scope.$emit('serviceInserted', r.data);
                    $scope.currentServiceSingle = {};
                    // $location.path("/companies");
                    $scope.newServiceMsg = "Data inserted";
                    frm.$setPristine();
                }, err => {
                    console.log(err);
                });
        }
    });