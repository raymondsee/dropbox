$(function(){
    /*
     * toglle the lanuage selector at the bottom right of the page
     */
    $("a.lang-selector").on("click", function() {
        var langList = $("ul#lang-list");
        if (langList.is(":visible")) {
            $("ul#lang-list").slideUp();
        } else {
            $("ul#lang-list").slideDown();
        }
        return false;
    });
    
    /*
     * Show and play the video on Play Button clicked
     */
    $("button.play-button").on("click", function(){
        $(this).hide();
        $(".video-container").show(function(){
            $(".video-container").find("video")[0].play();
        });
        
        return false;
    });
    
    /*
     * Check if specific element is scrolled into view
     */
    var initTargetTop = null;
    if (isScrolledIntoView("business-container")) {
        initTargetTop = document.getElementById("business-container").getBoundingClientRect().top;
        //console.log(document.getElementById("business-container").getBoundingClientRect().top);
    }
//    } else {
//        $(window).on("scroll", function(){
//            if (isScrolledIntoView("business-container")) {
//                slideInBusinessFeatures();
//                $(window).unbind("scroll");
//            }
//        }).resize(function(){
//
//        });
//    }

    
    $(window).scroll(function(){
//        var hasScrolled = false;
//        var currentTargetTop = document.getElementById("business-container").getBoundingClientRect().top;
//        
//        console.log("currentTargetTop: "+currentTargetTop);
//        console.log("initTargetTop: "+initTargetTop);
//        if (initTargetTop!==null && Math.abs(currentTargetTop - initTargetTop)>200) {
//            hasScrolled = true;
//        } 
        
        if (isScrolledIntoView("business-container") /*&& initTargetTop !==null && hasScrolled */) {
            slideInBusinessFeatures();
            $(window).unbind("scroll");
        }
    }).resize(function(){

    });
    
    
    /*
     * Carouel
     */
    $(".carousel-wrapper .prev a, .carousel-wrapper .next a, .carousel-wrapper ol.bullets li").on("click", function(){

//        var currentSlide = $(".slides-wrapper ul li.active");
//        var currentSlideId = currentSlide.attr("data-slide-id") * 1;
//        var targetSlideId = 1;
//        var numberOfSlides = $(".slides-wrapper ul li").length;
//        var direction = 1; // default right, -1 is left;
//
//        if ($(this).parent().hasClass("prev")) {
//            targetSlideId = currentSlideId - 1;
//            direction = -1;
//            if (targetSlideId < 1) {
//                targetSlideId = numberOfSlides;
//            }
//        } else if ($(this).parent().hasClass("next")) {
//            targetSlideId = currentSlideId + 1;
//            direction = 1;
//            if (targetSlideId > numberOfSlides) {
//                targetSlideId = 1;
//            }
//        } else {
//            targetSlideId = $(this).attr("data-slide") * 1;
//            if (targetSlideId< 1 || targetSlideId > numberOfSlides) {
//                targetSlideId = 1;
//            }
//            
//            if (currentSlideId < targetSlideId) {
//                direction = 1;
//            } else {
//                direction = -1;
//            }
//        }
//        
//        if (currentSlideId == targetSlideId) {
//            // do nothing
//        } else {
//            slideCarousel(currentSlideId, targetSlideId, direction);
//        }
        slideCarousel2($(this))
        return false;
    });
    
    /*
     * 
     * Toggle the offcanvas menu when clicking the hamburger button
     */
    $("button.hamburger-button").on("click", function() {
        var offcanvasMenu = $(".offcanvas-menu");
        if (offcanvasMenu.hasClass("in")) {
            closeOffcanvasMenu();
        } else {
            openOffcanvasMenu();
        }
        
        
        return false;
    });
    
    // Close offcanvas menu when click outside of the menu and only when the menu is open
    $(document).on("click", function(e){
        if ($(".offcanvas-menu").hasClass("in") && 
            $(e.target).parents(".offcanvas-menu").length ==0 && 
            $(e.target).is(":not(.offcanvas-menu")) {
            closeOffcanvasMenu();
        }
    });

});

var openOffcanvasMenu = function () {
    $(".offcanvas-menu").removeClass("out").addClass("in");
}

var closeOffcanvasMenu = function () {
    $(".offcanvas-menu").removeClass("in").addClass("out");
}
var slideCarousel2 = function (clickedElement) {
    var currentSlide = $(".slides-wrapper ul li.active");
    var currentSlideId = currentSlide.attr("data-slide-id") * 1;
    var targetSlideId = 1;
    var numberOfSlides = $(".slides-wrapper ul li").length;
    var direction = 1; // default right, -1 is left;

    if (clickedElement.parent().hasClass("prev")) { // prev button clicked
        targetSlideId = currentSlideId - 1;
        direction = -1;
        if (targetSlideId < 1) {
            targetSlideId = numberOfSlides;
        }
    } else if (clickedElement.parent().hasClass("next")) { // next button clicked
        targetSlideId = currentSlideId + 1;
        direction = 1;
        if (targetSlideId > numberOfSlides) {
            targetSlideId = 1;
        }
    } else { // bullet button clicked
        targetSlideId = clickedElement.attr("data-slide") * 1;
        if (targetSlideId< 1 || targetSlideId > numberOfSlides) {
            targetSlideId = 1;
        }

        if (currentSlideId < targetSlideId) {
            direction = 1;
        } else {
            direction = -1;
        }
    }

    if (currentSlideId != targetSlideId) {
        var slidesArray = $(".slides-wrapper ul li");
        var targetSlide = slidesArray[targetSlideId-1];

        if (direction > 0) {
            $(targetSlide).css("margin-left", "100%");
        } else {
            $(targetSlide).css("margin-left", "-100%");
        }


        $(currentSlide).addClass("moving");
        $(targetSlide).addClass("moving");

        if (direction > 0) {
            $(currentSlide).removeClass("active").animate({
                zindex: 2,
                marginLeft: "-100%"
            });
            
            $(targetSlide).addClass("active").animate({
                zindex: 4,
                marginLeft: "0%"
            });
        } else {
            $(currentSlide).removeClass("active").animate({
                zindex: 2,
                marginLeft: "100%"
            });
            
            $(targetSlide).addClass("active").animate({
                zindex: 4,
                marginLeft: "0%"
            });
        }
      

        setTimeout(function() {
            $(currentSlide).removeClass("moving");
            $(targetSlide).removeClass("moving");
        }, 500);
        
        
        //adjust bullet active state
        var bullets = $(".carousel-wrapper ol.bullets li");
        bullets.removeClass("active");
        $(bullets[targetSlideId-1]).addClass("active");

    }
    return false;
}

//var slideCarousel = function (currentSlideId, targetSlideId, direction) {
var slideCarousel = function (clickedElement) {
    var currentSlide = $(".slides-wrapper ul li.active");
    var currentSlideId = currentSlide.attr("data-slide-id") * 1;
    var targetSlideId = 1;
    var numberOfSlides = $(".slides-wrapper ul li").length;
    var direction = 1; // default right, -1 is left;

    if (clickedElement.parent().hasClass("prev")) { // prev button clicked
        targetSlideId = currentSlideId - 1;
        direction = -1;
        if (targetSlideId < 1) {
            targetSlideId = numberOfSlides;
        }
    } else if (clickedElement.parent().hasClass("next")) { // next button clicked
        targetSlideId = currentSlideId + 1;
        direction = 1;
        if (targetSlideId > numberOfSlides) {
            targetSlideId = 1;
        }
    } else { // bullet button clicked
        targetSlideId = clickedElement.attr("data-slide") * 1;
        if (targetSlideId< 1 || targetSlideId > numberOfSlides) {
            targetSlideId = 1;
        }

        if (currentSlideId < targetSlideId) {
            direction = 1;
        } else {
            direction = -1;
        }
    }

    if (currentSlideId != targetSlideId) {
        var slidesArray = $(".slides-wrapper ul li");
        var targetSlide = slidesArray[targetSlideId-1];
        
        //figure out the after action left and right element
        var afterActionLeftId = targetSlideId - 1;
        var afterActionRightId = targetSlideId + 1;
        var afterActionLeft = null;
        var afterActionRight = null;
        
        if (afterActionLeftId <= 0) {
            afterActionLeft = slidesArray[numberOfSlides-1];
        } else {
            afterActionLeft = slidesArray[afterActionLeftId-1];
        }
        if (afterActionRightId > numberOfSlides) {
            afterActionRight = slidesArray[0];
        } else {
            afterActionRight = slidesArray[afterActionRightId-1];
        }

        if (direction > 0) {
            $(targetSlide).css("margin-left", "100%");
        } else {
            $(targetSlide).css("margin-left", "-100%");
        }


        $(currentSlide).addClass("moving");
        $(targetSlide).addClass("moving");
        if (direction > 0) {
            $(currentSlide).removeClass("active").css("z-index", "2").css("margin-left", "-100%");
            $(targetSlide).addClass("active").css("z-index", "4").css("margin-left", "0%");

            $(afterActionLeft).css("margin-left", "-100%");
            $(afterActionRight).css("margin-left", "100%");
        } else {
            $(currentSlide).removeClass("active").css("z-index", "2").css("margin-left", "100%");
            $(targetSlide).addClass("active").css("z-index", "4").css("margin-left", "0%");
            
            $(afterActionLeft).css("margin-left", "-100%");
            $(afterActionRight).css("margin-left", "100%");
        }

        setTimeout(function() {
            $(currentSlide).removeClass("moving");
            $(targetSlide).removeClass("moving");
        }, 500);
        
        
        //adjust bullet active state
        var bullets = $(".carousel-wrapper ol.bullets li");
        bullets.removeClass("active");
        $(bullets[targetSlideId-1]).addClass("active");

    }
    return false;
}

var slideInBusinessFeatures = function () {
    $("#key").addClass("reset").css("margin-left", "865px").css("opacity", "1").css("-webkit-filter", "blur(2px)");
        
    setTimeout(function() {
        $("#watch").addClass("reset").css("margin-left", "525px").css("opacity", "1");
    }, 400);

    setTimeout(function() {
        $("#devices").addClass("reset").css("margin-left", "185px").css("opacity", "1");
    }, 800);

    setTimeout(function() {
        $("#business-container").attr("style", null);
        $("#key").removeClass("reset").attr("style", null);
        $("#watch").removeClass("reset").attr("style", null);
        $("#devices").removeClass("reset").attr("style", null);
    }, 3000);

    return false;
}

var isScrolledIntoView = function (targetId) {
    var el = document.getElementById(targetId);
    var targetTop = el.getBoundingClientRect().top;
    var targetBottom = el.getBoundingClientRect().bottom;

    var isVisible = (targetTop >= 0) && (targetBottom <= window.innerHeight);
    return isVisible;
}

