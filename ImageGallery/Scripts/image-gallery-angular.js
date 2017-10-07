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
        $scope.showLoading = true;

        $http.get('/Home/Index', { params: { offset: offset } }).then(function (response) {
            $scope.images = response.data;
            $scope.showLoading = false;
        }, function (error) {
            console.log('/Home/Index return error');
            $scope.showLoading = false;
        });
    };

    var updatePrevButton = function () {
        $scope.prevButtonClass = (offset == 0) ? 'no-link' : '';
    };

    var updateNextButton = function () {
        $http.get('/Home/CountOfImages').then(function (response) {
            var imageCount = response.data;
            $scope.nextButtonClass = (offset + imagePerPage >= imageCount) ? 'no-link' : '';
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
    $scope.showLoading = false;
    $scope.prevButtonOnClick = prevButtonOnClick;
    $scope.nextButtonOnClick = nextButtonOnClick;

    getImages();
    updatePrevNextButton();
});
