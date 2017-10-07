$(document).ready(function () {

    var imageGalleryModule = (function () {

        var offset = 0;
        var imagePerPage = 4;
        var loader = $('<div />', { class: 'loader' });

        var getImages = function () {
            $.ajax({
                type: 'GET',
                url: '/Home/Index',
                data: { offset: offset },
                dataType: 'json',
                beforeSend: function () {
                    $('#image-gallery').append(loader);
                },
                success: function (images) {
                    $('img.gallery-image').each(function (index) {
                        var imageSrc;
                        if (images[index] != undefined) {
                            imageSrc = '/Images/' + images[index].FileName;
                        } else {
                            imageSrc = '';
                        }
                        $(this).prop('src', imageSrc);
                        $(this).parent().prop('href', imageSrc);
                    });
                    $('#image-gallery').find(loader).remove();
                }
            });
        };

        var prevButtonOnClick = function (e) {
            e.preventDefault();

            offset -= imagePerPage;
            if (offset < 0)
                offset = 0;
            getImages();

            updatePrevNextButton();
        };

        var nextButtonOnClick = function (e) {
            e.preventDefault();

            offset += imagePerPage;
            getImages();

            updatePrevNextButton();
        };

        var updatePrevButton = function () {
            $('#prev').prop('href', '/?offset=' + (offset - imagePerPage));  //надо ли?

            var prevButton = $('#prev');
            if (offset == 0) {
                prevButton.addClass('no-link');
            } else if (prevButton.hasClass('no-link')) {
                prevButton.removeClass('no-link');
            }
        };

        var updateNextButton = function () {
            $('#next').prop('href', '/?offset=' + (offset + imagePerPage));  //надо ли?

            $.ajax({
                type: 'GET',
                url: '/Home/CountOfImages',
                dataType: 'json',
                success: function (count) {
                    var nextButton = $('#next');
                    if (offset + imagePerPage >= count) {
                        nextButton.addClass('no-link');
                    } else if (nextButton.hasClass('no-link')) {
                        nextButton.removeClass('no-link');
                    }
                }
            });
        };

        var updatePrevNextButton = function () {
            updatePrevButton();
            updateNextButton();
        };

        return {

            initPaginationButtons: function () {
                $('#prev').click(prevButtonOnClick);
                $('#next').click(nextButtonOnClick);
            },

        };
    })();

    imageGalleryModule.initPaginationButtons();
});
