var artistApp = angular.module('artistApp', ['ArtistModel', 'hmTouchevents']);


// Index: http://localhost/views/artist/index.html

artistApp.controller('IndexCtrl', function ($scope, ArtistRestangular) {

  // This will be populated with Restangular
  $scope.artists = [];
  $scope.jee = "HAH";

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/artist/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Helper function for loading artist data with spinner
  $scope.loadArtists = function() {
    $scope.loading = true;

    artists.getList().then(function(data) {
      $scope.artists = data;
      $scope.loading = false;
    });

  };

  // Fetch all objects from the backend (see app/models/artist.js)
  var artists = ArtistRestangular.all('artists');
  $scope.loadArtists();


  // Get notified when an another webview modifies the data and reload
  window.addEventListener("message", function(event) {
    // reload data on message with reload status
    if (event.data.status === "reload") {
      $scope.loadArtists();
    };
  });


  // -- Native navigation

  // Set navigation bar..
  steroids.view.navigationBar.show("Artist index");

});


// Show: http://localhost/views/artist/show.html?id=<id>

artistApp.controller('ShowCtrl', function ($scope, ArtistRestangular) {

  // Helper function for loading artist data with spinner
  $scope.loadArtist = function() {
    $scope.loading = true;

     artist.get().then(function(data) {
       $scope.artist = data;
       $scope.loading = false;
    });

  };

  var artist = ArtistRestangular.one("artists", steroids.view.params.id);
  $scope.loadArtist()

  // When the data is modified in the edit.html, get notified and update (edit is on top of this view)
  window.addEventListener("message", function(event) {
    if (event.data.status === "reload") {
      $scope.loadArtist()
    };
  });

  // -- Native navigation
  steroids.view.navigationBar.show("Artist: " + steroids.view.params.id );

});
