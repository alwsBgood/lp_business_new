// Mobile menu events SATRT
function initMobileMenu() {
  var currentPosition = 0;

  $('.account-dropdown-btn').click(function () {
    currentPosition = $(window).scrollTop();
    $('.nav-mob').toggleClass('open');
    $('body').addClass('unscroll').css({
      top: -currentPosition
    });
  })

  $('.nav-mob .my-dropdown-menu-overlay, .nav-mob .cross-btn').click(function () {
    $('.nav-mob').removeClass('open');
    $('body').removeClass('unscroll');
    $(window).scrollTop(currentPosition);
  })

  $('.for-business-dropdown, .for-restaurants-dropdown').click(function () {
    $(this).toggleClass('open')
  })
}
// Mobile menu events END


// =======================

initMobileMenu()