$('document').ready(function () {

  $('#hero').addClass('load');

  //  fade footer on scroll
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();

    $('footer').css({
      'opacity': 1 - scrollTop / 350
    });
  });

});
