(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: 'LogModel'
             })

            .when('/register',{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'Model'

            })

            // .when('/user',{
            //     templateUrl : 'views/user/templates/profile.view.client.html',
            //     controller : 'ProfileController',
            //     controllerAs: 'ProfileModel',
            //     resolve: {loggedin: checkLoggedin}
            // })

            .when('/user',{
                templateUrl:'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'ProfileModel',
                resolve: {checkLoggedin: checkLoggedin}
            })
            .when('/user/website',{
                templateUrl:'views/websites/templates/website-list.view.client.html',
                controller: 'WebsiteController',
                controllerAs:'Model'
            })
            .when('/user/website/new',{
                templateUrl: 'views/websites/templates/website-new.view.client.html',
                controller: 'WebsiteNewController',
                controllerAs:'Model'
            })
            .when('/user/website/:wid',{
                templateUrl: 'views/websites/templates/website-edit.view.client.html',
                controller: 'WebsiteEditController',
                controllerAs: 'Model'
            })

            .when('/user/:uid/website/:wid/page',{
                templateUrl: 'views/pages/templates/page-list.view.client.html',
                controller: 'PageController',
                controllerAs: 'Model'
            })
            .when('/user/:uid/website/:wid/page/new',{
                templateUrl:'views/pages/templates/page-new.view.client.html',
                controller: 'PageNewController',
                controllerAs: 'Model'
            })
            .when('/user/:uid/website/:wid/page/:pid',{
                templateUrl: 'views/pages/templates/page-edit.view.client.html',
                controller: 'PageEditController',
                controllerAs: 'Model'
            })

            .when('/user/:uid/website/:wid/page/:pid/widget',{
                templateUrl:'views/widgets/templates/widget-list.view.client.html',
                controller:'WidgetController',
                controllerAs:'Model'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new',{
                templateUrl:'views/widgets/templates/widget-chooser.view.client.html',
                controller:'WidgetNewController',
                controllerAs:'Model'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid',{
                templateUrl:'views/widgets/templates/widget-edit.view.client.html',
                controller:'WidgetEditController',
                controllerAs:'Model'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr',{
                templateUrl:'views/widgets/templates/editors/widget-flickr-search.view.client.html',
                controller:'FlickrImageSearchController',
                controllerAs: 'model'
            })

            .otherwise({templateUrl : "views/user/templates/login.view.client.html"});

        function checkLoggedin($q, $timeout, LoginService, $location, $rootScope) {
            var deferred = $q.defer();
            LoginService
                .checkLogin()
                .success(function(user) {
                    $rootScope.errorMessage = null;
                    if (user != '0') {
                        $rootScope.currentUser = user;
                        deferred.resolve(user);
                    } else {
                        deferred.reject();
                        $location.url('/login');
                    }
            });
            return deferred.promise;
        };
    }


})();