angular.module('imageGalleryAngular', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }])
    .controller('ImageGalleryCtrl', function ($scope, $http) {
    //local varibles
    var offset = 0;
    var imagePerPage = 4;
    var loader = $('<div />', { class: 'loader' });

    //functions
    var getImages = function () {
        $http.get('/Home/Index', { params: { offset: offset } }).then(function (response) {
            $scope.images = response.data;
        }, function (error) {
            console.log('/Home/Index return error');
        });
    };

    var updatePrevButton = function () {
        //$('#prev').prop('href', '/?offset=' + (offset - imagePerPage));  //надо ли?

        if (offset == 0) {
            $scope.prevButtonClass = 'no-link';
        } else {
            $scope.prevButtonClass = '';
        }
    };

    var updateNextButton = function () {
        //$('#next').prop('href', '/?offset=' + (offset + imagePerPage));  //надо ли?

        $http.get('/Home/CountOfImages').then(function (response) {
            var imageCount = response.data;

            if (offset + imagePerPage >= imageCount) {
                $scope.nextButtonClass = 'no-link';
            } else {
                $scope.nextButtonClass = '';
            }
        }, function (error) {
            console.log('/Home/CountOfImages return error');
        });
    };

    var updatePrevNextButton = function () {
        updatePrevButton();
        updateNextButton();
    };

    var prevButtonOnClick = function (e) {
        //e.preventDefault();

        offset -= imagePerPage;
        if (offset < 0)
            offset = 0;
        getImages();

        updatePrevNextButton();
    };

    var nextButtonOnClick = function (e) {
        //e.preventDefault();

        offset += imagePerPage;
        getImages();

        updatePrevNextButton();
    };
    //end functions

    //scope varibles
    $scope.images;
    $scope.prevButtonClass;
    $scope.nextButtonClass;
    $scope.prevButtonOnClick = prevButtonOnClick;
    $scope.nextButtonOnClick = nextButtonOnClick;

    getImages();
    updatePrevNextButton();
});
