var player = document.getElementById("player");
var apple = document.getElementById("apple");

var directions = {
	"up": 0,
	"down": 1,
	"left": 2,
	"right": 3
};

var currentDirection = directions.left;

function moveSnek() {
	var left = parseFloat(window.getComputedStyle(player).getPropertyValue("left"));
	var up = parseFloat(window.getComputedStyle(player).getPropertyValue("up"));
	switch (currentDirection) {
		case directions.up:
			player.style.top = up + 10 + "px";
			break;
	}
}

var move = setInterval(function () {
	moveSnek();
}, 500);

document.addEventListener("keydown",
	event = > {
		switch (event.key) {
			case "ArrowUp":
				alert("up");
				currentDirection = directions.up;
				break;
		}
	});
