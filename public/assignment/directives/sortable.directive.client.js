(function () {
    angular
        .module("WebAppMaker")
        .directive("wbdvSortable", sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes,sortingController) {
            element.sortable({
                start: function (event,ui) {
                    ui.item.startPos = ui.item.index();
                },
                update: function (event,ui) {
                  var startIndex = ui.item.startPos;
                  var endIndex = ui.item.index();
                  sortingController.widgetSort(startIndex,endIndex);
                },
                axis:"y",
                handle: ".handle",
                cursor:"move"
            });
        }
        return{
            link: linkFunc,
            controller: sortableWidgetsController
        }
    }

    function sortableWidgetsController(WidgetService, $routeParams) {
        var vm = this;
        vm.widgetSort = widgetSort;

        function widgetSort(start, end) {
            var pageId = $routeParams.pid;
            WidgetService
                .updateOrder(pageId, start, end)
                .success(function (response) {

                })
                .error(function () {

                });
        }
    }

})();