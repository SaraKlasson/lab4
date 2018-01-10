/* Controller to handle guests */

var app = angular.module('guestsApp', []);

app.controller('guestsCtrl', function ($scope, $http) { // Controller


// Handle sort orders //////////////////////////

    $scope.orderByMe = function (guests) { // Sort list after the clicked category
        $scope.myOrderBy = guests;
    }

    $scope.toggleOrder = function () { // Toggle ascending/descending by toggle click, orderVarable changes between false and true
        $scope.orderVariable = !$scope.orderVariable
    }

// Get all guests for read //////////////////////

function getGuests() {
$http.get("/api/guests")
.success(function (response) {
    console.log(response);
    $scope.guestscope = response;
})
};

getGuests();


// Delete all guests //////////////////////

$scope.removeAll = function () {
    $http.delete('api/guests/delete/')
    .success(function (response) {
    })
    // Read list again
    getGuests();
}
    
 
// Add room ////////////////////////////////////

    $scope.addGuest = function (name, note) { // click event
        var data = { name: name, 
                    note: note }; // fetch what to add
      
        console.log(data);
 if(name == undefined ){ // Don't save if no description
    $scope.msg = "Gästnamn saknas.";
    
 } else {
        //Call the services
        $http.post('/api/guests/add', JSON.stringify(data)).then(function (response) {

            if (response.data)
                $scope.msg = "Gäst tillagd!";
                // Read list again
                getGuests();
                

        }, function (response) {
            $scope.msg = "Sparningen misslyckades.";
            
        });
    }

    };


// Change status of guest (guest has payed or arrived) ///////////////////////

    $scope.checkGuest = function (id, status) { // click event
        var data = { // data to send
            status: status
        }
        console.log(data);
        $http.put('/api/guests/check/' + id, JSON.stringify(data)).then(function (response) {

            if (response.data)
                $scope.msg = "Gäst avbockad!";

        }, function (response) {
            $scope.msg = "Avbockningen misslyckades.";
        });
    };


 // Delete guest by id /////////////////////////
    $scope.remove = function (id) {
        console.log(id)
        $http.delete('api/guests/delete/' + id).success(function (response) {
        })
        // Read list again
        getGuests();
    }

});    // End controller