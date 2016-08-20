angular.module("media-provider", ['ngAnimate', 'media-config' ])
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
    .controller("MediaProviderCtrl", [ '$scope', '$filter', '$http', '$sce', 'mediaConfig', 'Reducer', function ($scope, $filter, $http, $sce, mediaConfig, Reducer) {
        var vm = this;
        vm.videos = [];
        vm.resources = mediaConfig;
        vm.selectedResource = vm.resources[0];
        vm.mode = "link";


        $scope.$watch("vm.mode", function(newValue, old){
            if (newValue !== old)
                vm.videos = [];
                vm.url = "";
        });

        //Extract id from url
        function getIdFromURL(url){
            var regexp = vm.selectedResource.regex;
            return url.replace(regexp, '$1');
        }


        vm.setSource = function(){
            if (vm.mode === 'link') {
                var video_id = getIdFromURL(vm.url);
                vm.src = $sce.trustAsResourceUrl(vm.selectedResource.embedUrl + video_id);
                vm.ready = true;
            }
            else{//search
                var url = vm.selectedResource.searchUrl + vm.url + '&key=' + vm.selectedResource.key;
                $http.get(url).then(function(res) {
                    if (res.data) {
                        vm.videos = Reducer.getVideos(vm.selectedResource.name, res.data.items);
                    }
                }, function (reason){
                    alert('error');
                });
            }
        };

        //embed video that was selected from the search result
        vm.loadSelected = function(video_id){
            vm.src = $sce.trustAsResourceUrl(vm.selectedResource.embedUrl + video_id);
            vm.ready = true;
        };


    }])
    .service('Reducer', function(){

        function Video(id, title, image){
            this.id = id;
            this.title = title;
            this.image = image;
        }

        return {
            getVideos: function(resourceName ,items){
                var res = [];
                switch (resourceName){
                    case "YouTube":
                        for (var i=0; i<items.length; i++){
                            var video = new Video(items[i].id.videoId, items[i].snippet.title, items[i].snippet.thumbnails.default.url);
                            res.push(video);
                        }
                        break;
                }

                return res;
            }
        }
    })
;




    //end of controller

