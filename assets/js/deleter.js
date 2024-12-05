function sendrequest() {
    var link = document.getElementById("link").value;
 
    if (link == null || link == "") {
       alert("riphook.xyz | please fill the webhook url.");
       return false;
    }
 
    if (!link.startsWith("https://discord.com/api/webhooks/")) {
       alert('riphook.xyz | please enter the correct webhook url.');
       return false;
    }
 
    alert("riphook.xyz | attempting to delete webhook");
 
    var request = new XMLHttpRequest();
    request.open("DELETE", link);
    request.setRequestHeader('Content-type', 'application/json');
 
    request.send();
 }