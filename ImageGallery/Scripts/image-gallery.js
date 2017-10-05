var offset = 0;
var imagePerPage = 4;

$(document).ready(function () {
    if (!$("#prev").parent().hasClass("no-link"))
        $("#prev").click(prevButtonOnClick);

    if (!$("#next").parent().hasClass("no-link"))
        $("#next").click(nextButtonOnClick);
});

function getImages() {
    $.ajax({
        type: "GET",
        url: "/Home/Index",
        data: { offset: offset },
        dataType: "json",
        success: function (images) {
            $("img.gallery-image").each(function (index) {
                var imageSrc;
                if (images[index] != undefined) {
                    imageSrc = "/Images/" + images[index].FileName;
                } else {
                    imageSrc = "";
                }
                $(this).prop("src", imageSrc);
                $(this).parent().prop("href", imageSrc);
            });
        }
    });
}

function prevButtonOnClick(e) {
    e.preventDefault();

    offset -= imagePerPage;
    if (offset < 0)
        offset = 0;
    getImages();

    updatePrevNextButton();
    return false;
}

function nextButtonOnClick(e) {
    e.preventDefault();

    offset += imagePerPage;
    getImages();

    updatePrevNextButton();
    return false;
}

function updatePrevButton()
{
    if (offset == 0) {
        $("#prev").parent().addClass("no-link");
        $("#prev").unbind("click");
    } else if ($("#prev").parent().hasClass("no-link")) {
        $("#prev").parent().removeClass("no-link");
        $("#prev").click(prevButtonOnClick);
    }
}

function updateNextButton() {
    $.ajax({
        type: "GET",
        url: "/Home/CountOfImages",
        dataType: "json",
        success: function (count) {
            if (offset + imagePerPage >= count) {
                $("#next").parent().addClass("no-link");
                $("#next").unbind("click");
            } else if ($("#next").parent().hasClass("no-link")) {
                $("#next").parent().removeClass("no-link");
                $("#next").click(nextButtonOnClick);
            }
        }
    });
}

function updatePrevNextButton() {
    updatePrevButton();
    updateNextButton();
}