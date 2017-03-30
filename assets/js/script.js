$(document).ready(function() {
    console.log('loaded')

    //Background Image and Llama image storage
    var img = $('img:first')
    var imgPosition = img.position()
    var $window = $(window)
    var windowWidth = $window.width()
    var llama = $('#llama')

    // Llama Jump Function
    $(document).on('keydown', function(e) {
        if (e.keyCode === 32) {
            $("#llama").addClass("jumped")
        }
    }).on('keyup', function() {
        $('#llama').removeClass('jumped')
    })

    // Moving Background Function and Interval
    function movingBackground() {
        img.css('left', imgPosition.left -= 10)
        if (imgPosition.left < -windowWidth / 2.2) {
            img.css('left', imgPosition.left = 0)
        }
    }
    setInterval(movingBackground, 1000 / 50)

    // Obstacle Generator
    function obstacleMaker() {
        var obstacle = $("#backgroundDiv").append("<img src='assets/img/stone01.png' class='obstacle'>")
    }
    setInterval(obstacleMaker, Math.floor(Math.random() * (2500 - 1000)) + 1000)

    // Moving speed of all Obstacles
    function obstacleAnim() {
        $(".obstacle").animate({
            left: "-=25"
        }, 50)

        //Collision of Obstacles with Llama and Rocks off screen removal
        var obstacleLeft = parseInt($(".obstacle").css("left"))
        var llamaRight = parseInt($("#llama").css("left")) + parseInt($("#llama").css("width")) - 20

        var obstacleHeight = parseInt($(".obstacle").css("top"))
        var llamaHeight = parseInt($("#llama").css("top")) + parseInt($("#llama").css("height")) - 30

        if (obstacleLeft < 0) {
            $("img:nth-child(3)").remove()
        } else if (obstacleLeft < llamaRight && llamaHeight > obstacleHeight) {
            $("img:nth-child(3)").remove()
            $(".losingScreen").css("display", "block")
            $("#backgroundDiv").css("display", "none")
        }
    }
    setInterval(obstacleAnim, 1)
})
