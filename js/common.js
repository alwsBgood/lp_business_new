// Form validation and send options START
function initFormHandler() {

    // Remove errors onClick
    $('.form_input_block, input').click(function() {
      $(this).removeClass('error, empty');
      $(this).parent('.form_input_block').removeClass('error')
    });

    $('input').on("input propertychange", function() {
      $(this).parent('.form_input_block').removeClass('error');
    });

    $('.item-option--other-input').click(function() {
      $('.other_field_block').parent('.form_input_block').removeClass('error')
    });

    $('.item-option').click(function() {
      $('.select_input_block').removeClass('error')
    });

    // Form validation function
    $("[type=submit]").click(function (e) {
    var btn = $(this);
    var form = $(this).closest('form');

    $(".form_input_block.error").removeClass('error');
    $(".form_input_block.empty").removeClass('empty');

    var error;
    var ref = btn.closest('form').find('[required]');


    var msg = btn.closest('form').find('[type=text], [type=tel], [type=email], [name=company_size], textarea');

    var send_adress = btn.closest('form').find('[name=send_adress]').val();

    $(ref).each(function() {
      if ($(this).val() == '') {
        var errorfield = $(this);
        $(this).parent('.form_input_block').addClass('empty')

        error = 1;
        $(":input.error:first").focus();
        return;
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ($(this).attr("type") == 'email') {
          if (!pattern.test($(this).val())) {
            // $("[name=email]").val('');
            $(this).parent('.form_input_block').addClass('error');
            error = 1;
            $(":input.error:first").focus();
          }
        }
        var patterntel = /^()[- +()0-9]{9,18}/i;
        if ($(this).attr("type") == 'tel') {
          if (!patterntel.test($(this).val())) {
            // $("[name=phone]").val('');
            $(this).parent('.form_input_block').addClass('error')
            error = 1;
            $(":input.error:first").focus();
          }
        }
        if( $('.other_field_block').hasClass('open') && $('.item-option--other-input').val() == '') {
          $('.other_field_block').parent('.form_input_block').addClass('error')
        }
      }
    });
    if (!(error === 1)) {
      $(btn).each(function() {
        $(this).attr('disabled', true);
      });

      $.ajax({
        type: 'POST',
        url: send_adress,
        dataType: 'json',
        data: msg,
        success: function(response) {
          setTimeout(function() {
            $("[name=send]").removeAttr("disabled");
          }, 1000);
          if (response.status == 'success') {
            $('form').trigger("reset");
            window.location.href = '/success/';
          }
        },
        error: function(error){
          console.log(error);
        }
      });
    }
    return false;
  })
};
// Form validation and send options END


// Mobile menu events SATRT
function initMobileMenu() {
  var currentPosition = 0;

  $('.account-dropdown-btn').click(function() {
    currentPosition =  $(window).scrollTop();
    $('.nav-mob').toggleClass('open');
    $('body').addClass('unscroll').css({
      top: -currentPosition
    });
  })

  $('.nav-mob .my-dropdown-menu-overlay, .nav-mob .cross-btn').click(function() {
    $('.nav-mob').removeClass('open');
    $('body').removeClass('unscroll');
    $(window).scrollTop(currentPosition);
  })

  $('.for-business-dropdown, .for-restaurants-dropdown').click(function() {
    $(this).toggleClass('open')
  })
}
// Mobile menu events END


// Select input logic START
function initSelect() {
  $('.select-input').click(function() {
    $('.block-item-selection').toggleClass('open')
  })

  $('.block-item-selection .item-option').click(function(event) {
    $('.block-item-selection').toggleClass('open');

    const company_size = $(event.target).data('size');

    $('.select_input-placeholder span').html(event.target.textContent);
    $('[name=company_size]').val(company_size)
    $('.other_field_block').removeClass('open');
  })

  $('.item-option_other').click(function() {
    $('.other_field_block').addClass('open');
    $('.block-item-selection').removeClass('open')
  })
}
// Select input logic END


function initScrollEvents() {
  if($(window).scrollTop() > 10) {
    $('.rest_page-header').addClass('scrolling');
  }
  // Header changes on scroll
  $(window).scroll(function() {
    if($(window).scrollTop() > 10) {
      $('.rest_page-header').addClass('scrolling');
    } else {
      $('.rest_page-header').removeClass('scrolling');
    }
  })

  // Smooth scroll to anchor
  $('.scroll').click(function(){

    $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1000);

    $(this).attr('disabled', true);

    setTimeout(function() {
      $(this).removeAttr("disabled");
    }.bind(this), 2000)
    return false;
  });
}

// ======= TEMP FOR DEV ==========
function perfectPixel() {
  $('body').each(function() {
    var body = $(this);
    var img_url = $(this).data('img');
    var img = new Image();
    img.src = img_url;
    img.onload = function(){
        var ppbox = '<div id="pp" style="background: url('+img_url+') no-repeat 50% 0%;top:-40px;width:100%;position:absolute;z-index:1000000;opacity:0.5;height:'+img.height+'px"></div>';
        var ppbtn = '<button onclick="myOff()" id="ppbtn" style="position:fixed;top:0;right:0;z-index:1000001">ON</button>'
        body.append(ppbox);
        body.append(ppbtn);
    };
  });
  function myOff() {
      var ppbtntext = $('#ppbtn').text();
      if (ppbtntext == 'ON') {
          $('#ppbtn').text('OFF');
          $('#pp').css('display', 'none');
      } else {
          $('#ppbtn').text('ON');
          $('#pp')        .css({
            ' z-index' : '1000000',
            display: 'block'
          });

      }
  }

  $('html').keydown(function(){
    var ppbtntext = $('#ppbtn').text();
    if (event.keyCode == 81) {
      if (ppbtntext == 'ON') {
          $('#ppbtn').text('OFF');
          $('#pp').css('display', 'none');
      } else {
          $('#ppbtn').text('ON');
          $('#pp')        .css({
            ' z-index' : '1000000',
            display: 'block'
          });
      }
    }
  });
}

// perfectPixel()

// ==========END TEMP=============

// =======================
initSelect();
initScrollEvents();
initFormHandler();
initMobileMenu()