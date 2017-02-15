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
                vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
                vm.page=PageService.findPageById(vm.pageId)
            }

            init();

            function deletePage() {
                PageService.deletePage(vm.pageId)
                $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page")
            }
            
            function updatePage() {
                PageService.updatePage(vm.pageId,vm.page)
                $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page")
            }
        }
})();