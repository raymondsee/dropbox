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
    })
});

