var username = "";
function askUsername() {
  send_message("Hello, How can I help You?");
}
 
function send_message(message) {
  var prevMessage = $("#container").html();
  if(prevMessage!=0)
  prevMessage = prevMessage+"";
 
  $("#container").html(prevMessage+ "<br><span class='current_message'><span class='bot'> Chatbot: </span>" + message+"</span>");
  $(".current_message").hide();
  $(".current_message").delay(400).fadeIn();
  $(".current_message").removeClass("current_message");
 
}
 
function ai(message) {
 /* if (username.length <3) {
    username = message;
    send_message("Welcome " + message+ ", What are you doing so?");
  }
 
  if(message.indexOf("how are you")>=0|| message.indexOf("and you")>=0)
  {
    send_message( "I am good");
  }
 
  if(message.indexOf("time")>=0|| message.indexOf("can you tell me time")>=0)
  {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    send_message("Current Time is :  "+ h+":"+m );
  }
  */
  //ajax call
  $.ajax({
		url : 'getSearchResult',
		data : {
			content : message
		},
		success : function(responseText) {
			//$('#ajaxGetUserServletResponse').text(responseText);
			send_message(responseText );
		}
	});

}
 
$(function() {
 
  askUsername();
 
  $("#textbox").keypress(function(event) {
    if (event.which == 13) {
      if ($("#enter").prop("checked")) {
        event.preventDefault();
        $("#send").click();
      }
    }
  });
 
  $("#send").click(function() {
    var username = "<br><span class='username'>You : </span>"
    var message = $("#textbox").val();
    $("#textbox").val("");
 
    var prevMessage = $("#container").html();
 
    // console.log(prevMessage.length);
    if (prevMessage.length != 0 || prevMessage != "")
      prevMessage = prevMessage + "";
 
    $("#container").html(prevMessage + username + message);
 
    $("#container").scrollTop($("#container").prop("scrollHeight"));
 
    ai(message);
 
  });
 
 
});
 