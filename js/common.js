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
            if(form.data('formType') === 'redirect_form') {
              window.location.href = '/success/';
            }
          }
        },
        error: function(error){
          console.log(error);
          form.addClass('error_send')
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
    $('.nav-mob').addClass('open');
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

//Get App Modal SATRT
function initGetAppModal() {
  var currentPosition = 0;

  $('.link-app-btn').click(function() {
    currentPosition =  $(window).scrollTop();
    $('.get-app-modal').addClass('open');
    $('.nav-mob').removeClass('open');
    $('body').addClass('unscroll').css({
      top: -currentPosition
    });
  })

  $('.get-app-modal .btn-close').click(function() {
    $('.get-app-modal').removeClass('open');
    $('body').removeClass('unscroll');
    $(window).scrollTop(currentPosition);
  })
}
//Get App Modal END


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

jQuery(function ($) {
  $("input[type='tel']").mask("(999) 999-9999",{placeholder:" "});
});

// =======================
initSelect();
initScrollEvents();
initFormHandler();
initMobileMenu();
initGetAppModal();