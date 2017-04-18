/**
 * Created by tejag on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController",PageEditController)

        function PageEditController(PageService,$routeParams,$location) {
            var vm=this
            vm.userId=$routeParams.uid;
            vm.pageId=$routeParams.pid;
            vm.websiteId=$routeParams.wid;
            vm.deletePage=deletePage;
            vm.updatePage=updatePage;
            function init(){
                PageService
                    .findPageByWebsiteId(vm.websiteId)
                    .success(function (pages) {
                        vm.pages = pages;
                    });
                PageService
                    .findPageById(vm.pageId)
                    .success(function (page) {
                        vm.page=page;
                    })
            }

            init();

            function deletePage() {
                if(vm.page && vm.page.name){

                    PageService
                        .deletePage(vm.pageId,vm.websiteId)
                        .success(function () {
                            $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page")
                        })
                }
            }
            
            function updatePage() {
                if(vm.page && vm.page.name){
                    PageService
                        .updatePage(vm.pageId,vm.page)
                        .success(function () {
                            $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page")
                        })
                }

            }
        }
})();