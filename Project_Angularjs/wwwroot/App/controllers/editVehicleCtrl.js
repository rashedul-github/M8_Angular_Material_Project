angular.module("vehicleApp")
    .controller("editVehicleCtrl", ($scope, $routeParams, vehicleService) => {
        var id = $routeParams.id;
        $scope.vehicleToEdit = {};
        $scope.newVehicle = {};
        $scope.newService = {};
        $scope.newServiceModal = {};
        //date
        $scope.popup2 = {
            opened: false,
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        //
        vehicleService.getById("/VehicleWithService/GetVehicleById/" + id)
            .then(r => {
                $scope.vehicleToEdit = r.data;
                r.data.MakeDate = new Date(r.data.MakeDate);
            }, err => {
                console.log(err);
            });
        $scope.delService = (index) => {
            $scope.vehicleToEdit.ServiceRecord.splice(index, 1);

        }

        $scope.editDone = (frm) => {
            vehicleService.put("/VehicleWithService/Update/" + $scope.vehicleToEdit.VehicleId, $scope.vehicleToEdit, null)
                .then(r => {
                    //console.log(r);
                    $scope.$emit("vehicleUpdated", $scope.vehicleToEdit);
                    $scope.vehicleEditMsg = "Data updated successfuly.";
                    //console.log($scope.vehicleToEdit);
                    $scope.vehicleToEdit = {};
                    frm.$setPristine();
                }, err => {
                    console.log(err);
                })
        }
        //modal service
        $scope.openAddServiceDialog = function () {
            //console.log($scope.companyToEdit.CompanyId)
            $("#addServiceModal").modal('show');
        }
        $scope.AddServiceModal = (frm) => {
            //console.log(frm);
            $scope.newServiceModal.VehicleId = $scope.vehicleToEdit.VehicleId;
            $scope.vehicleToEdit.ServiceRecord.push($scope.newServiceModal);
            frm.$setPristine();
            $scope.newServiceModal = {};
            $("#addServiceModal").modal('hide');
        }


    });