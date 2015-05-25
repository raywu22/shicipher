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
        $("#selection-container .hidden").removeClass('hidden');

        if ($("#message-button").text()==="Encode"){
            $("#key-container").addClass('hidden');
            $("#calculated-key-container").removeClass('hidden');
            $("#key-label").removeClass('hidden');
        }
        else {
            $("#which-selection-container").addClass('hidden');
            $("#calculated-key-container").addClass('hidden');
            $("#key-label").addClass('hidden');
        }
      });

    $("#selection-container ul li").click(function(){
        $("#dropdownMenu1").text($(this).text());
    })

    $("#message-form").on("submit", function(e) {
        messageValue = $("#message-text").val();
        encodeOrDecode = $('#message-pills ul .active').text();
        typeEncode = $("#dropdownMenu1").text();
        keyCode = $("#key-text").val();
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: 'POST',
            data: {
                        "message-text":messageValue,
                        "typeCode":encodeOrDecode,
                        "typeEncode":typeEncode,
                        "keyCode":keyCode
                    },
            beforeSend: function() {
            },
            success: function(message) {
                console.log(message);
                $("#returned-text").text(message["encryptedText"]);
                $("#calculated-key-text").text(message["key"]);
                $("#key-text").val("");
            }
        });
    });
});