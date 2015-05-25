$(document).ready(function(){

    var newColSize = Math.floor($(window).width()*.06);
    $("#message-text").attr("cols",newColSize);
    $(window).resize(function(){
        var newColSize = Math.floor($(window).width()*.06);
        $("#message-text").attr("cols",newColSize);
    })

    $('#message-pills ul li').click( function() {
        $(this).addClass('active').siblings().removeClass('active');
        $("#message-button").text($('#message-pills ul .active').text());
      });

    $("#message-form").on("submit", function(e) {
        messageValue = $("#message-text").val();
        encodeOrDecode = $('#message-pills ul .active').text();
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: 'POST',
            data: {
                        "message-text":messageValue,
                        "typeCode":encodeOrDecode
                    },
            beforeSend: function() {
            },
            success: function(message) {
                $("#returned-text").text(message);
            }
        });
    });
});