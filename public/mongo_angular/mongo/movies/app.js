/**
 * Created by tejag on 3/11/2017.
 */

(function () {
    angular
        .module("MusicApp",[])
        .controller("MusicController",MusicController)

    function MusicController($http) {
        var vm=this;
        vm.createMusic = createMusic;

        function createMusic(music) {
            $http.post('/api/database/mongo/movies/',music)
        }
    }
})();