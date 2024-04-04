import $ from "jquery";

var burgerMenu = function () {
    $(".menu-toggle").on("click", function (event) {
        event.preventDefault();
        var $this = $(this);
        if ($("body").hasClass("offcanvasTheme")) {
            $this.removeClass("active");
            $("body").removeClass("offcanvasTheme");
        } else {
            $this.addClass("active");
            $("body").addClass("offcanvasTheme");
        }
    });
};


// Click outside of offcanvasTheme
var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
        var container = $("#asidePage, .menu-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($("body").hasClass("offcanvasTheme")) {
                $("body").removeClass("offcanvasTheme");
                $(".menu-toggle").removeClass("active");
            }
        }
    });
    $(window).scroll(function () {
        if ($("body").hasClass("offcanvasTheme")) {
            $("body").removeClass("offcanvasTheme");
            $(".menu-toggle").removeClass("active");
        }
    });
};

export { burgerMenu, mobileMenuOutsideClick };