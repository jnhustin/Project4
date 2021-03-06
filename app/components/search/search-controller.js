angular
.module('Animoo')
.controller('SearchCtrl', [
  '$scope'
, 'AnimeAPIFactory'
, function($scope, AnimeAPIFactory) {
    
    // PUBLIC VARS AND FUNCTIONS
    $scope.searchTerm;
    $scope.searchResults;
    $scope.loadingBar = false;
    
    // Auto API call on any changes
    $scope.$watch('searchTerm', function(newObj, oldObj) {
      if ($scope.searchTerm == undefined || $scope.searchTerm == '') {
        return;
      }
      $scope.loadingBar = true;
      
      // API call
      AnimeAPIFactory.searchForAnime($scope.searchTerm)
      .then(function(res) {
        $scope.searchResults = res.data;
        $scope.loadingBar = false;
        
        // Message if no results from search
        if (res.data.error) {
          Materialize.toast(res.data.error.messages[0], 10000);
          return;
        }
      })
      .catch(function(err) {
        $scope.loadingBar = false;
        Materialize.toast('Sorry, there was an error. \
          Reload the page or try again later', 10000);
      });
    });

  }
])