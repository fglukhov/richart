var numFormat = wNumb({
  thousand: ' '
});

$(window).scroll(function () {

  var scrollPos = $(window).scrollTop();

  if (scrollPos > 300) {
    $(".up-button").fadeIn(250);
  } else {
    $(".up-button").fadeOut(250);
  }

  if ($("#sectionVideoDescr").length) {

    if ($("#sectionVideoDescr").offset().top + $("#sectionVideoDescr").outerHeight() < scrollPos) {
      $(".home-play-button").fadeIn(150)
    } else {
      $(".home-play-button").fadeOut(150)
    }

  }


  parallax($("#homeSectionDescr1"), 50, .5);
  parallax($("#homeSectionDescr2"), 500, .5);
  parallax($("#sectionVideoDescr"), 300, .5);


  if ($(".home-section-video-wrapper").length) {

    if ($(".home-section-video-wrapper").offset().top + $(".home-section-video-wrapper").height() > scrollPos + $(window).height()) {

      if ($(".home-section-video-wrapper").offset().top > scrollPos) {
        $(".home-section-video").css({
          top: $(".home-section-video-wrapper").offset().top - scrollPos
        });
      } else {
        $(".home-section-video").css({
          top: 0
        });
      }

    } else {
      $(".home-section-video").css({
        top: $(".home-section-video-wrapper").offset().top + $(".home-section-video-wrapper").height() - scrollPos - $(window).height()
      });
    }

  }


});

$(window).resize(function () {

  resizeVideo();

  fancyboxFix();

  slickResponsive();

});

$(document).ready(function () {

  // Brands list expand

  $(".brands-list .catalog-more-btn").click(function () {

    var btn = $(this);

    if (!btn.hasClass("active")) {

      $(".brands-list .brand-tmb:nth-child(n+11)").css('display', 'inline-block').hide().slideDown(500,function () {
        btn.addClass("active").html("Свернуть");
      });

    } else {
      $(".brands-list .brand-tmb:nth-child(n+11)").css('display', 'inline-block').slideUp(500,function () {
        btn.removeClass("active").html("Показать еще");
      });
    }

  })

  // Catalog paint price

  $("body").on("click", ".catalog-price-row .count-plus, .catalog-price-row .count-minus", function () {

    var countValEl = $(this).closest(".catalog-price-row").find(".count-element-val .val");
    var countValInput = $(this).closest(".catalog-price-row").find("input[type=hidden]");

    var countVal = countValInput.val();

    var elPrice = countValEl.closest(".catalog-price-row").find(".count-element").data("price");

    if ($(this).hasClass("count-plus")) {
      countVal++;
    } else if (countVal >= 1) {
      countVal--;
    }

    if (countVal == 0) {
      countValEl.closest(".catalog-price-row").find(".td-price").addClass("inactive");
    } else {
      countValEl.closest(".catalog-price-row").find(".td-price").removeClass("inactive");
    }

    countValEl.html(countVal);
    countValInput.val(countVal);

    if (countVal > 0) {
      countValEl.closest(".catalog-price-row").find(".td-price .val").html(numFormat.to(elPrice * countVal));
      $(".catalog-price-table").html(countValEl.closest(".catalog-price-table").html());
    } else {
      countValEl.closest(".catalog-price-row").find(".td-price .val").html(numFormat.to(elPrice * 1));
      $(".catalog-price-table").html(countValEl.closest(".catalog-price-table").html());

    }


  });

  // Up button

  $(".up-button").click(function () {

    $("body, html").animate({
      scrollTop: 0
    },500);

  });

  // Like

  $("body").on("click",".tmb-like",function () {

    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }

    return false;
  });

  // Compare

  $("body").on("click",".tmb-compare",function () {

    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(this).find(".icon-list").addClass("active");
    } else {
      $(this).removeClass("active");
      $(this).find(".icon-list").removeClass("active");
    }

    return false;
  });

  // Paints catalog

  $(".paint-colors-list-item").on("click",function () {



    curPaintItem = $(this);
    curColor = $(this).data("color");
    curTtl = $(this).find(".paint-ttl").html();
    curPrice = $(this).find(".paint-price").html();
    
    if ($(this).hasClass("liked")) {
      var likedActive = " active";
    } else {
      var likedActive = "";
    }

    if ($(this).hasClass("incart")) {
      var incartActive = " active";
    } else {
      var incartActive = "";
    }

    if ($(this).hasClass("compared")) {
      var comparedActive = " active";
    } else {
      var comparedActive = "";
    }
    
    if (!$(this).find(".paint-popup").length) {
      $(".paint-popup").remove();
      $(this).append('\
      <div class="paint-popup">\
        <div class="close"></div>\
        <div class="paint-popup-color" style="background-color:' + curColor +'">\
          <a href="#" class="tmb-like' + likedActive + '"></a>\
        </div>\
        <div class="tmb-ttl">' + curTtl + '</div>\
        <div class="tmb-price">' + curPrice + ' <span class="units">&#8381;</span></div>\
        <div class="tmb-cart' + incartActive + '"><a class="icon-basket' + incartActive + '" href="#"></a></div>\
      </div>\
      ');
    }

    if ($(this).find(".paint-popup").offset().left + 290 > $(".main").width()) {
      $(this).find(".paint-popup").addClass("paint-popup-l");
    } else {
      $(this).find(".paint-popup").removeClass("paint-popup-l");
    }


  });

  // Add to cart paint

  $("body").on("click", ".paint-popup .tmb-cart", function () {

    $(this).addClass("active");
    $(this).find(".icon-basket").addClass("active")

    $(".catalog-pic-paint-color").css("background-color",$(this).closest(".paint-popup").find(".paint-popup-color").css("background-color"))

    if ($(".add-to-cart-paint-modal").length) {
      $(".add-to-cart-paint-modal").remove();
    }

    var cartColor = $(this).closest(".paint-colors-list-item").data("color"),
      cartFullTtl = $(this).closest(".paint-colors-list-item").find(".full-ttl").html(),
      cartPrice = $(this).closest(".paint-popup").find(".tmb-price").html();


    $("body").append('\
      <div class="modal fade add-to-cart-paint-modal" tabindex="-1" role="dialog" id="addToCartModal">\
        <div class="modal-dialog">\
          <div class="modal-content loading">\
            <div class="close" data-dismiss="modal"></div>\
            <div class="add-to-cart">\
              <div class="add-to-cart-header">\
                <div class="h4">Товар добавлен в заказ</div>\
                <div class="sub-ttl">\
                  Всего в вашей корзине 2 заказа. <a href="#">Просмотреть</a>\
                </div>\
              </div>\
              <div class="cart-list">\
                <div class="cart-tmb">\
                  <div class="row">\
                    <div class="cart-tmb-pic"><div class="cart-tmb-color" style="background-color:'+cartColor+'"></div></div>\
                    <div class="cart-tmb-descr"><a href="#">' + cartFullTtl + '</a></div>\
                    <div class="cart-tmb-price">\
                      <div class="price">' + cartPrice + ' <span class="units">&#8381;</span></div>\
                      <div class="cart-tmb-count">1 шт.</div>\
                    </div>\
                  </div>\
                </div>\
              </div>\
              <div class="add-to-cart-footer">\
                <div class="btn btn-1">Продолжить выбор</div>\
                <a href="#" class="btn btn-2">Оформить заказ</a>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
    ');

    $(".add-to-cart-paint-modal").modal("show");


    return false;

  });

  $("body").on("click",".paint-popup .close",function () {
    $(this).closest(".paint-popup").remove();
  });

  // Mobile nav

  $(".navbar-trigger").on("click",function () {
    $(".navbar-collapse").addClass("open");
    $(".navbar-back").removeClass("closing").addClass("open");
  });

  $(".navbar-close").on("click",function () {
    $(".navbar-collapse").removeClass("open");
    $(".navbar-back").addClass("closing").delay(500).queue('fx', function() { $(this).removeClass('open').removeClass('closing'); });
  });

  $(".navbar-collapse").on("click",function (e) {
    if (!$(e.target).hasClass(".navbar-wrapper") && !$(e.target).parents().hasClass(".navbar-wrapper")) {
      $(".navbar-collapse").removeClass("open");
      $(".navbar-back").addClass("closing").delay(500).queue('fx', function() { $(this).removeClass('open').removeClass('closing'); });
    }
  })

  // Header menu

  $(".header-menu-trigger, .header-user-btn").click(function () {
    $(this).toggleClass("active");
    $($(this).data("target")).fadeToggle(300);
  });

  $("body").on("click",function (e) {

    if (!$(e.target).hasClass("header-menu") && !$(e.target).closest(".header-menu").length && !$(e.target).hasClass("header-menu-trigger") && !$(e.target).hasClass("header-user-btn") && !$(e.target).closest(".header-menu-trigger").length && !$(e.target).closest(".header-user-btn").length ) {

      $(".header-menu-trigger, .header-user-btn").removeClass("active");
      $(".header-menu").fadeOut(300);

    }

  });

  // Sidebar menu

  $(".sidebar-menu-trigger").on("click", function () {

    var sidebarMenuTrigger = $(this);

    if (!sidebarMenuTrigger.hasClass("active")) {

      $(".sidebar-menu").slideDown(500, function () {
        sidebarMenuTrigger.addClass("active").find(".name").html("Свернуть")
      });

    } else {

      $(".sidebar-menu").slideUp(500, function () {
        sidebarMenuTrigger.removeClass("active").find(".name").html("Меню")
      });

    }

  });

  slickResponsive();

  // Home video

  $(".home-play-button").click(function () {
    $(this).fadeOut(500);
    $(".home-video-wrapper").fadeIn(500);
    $(".home-video").get(0).play();
  });

  // Sticky video block

  resizeVideo();

  // Brands slider

  $(".brands-slider").on("init", function () {

    $(".brands-nav-next").click(function () {
      $(".brands-slider").slick("slickNext");
    });

    $(".brands-nav-prev").click(function () {
      $(".brands-slider").slick("slickPrev");
    });

  });

  $(".brands-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true
        }
      }
    ]
  });

  // Main slider

  $(".main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });

  $("body").on("click", "form .form-reset", function () {
    $(this).closest("form")[0].reset();
    $(this).closest("form").submit();

  });

  // Form extra

  $(".form-extra-trigger .trigger").on("click",function () {

    var extraTrigger = $(this);

    var extraContent = $(this).closest(".form-extra").find(".form-extra-content");

    if (!$(this).hasClass("active")) {
      extraContent.slideDown(1000, function () {
        extraTrigger.addClass("active");
      });
    } else {
      extraContent.slideUp(1000, function () {
        extraTrigger.removeClass("active");
      });
    }

  });

  // Order calculator

  if ($(".order-form").length) {
    calcOrder();
  }

  $(".order-form .form-radio-text input, .order-form #order_coupon").on("change",function () {
    calcOrder();
  });

  // Add to cart

  $("body").on("click", ".catalog-tmb .tmb-cart", function () {
    $(this).addClass("active");
    $(this).find(".icon-basket").addClass("active")

    if ($(".add-to-cart-modal").length) {
      $(".add-to-cart-modal").remove();
    }

    var cartPic = $(this).closest(".catalog-tmb").find(".tmb-pic").css("background-image").replace('url(','').replace(')','').replace(/\"/gi, ""),
        cartFullTtl = $(this).closest(".catalog-tmb").find(".full-ttl").html(),
        cartPrice = $(this).closest(".catalog-tmb").find(".price").html();


    $("body").append('\
      <div class="modal fade add-to-cart-modal" tabindex="-1" role="dialog" id="addToCartModal">\
        <div class="modal-dialog">\
          <div class="modal-content loading">\
            <div class="close" data-dismiss="modal"></div>\
            <div class="add-to-cart">\
              <div class="add-to-cart-header">\
                <div class="h4">Товар добавлен в заказ</div>\
                <div class="sub-ttl">\
                  Всего в вашей корзине 2 заказа. <a href="#">Просмотреть</a>\
                </div>\
              </div>\
              <div class="cart-list">\
                <div class="cart-tmb">\
                  <div class="row">\
                    <div class="cart-tmb-pic"><a class="pic" href="#" style="background-image:url(' + cartPic +');"></a></div>\
                    <div class="cart-tmb-descr"><a href="#">' + cartFullTtl + '</a></div>\
                    <div class="cart-tmb-price">\
                      <div class="price">' + cartPrice + ' <span class="units">&#8381;</span></div>\
                      <div class="cart-tmb-count">1 шт.</div>\
                    </div>\
                  </div>\
                </div>\
              </div>\
              <div class="add-to-cart-footer">\
                <div class="btn btn-1">Продолжить выбор</div>\
                <a href="#" class="btn btn-2">Оформить заказ</a>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
    ');

    $(".add-to-cart-modal").modal("show");


    return false;

  });

  // Cart popup

  if ($("#mobile-indicator").css("display") == "block") {
    $(".header-controls-item a").on("click", function () {
      if ($(this).closest(".header-controls-item").find(".cart-popup").length) {
        $(this).closest(".header-controls-item").find(".cart-popup").fadeIn(150);
        return false;
      }
    });
  } else {

    $(".header-controls-item").on("mouseenter", function () {
      if ($(this).find(".cart-popup").length) {
        $(this).find(".cart-popup").fadeIn(150);
      }
    });


  }

  $(".header-controls-item").on("mouseleave", function () {
    if ($(this).find(".cart-popup").length) {
      $(this).find(".cart-popup").hide();
    }
  });

  $(".cart-popup-close").on("click",function () {
    $(".cart-popup").hide();
  })

  // Tooltip custom

  $("body").on("click", ".tooltip-custom-trigger", function () {

    var tooltipTarget = $($(this).data("target"));
    tooltipTarget.fadeIn(150).addClass("active");

  });

  $("body").on("click", function (e) {
    if (!$(e.target).hasClass("tooltip-custom-wrapper") && !$(e.target).parents().hasClass("tooltip-custom-wrapper")) {
      $(".tooltip-custom.active").hide().removeClass("active");
    }



  });

  // Text radios

  $(".form-radio-text input").on("change",function () {
    var radio = $(this);
    var radioDescrs = $(this).closest(".form-group").find(".form-radios-descr-item");

    radioDescrs.hide();

    radioDescrs.filter(function () {
      return $(this).data("radio") == radio.attr("id")
    }).fadeIn(150)

  });

  // Form group expandable

  $("body").on("click", ".form-group-expandable-trigger span", function () {

    var $btn = $(this);
    var $target = $(this).closest(".form-group-expandable").find(".form-item");

    if (!$target.hasClass("open")) {
      $target.slideDown(500,function () {
        $target.addClass("open");
        $btn.html($btn.data("collapse-text"));
      });
    } else {
      $target.slideUp(500,function () {
        $target.find("input, textarea").val("");
        $target.removeClass("open");
        $btn.html($btn.data("expand-text"));
      });
    }

  });

  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });

  // Count

  $(".cart-item-count .count-plus").click(function () {
    var countInput = $(this).closest(".count").find(".count-input");
    countInput.val( + countInput.val() + 1 );

    if ($(this).closest(".cart-item").data("price")) {
      var itemPrice = $(this).closest(".cart-item").data("price") * countInput.val();
      $(this).closest(".cart-item").find(".price").html(numFormat.to(itemPrice));
    }

    cartTotal();
  });

  $(".cart-item-count .count-minus").click(function () {
    var countInput = $(this).closest(".count").find(".count-input");
    if (+countInput.val() > 1) {
      countInput.val( + countInput.val() - 1 );
    }

    if ($(this).closest(".cart-item").data("price")) {
      var itemPrice = $(this).closest(".cart-item").data("price") * countInput.val();
      $(this).closest(".cart-item").find(".price").html(numFormat.to(itemPrice));
    }

    cartTotal();
  });

  // Catalog tooltip

  $(".catalog-tmb .tmb-compare, .catalog-tmb .tmb-cart").on("mouseenter",function () {

    var tToggle = $(this);

    if ($(this).find(".catalog-tooltip").length) {
      var catalogTooltip = $(this).find(".catalog-tooltip");

      catalogTooltip.fadeIn(150);

      var mLeft = - catalogTooltip.outerWidth() / 2;

      catalogTooltip.css({
        marginLeft: mLeft,
        right: "auto",
        left: "50%"
      });

      if (catalogTooltip.offset().left < 0) {
        mLeft = 0;
        catalogTooltip.css({
          marginLeft: mLeft,
          left: 0
        });
      } else if (catalogTooltip.offset().left + catalogTooltip.outerWidth() > $(window).width()) {
        mLeft = 0;
        catalogTooltip.css({
          marginLeft: mLeft,
          right: 0,
          left:"auto"
        });
      } else {
        catalogTooltip.css({
          marginLeft: mLeft
        });
      }


      catalogTooltip.find(".arrow").css({
        left: Math.abs(catalogTooltip.offset().left - tToggle.offset().left) + tToggle.outerWidth()/2
      })

    }

  });

  $(".catalog-tmb .tmb-compare, .catalog-tmb .tmb-cart").on("mouseleave",function () {

    if ($(this).find(".catalog-tooltip").length) {
      var catalogTooltip = $(this).find(".catalog-tooltip");
      catalogTooltip.hide();
    }

  })






  // Catalog gallery


  $(".gallery-big").on("init",function () {

    $(".gallery-thumbs a").on("click",function () {

      $(".gallery-big").slick("slickGoTo", $(this).prevAll("a").length);

      return false;
    })

  });


  $(".gallery-big").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    lazyLoad: "ondemand",
    speed:500,
    arrows: false,
    swipe: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          swipe: true,
          fade: false
        }
      }
    ]
  });




  // Catalog slider

  $(".catalog-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  })

  // Expandable

  $("body").on("click", ".expandable-trigger span", function () {

    var $btn = $(this);
    var $target = $(this).closest(".expandable-trigger").prev(".expandable");

    if (!$target.hasClass("open")) {
      $target.slideDown(500,function () {
        $target.addClass("open");
        $btn.html("Свернуть");
      });
    } else {
      $target.slideUp(500,function () {
        $target.removeClass("open");
        $btn.html("Развернуть");
      });
    }

  });

  $("body").on("click", ".expandable-alt-trigger", function () {

    var $btn = $(this);
    var $target = $(this).closest(".expandable-alt").find(".expandable-alt-content");

    if (!$target.hasClass("open")) {
      $target.slideDown(500,function () {
        $target.addClass("open");
        $btn.html("Свернуть").addClass("active");
      });
    } else {
      $target.slideUp(500,function () {
        $target.removeClass("open");
        $btn.html("Развернуть").removeClass("active");
      });
    }

  });



  // More button

  $("body").on("click", ".more-link", function () {

    $(this).addClass("loading");

    link = $(this);

    $.get( $(this).attr("href"), function( data ) {
      link.after( data );
      link.nextAll().hide().fadeIn(500);
      link.remove();
    });

    return false;

  })

  // Anchors

  $(".header-buttons a").click(function () {

    $("html,body").animate({
      scrollTop: $("a[name='" + $(this).attr("href").replace("#","") + "']").offset().top
    },1000)

    return false;
  })



  // Clients

  $(".partners-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    infinite:false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Fancybox


  $("a.fancybox").fancybox();

  fancyboxFix();




  // Forms

  $("input[type=file]").nicefileinput({
    label: "Прикрепить файл"
  });

  $("select").selectpicker({
    selectAllText: "Выбрать всё",
    deselectAllText: "Снять выбор",
    selectedTextFormat: "count"
  });

  $("#search_color").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['цвет', 'цвета', 'цветов']);
    }
  });

  $("#search_brand").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['бренд', 'бренда', 'брендов']);
    }
  });

  $("#search_price").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['цена', 'цены', 'цен']);
    }
  });

  $("#search_stock").selectpicker({
    selectAllText: "Выбрать всё",
    deselectAllText: "Снять выбор",
    selectedTextFormat: "count",
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['вариант', 'варианта', 'вариантов']);
    }
  });

  $('.input-numeric').bind('keyup paste', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  if ($("input:text").length) {
    $("input:text").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  if ($("textarea").length) {
    $("textarea").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  $("body").on("focus","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      placeholder.hide();

    }

  });

  $("body").on("blur","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
        placeholder.show();
      }

    }

  });

  $("body").on("click",".placeholder",function(e) {
    if ($(this).parent().find("input").length) {
      $(this).parent().find("input").trigger("focus");
    }
    if ($(this).parent().find("textarea").length) {
      $(this).parent().find("textarea").trigger("focus");
    }
  })

  $("input.input-phone").mask("+7 (999) 999-99-99");

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").removeClass("focus")
  });

  validateForms();

});

// Contacts map

// function initMap() {
//   var myLatLng = {lat: 55.753735, lng: 37.622538};
//   var myCenter = {lat: 55.749735, lng: 37.622538};
//
//   var map = new google.maps.Map(document.getElementById('contactsMap'), {
//     zoom: 15,
//     center: myCenter,
//     styles: [
//       {
//         "featureType": "all",
//         "stylers": [
//           { "saturation": -100 }
//         ]
//       }
//     ]
//
//   });
//
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: 'Hello World!',
//     icon: "images/map-pin.png"
//   });
// }

function yearsName(age) {
  var txt;
  count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = 'лет';
  } else {
    count = count % 10;
    if (count == 1) {
      txt = 'год';
    } else if (count >= 2 && count <= 4) {
      txt = 'года';
    } else {
      txt = 'лет';
    }
  }
  return txt;
}

function calcCredit(S,p,n){

  p = +p / 1200;
  n = +n * 12;

  return Math.round(+S * p / (1 - Math.pow(1 + p, -n)));

}

function validateForms() {

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").on("change", function () {
    $(this).valid();
  });

  $("body").on("click", ".form-item", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-item").find("select").selectpicker('toggle');
    }
  });

  $("form").each(function() {

    form = $(this);

    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.closest(".form-item").addClass("error");
          element.closest(".btn-group").addClass("btn-group-error");
          if (element.closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
          } else {
            error.insertAfter(element.closest(".btn-group"));
          }
        } else {
          if (element.attr("type") == "checkbox" || element.attr("type") == "radio") {
            element.siblings("label").addClass("checkbox-label-error")
          } else {
            element.closest(".form-item").addClass("error");
            error.insertAfter(element.closest(".form-item"));
          }
        }

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        $(element).closest(".form-item").removeClass("error").addClass("valid");

        if ($(element)[0].tagName == "SELECT") {
          $(element).closest(".form-item").removeClass("error");
          $(element).closest(".btn-group").removeClass("btn-group-error");
          if (element.closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
            $(element).closest(".form-item").next("label.error").remove();
          } else {
            $(element).closest(".btn-group").next("label.error").remove();
          }
        } else {
          $(element).closest(".form-item").next(".error").remove();
          if ($(element).attr("type") == "checkbox" || $(element).attr("type") == "radio") {
            $(element).siblings("label").removeClass("checkbox-label-error")
          }
        }
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
          validatorcalc.errorList[0].element.focus();
        }
      }
    });

    if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
      $(this).find("input.password-repeat").rules('add', {
        equalTo: "#"+form.find("input.password").attr("id")
      });
    }

  });

}

jQuery.extend(jQuery.validator.messages, {
  required: "Не заполнено поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function cartTotal() {

  var cartTotal = 0;

  $(".cart-item").each(function () {

    if ($(this).data("price")) {
      var itemPrice = $(this).data("price") * $(this).find(".count-input").val();
      cartTotal += itemPrice;
    }

  });

  $(".cart-total-price .price").html(numFormat.to(cartTotal));
  $(".cart-total-all").html(numFormat.to(cartTotal - $(".cart-discount .price").html().replace(/\s+/g, '')));

}

function calcOrder() {

  var orderPrice = $(".order-price-val").html();
  orderPrice = orderPrice.replace(/\s+/g, '');

  var orderDiscount = 0;

  var orderTotal = +orderPrice;

  $(".order-form [data-price]").each(function () {
    if ($(this).attr("type") != "radio") {
      orderTotal += $(this).data("price") - 0;
    } else {
      if ($(this).is(":checked")) {
        orderTotal += $(this).data("price") - 0;
      }
    }
  });

  $(".order-form [data-discount]").each(function () {
    orderDiscount -= $(this).data("discount") - 0;
  });

  //console.log(orderDiscount)

  var orderCouponDiscount = +Math.floor(orderPrice.replace(/\s+/g, '')*(+$("#order_coupon_discount").val()/100));

  orderDiscount -= orderCouponDiscount;

  console.log(orderTotal)

  $(".order-shipping-val").html($("[name='order_shipping_1']:checked").data("price"));

  $(".order-coupon-val").html(orderCouponDiscount);
  $(".order-coupon-percent").html("-"+$("#order_coupon_discount").val());

  $(".order-total-val").html(numFormat.to(orderTotal + orderDiscount));

}

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function resizeVideo() {
  $(".home-section-video").css({
    height: $(window).height()
  });

  $(".home-section-video-wrapper").css({
    height: $(window).height() + 800
  });

}

function parallax(obj, objOffset, speed) {

  var objPos = (- $(window).scrollTop() + obj.closest(".parallax-base").offset().top)*speed + objOffset

  obj.css({
    transform: "translateY(" + objPos + "px)"
  });

}

function fancyboxFix() {

  if($('#mobile-indicator').css('display') == 'block') {
    $('.gallery-big .fancybox').off("click.fb-start");
    $('.gallery-big .fancybox').click(function () {
      return false;
    });
  } else {

    $('.gallery-big .fancybox').fancybox();

  }

}

function slickResponsive() {

  if ($("#mobile-indicator").css("display") == "block") {

    $(".also-catalog > .row, .popular-catalog > .row").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      dots: true,
      arrows: false
    });

  } else {

    if ($(".also-catalog > .row").hasClass("slick-initialized")) {
      $(".also-catalog > .row").slick("unslick");
    }

    if ($(".popular-catalog > .row").hasClass("slick-initialized")) {
      $(".popular-catalog > .row").slick("unslick");
    }

  }

}