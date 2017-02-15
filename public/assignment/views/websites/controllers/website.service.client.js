(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService)
    function WebsiteService() {
        var websites=[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api={
            "findWebsiteByUser":findWebsiteByUser,
            "findWebsiteById":findWebsiteById,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;


        function findWebsiteByUser(userId) {
            var site=[];
            for (var w in websites){
                if (websites[w].developerId===userId){

                    site.push(websites[w]);
                }
            }
            return site
        }
        
        function findWebsiteById(wesiteId) {
            for (var w in websites){
                if (websites[w]._id===wesiteId){
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }
        
        function createWebsite(userId,website) {
            var id=(new Date()).getTime();
            websites.push({"developerId":userId.toString(),"name":website.name,
                "description":website.description,"_id":id})
        }

        function updateWebsite(websiteId,website) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites[w].name= website.name;
                    websites[w].description=website.description;
                }
            }
        }
        
        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                }
            }
        }
    }
})();
