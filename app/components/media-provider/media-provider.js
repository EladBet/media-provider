angular.module("media-provider", ['ngAnimate', 'ui.bootstrap' ])
    .directive("mediaProvider", [ function() {
        return {
            restrict: 'AE',
            scope: {
            },
            templateUrl : "app/components/media-provider/media-provider.html",
            controller: 'MediaProviderCtrl',
            controllerAs: 'vm',
            bindToController: true
        };
    }])

    //controller
    .controller("MediaProviderCtrl", [ '$scope', '$filter', '$http', '$sce', function ($scope, $filter, $http, $sce) {
        var vm = this;
        vm.videos = [];


        //init();
        ///
        //AIzaSyDTUo1rZ5yO1k4t6AmLFUKejSmlb3i5AGs

        function init(){
            var url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=tuto&type=video&key=AIzaSyDTUo1rZ5yO1k4t6AmLFUKejSmlb3i5AGs';
            $http.get(url).then(function(res) {
                if (res.data) {
                    vm.videos = res.data.items;
                }
            }, function (reason){
                alert('error');
            });
        }

        function getIdFromURL(url){
            var youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
            return url.replace(youtubeRegexp, '$1');
        }

        vm.setSource = function(){
            var video_id  = getIdFromURL(vm.url);
            vm.src = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+video_id+'?autoplay=1');
            vm.ready = true;
        }



    }]);




    //end of controller

