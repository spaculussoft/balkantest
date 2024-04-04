document.addEventListener("click", function (e) {
  // Hamburger menu
  if (e.target.classList.contains("hamburger-toggle")) {
    e.target.children[0].classList.toggle("active");
  }
});

$(document).ready(function () {
  // $(".regular").slick({
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 3,
  // });
});

(function () {
  // "use strict";

  // var wind = $(window);

  // Burger Menu
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
  // Document on load.
  $(function () {
    burgerMenu();
    mobileMenuOutsideClick();
  });
})();
