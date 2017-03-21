(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);
        
    function FlickrService($http) {
        var key = 'd888c5a46e94751fa99d3e55643bb32c';
        var secret = '41036f4c07f310d9';
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT"
        var api={
            searchPhotos:searchPhotos
        };

        return api;
            function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
