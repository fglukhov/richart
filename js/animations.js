var is_mobile = false;

if( $('#mobile-indicator').css('display')=='none') {
  is_mobile = true;
}

if (!is_mobile) {

  var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

  new ScrollMagic.Scene({triggerElement: "header"})
    .setTween(".city-1", {y: "80%"})
    .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "header"})
    .setTween(".city-2", {y: "60%"})
    .addTo(controller);

  new ScrollMagic.Scene({triggerElement: "header"})
    .setTween(".city-3", {y: "40%"})
    .addTo(controller);

  var controller2 = new ScrollMagic.Controller();

  $.each( $(".top-pros-list .tmb"), function( index, element ) {

    var topProsTmbTween = new TweenMax.to($(element), .5, {
      y: 0,
      opacity: 1,
      scale: 1,
      delay: $(this).prevAll().length*.5 + .7
    });

    var sceneTopPros = new ScrollMagic.Scene({triggerElement: $("header")})
      .offset(-100)
      .setTween(topProsTmbTween)
      .addTo(controller2);

  });

  $.each( $(".credit-pros-list .tmb"), function( index, element ) {

    var creditProsTmbTween = new TweenMax.to($(element), .6, {
      scale: 1,
      opacity: 1,
      delay: $(this).closest(".col-xs-4").prevAll().length*.2
    });

    var sceneCreditPros = new ScrollMagic.Scene({triggerElement: element})
      .offset(-250)
      .setTween(creditProsTmbTween)
      .addTo(controller2);

  });

  $.each( $(".calc-slider-wrapper"), function( index, element ) {

    var calcSliderTween = new TweenMax.to($(element), .5, {
      x: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length*.35
    });

    var sceneCalcSlider = new ScrollMagic.Scene({triggerElement: element})
      .offset(-300)
      .setTween(calcSliderTween)
      .addTo(controller2);

  });

  $.each( $(".company-pros-item"), function( index, element ) {

    var companyProsTween = new TweenMax.to($(element), .5, {
      x: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length*.35
    });

    var sceneCompanyPros = new ScrollMagic.Scene({triggerElement: element})
      .offset(-300)
      .setTween(companyProsTween)
      .addTo(controller2);

  });

  $.each( $(".work-list .tmb-pic"), function( index, element ) {

    var workPicTween = new TweenMax.to($(element), .5, {
      rotationY: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length * .35
    });

    var sceneWorkPic = new ScrollMagic.Scene({triggerElement: element.closest(".work-list")})
      .offset(-300)
      .setTween(workPicTween)
      .addTo(controller2);

  });

  $.each( $(".work-list .tmb-descr"), function( index, element ) {

    var workTextTween = new TweenMax.to($(element), .5, {
      scale: 1,
      opacity: 1,
      delay: $(this).closest(".col-xs-12").prevAll().length*.35 + .5
    });

    var sceneWorkText = new ScrollMagic.Scene({triggerElement: element.closest(".work-list")})
      .offset(-300)
      .setTween(workTextTween)
      .addTo(controller2);

  });

  $.each( $(".pros-list .tmb"), function( index, element ) {

    var prosTween = new TweenMax.to($(element), .5, {
      rotationY: 0,
      opacity: 1,
      delay: $(this).closest(".col-xs-6").prevAll().length * .35
    });

    var scenePros = new ScrollMagic.Scene({triggerElement: element.closest(".pros-list")})
      .offset(-300)
      .setTween(prosTween)
      .addTo(controller2);

  });

  $.each( $(".cert-list .fancybox"), function( index, element ) {

    var certTween = new TweenMax.to($(element), .5, {
      scale: 1,
      opacity: 1,
      delay: $(this).closest(".col-xs-6").prevAll().length * .35
    });

    var sceneCert = new ScrollMagic.Scene({triggerElement: element.closest(".cert-list")})
      .offset(-300)
      .setTween(certTween)
      .addTo(controller2);

  });

  $.each( $(".clients-list"), function( index, element ) {

    var clientsTween = new TweenMax.to($(element), .5, {
      y: 1,
      opacity: 1
    });

    var sceneClients = new ScrollMagic.Scene({triggerElement: element})
      .offset(-400)
      .setTween(clientsTween)
      .addTo(controller2);

  });

}