$(document).ready(function(){
    console.log("hihi")
    $("#message-form").on("submit", function(e) {
        messageValue = $("#message-text").val();
        console.log(messageValue);
        console.log("hihihihi")
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: 'POST',
            data: {"message-text":messageValue},
            beforeSend: function() {
            },
            success: function(message) {
            }
        });
    });
});