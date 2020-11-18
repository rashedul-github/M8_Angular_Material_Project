angular.module("vehicleApp")
    .factory("vehicleService", ($http) => {
        return {
            getVehicleWithService: () => {
                return $http({
                    method: "GET",
                    url: "/VehicleWithService/VehicleWithService",
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
            },
            getById: (url, data, headers) => {
                return $http({
                    method: "GET",
                    url: url,
                    data: data,
                    headers: headers
                });
            },
            post: (url, data, headers) => {
                return $http({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: headers
                });
            },
            put: (url, data, headers) => {
                return $http({
                    method: "PUT",
                    url: url,
                    data: data,
                    headers: headers
                });
            },
            delete: (url, headers) => {
                return $http({
                    method: "DELETE",
                    url: url,
                    headers: headers
                });
            },
            getVehicle: (url, data, headers) => {
                return $http({
                    method: "GET",
                    url: url,
                    data: data,
                    headers: headers
                });
            },
            getServiceByID: (url, data, headers) => {
                return $http({
                    method: "GET",
                    url: url,
                    data: data,
                    headers: headers
                });
            }
        }
    });