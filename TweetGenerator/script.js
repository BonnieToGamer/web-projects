var Responses = ["I'm very stupid", "Hello fellow americans!", 
"I like america not mexico", "boooo mexico bad", "cheese", "china bad", 
"bing bong", "aaaaaaaaaaaahhh", "my fellow americans...", "something something racism"];

var ProfilePicutre = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/250px-Donald_Trump_official_portrait.jpg";

function createTweet(){
	let pfp = document.createElement("img");
  let user = document.createElement("h");
  let text = document.createElement("p");
	pfp.setAttribute("src", ProfilePicutre);
  pfp.setAttribute("alt", "Picutre :)");
  pfp.setAttribute("class", "ProfilePicture")
  
  user.setAttribute("class", "Username");
  user.innerHTML = "@DonaldDuck";
  
  text.setAttribute("class", "Text");
  text.innerHTML = Responses[Math.floor(Math.random() * Responses.length)];
  
  let tweet = document.createElement("div");
  tweet.setAttribute("class", "Tweet")
  tweet.appendChild(pfp);
  tweet.appendChild(user);
	tweet.appendChild(text);

  let tweets = document.getElementById("tweets");
  
  tweets.appendChild(tweet);
}

$("#button").click(function() {
	alert("asd");
});