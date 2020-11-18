angular.module("vehicleApp")
    .controller("createVehicleCtrl", ($scope, vehicleService) => {
        $scope.activeTab = 0;
        $scope.vehicleInsertMsg = "";
        $scope.currentVehicle = {};
        $scope.currentService = {};
        $scope.ServiceRecord = [];
        //date
        $scope.popup1 = {
            opened: false,
        };
        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        //
        $scope.vehicleDone = () => {
            $scope.activeTab = 1;
        };
        $scope.serviceDone = function (frm) {
            $scope.ServiceRecord.push($scope.currentService);

            $scope.currentService = {};
            frm.$setPristine();

            //console.log($scope.CarParts);
        };
        $scope.serDel = (index) => {
            $scope.ServiceRecord.splice(index, 1);
        };
        $scope.serPre = () => {
            $scope.activeTab = 0;
        };
        $scope.saveAll = (frms) => {
            $scope.currentVehicle.ServiceRecord = $scope.ServiceRecord;
            vehicleService.post("/VehicleWithService/Insert", $scope.currentVehicle, null)
                .then(r => {
                    $scope.carInsertMsg = "Data inserted successfully."
                    $scope.$emit('vehicleInserted', r.data);
                    $scope.currentVehicle = {};
                    $scope.currentService = {};
                    $scope.ServiceRecord = [];
                    $scope.activeTab = 0;
                    frms[0].$setPristine();
                    frms[1].$setPristine();
                    //console.log(frms);
                    //console.log(r.data);
                }, err => {
                    console.log(err);
                });
        };


    });