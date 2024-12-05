$(document).ready(function() {
   let counter = 0;
   const params = new URLSearchParams(window.location.search);
 
   if (params.get("url") != null) {
       $("#link").val(params.get("url"));
   }
   if (params.get("msg") != null) {
       $("#content").val(params.get("msg"));
   }
 
   let save = function() {
       window.location.search = "?msg=" + $("#content").val() + "&url=" + $("#link").val();
   }
 
   let log = function(code, logMessage) {
       let day = new Date().toString().split(" ")[4];
       console.log(day + " [" + code + "] " + logMessage);
   }
 
   $('#btn').click(function() {
       var link = $('#link').val();
       var username = $('#username').val();
       var content = $('#content').val();
       var avatar = $('#avatar').val();
 
       if (!link || !content) {
           alert("riphook.xyz | please fill all the textboxes.");
           return false;
       }
 
       if (!link.startsWith("https://discord.com/api/webhooks/")) {
           alert('riphook.xyz | please enter the correct webhook url.');
           return false;
       }
 
       alert("riphook.xyz | attempting to send '" + content + "'");
 
       let sendRequest = function() {
           $.post(link, {
               "content": content,
               "username": username,
               "avatar_url": avatar,
           }).done(function(response) {
               counter++;
               log("INFO", "sent " + counter.toLocaleString() + " messages");
           }).fail(function(xhr, status, error) {
               if (xhr.status == 429) {
                   log("ERROR", "rate limited, retrying...");
               } else if (xhr.status == 404) {
                   log("ERROR", "webhook not found");
               } else {
                   log("ERROR", "request failed: " + error);
               }
           });
       }
 
       let interval = setInterval(function() {
           sendRequest();
       }, 50);
   });
 });
 