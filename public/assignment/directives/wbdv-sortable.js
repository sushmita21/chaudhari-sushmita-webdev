/**
 * Created by ch_su_000 on 05/06/2017.
 */
(function()
{
    angular.module('WebAppMaker')
        .directive('wbdvSortable',wbdvSortable);
    function wbdvSortable() {
        function linkfunc(scope, element, attributes, controller)
        {
            element.sortable({
                start: function (event, li) {
                    li.item.startPos = li.item.index();


                },
                update: function (event, li) {
                    var startIndex = li.item.startPos;
                    var endIndex = li.item.index();
                    controller.widgetFunc(startIndex, endIndex);
                },
                axis: 'y',
                cursor:"move",
                handle: "some-style"

                });
        }
        return{
            link:linkfunc,
            controller:widgetSortableController
        }
        
    }
    function widgetSortableController(WidgetService, $routeParams) {
        var model = this;
        model.widgetFunc = widgetFunc;
        
        function widgetFunc(startPos, endPos) {
            var pageId = $routeParams.pageId;
            WidgetService.sortWidget(pageId, startPos, endPos)
                .then(function () {
                },
                function () {
                })
            
        }
    }
})();