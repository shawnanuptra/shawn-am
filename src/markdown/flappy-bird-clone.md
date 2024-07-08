# Flappy Bird Clone!

[https://github.com/shawnanuptra/flappy-bird-ripoff](https://github.com/shawnanuptra/flappy-bird-ripoff)

A simple web-based game that uses vanilla JavaScript to run.

This project consists of only 3 files - the index.html, style.css, and script.js

<video
src='/flappy-bird-clone/flappy_bird_muted.mp4'
width='100%'
height='auto'
controls

> </video>

## Index.html

The index.html is served as the ‘canvas’ of the game. It consists of all the elements in the game, such as the #game boundaries itself, #pipes for the moving pipe in Flappy Bird, #character for the player hitbox.

```html
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Flappy Bird</title>
		<link rel="stylesheet" href="style.css" />
		<link
			href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
			rel="stylesheet"
		/>
	</head>
	<body style="text-align: center;">
		<br /><br /><br /><br /><br /><br />

		<!-- Div for the game -->
		<div id="game">
			<!-- div for the 'pipes' in flappy bird that the character has to go to -->
			<div id="pipes"></div>
			<!-- div for the hole in-between the pipes -->
			<div id="hole"></div>
			<!-- div for character -->
			<div id="character"></div>
			<div id="text">
				CLICK <br />
				OR <br />
				SPACEBAR <br />TO START
			</div>
		</div>

		<div id="title" style="margin: 20px;">
			<h1>
				<span>SCORE: </span>
				<span id="score">0</span>
			</h1>
		</div>
	</body>
	<script src="script.js"></script>
</html>
```

## Style.css

This is where all the styling of the HTML elements are set. Game boundary, character and pipe stylings, and text styling. Animations are also configured here!

```jsx
* {
	...,
	touch-action: manipulation;
}
```

Setting touch-action to **manipulation** disallows the use of double-tap to zoom. Disabling double-tap to zoom removes the delay of click events when the user taps the screen, leading to a more responsive game.

```scss
@keyframes pipes {
	0% {
		left: 400px;
	} /*during start, position of #pipes is left:400px*/
	100% {
		left: -50px;
	} /*at the end, position of #pipes is left: -50px,
    because the width of the pipes is 50px,
    so the position has to be 50px less than 0, in order for the pipe to 'disappear'*/
}

@keyframes fadeAnimation {
	0% {
		opacity: 100%;
	}
	50% {
		opacity: 100%;
	}
	75% {
		opacity: 0%;
	}
	100% {
		opacity: 100%;
	}
}
```

Above are the animations that are used in the project. **Pipes** are used for both #hole and #pipes, as they will need to move together and overlap in the game, in order to give the effect of a 2 pipes (top and bottom) with a hole in the middle.

## Script.js

This is where all the game logic and states are stored. There are 3 main functions that used: **jump(), animationIteration(),** and **startGame().**

Jump() is used to calculate the position of the #character when they click on the screen, and execute the changing of the #character position relative to time.

```js
function jump() {
	let characterTop = parseInt(
		window.getComputedStyle(character).getPropertyValue("top")
	);

	//if it is currently jumping, clear the previous Interval, and the next jumpInterval will be made
	//allows to jump while jump animation is not done. clearInterval clears the previous jump information, frame=0 resets the jump animation
	if (jumping) {
		clearInterval(jumpInterval);
		jumpFrame = 0;
	}

	//set jumping flag as true
	jumping = true;

	//setInterval in 60fps (updates 1000/60ms once)
	jumpInterval = setInterval(() => {
		//when animation first starts (frame == 0), use characterTop as jump 'starting point'
		//after frame > 0, use prevCharTop as jump 'starting point'
		if (jumpFrame == 0) {
			character.style.top =
				easeOutCubic(jumpFrame / 60, characterTop, -70, 0.3) + "px";
			prevJumpCharTop = characterTop;
		} else {
			character.style.top =
				easeOutCubic(jumpFrame / 60, prevJumpCharTop, -70, 0.3) + "px";
		}

		//increments the frame, so easeOutCubic can return a different value
		jumpFrame++;

		//stop jumping after animation is done (length of jump = 20 frames)
		if (jumpFrame >= 20) {
			//set jumping flag to false
			jumping = false;
			//stop the jumpInterval (stopping the jumping animation)
			clearInterval(jumpInterval);
			//resets the frame to 0
			jumpFrame = 0;
		}
	}, 1000 / 60);
}
```

AnimationIteration() is used to randomise the position of the #hole, and increasing the score everytime the #character successfully goes through the #hole.

```jsx
function animationIteration() {
	// we want hole.style.top range from -450 until -200
	// this is so that the hole is always inbetween the pipes (visually)
	let random = -(Math.random() * 250 + 200);
	hole.style.top = random + "px";
	//increment the score after the character has passed the hole, aka new pipes animation iterates
	score++;
	scoreOutput.innerHTML = score;
}
```

StartGame() is used to process user input (spacebar or click). If it’s during a game, jump(). If the game’s over, reset all states to initial starting screen and state. If it’s in the initial state, start game logic. This includes starting gravity logic, clearing start screen text, initiating pipe animations, and hitbox logic to end the game if the #character hits the pipe or the bottom.

```jsx
function startGame() {
	//if game is running, run jump();
	if (gameState === 1) {
		jump();
	}
	//if game is in starting screen,
	else if (gameState === 0) {
		//set game to state 1, to signal it's starting to run
		gameState = 1;
		//RESET TO NEW GAME SETTINGS
		score = 0;
		gravFrame = 0;
		prevGravCharTop = 250;
		//clear the board
		text.innerHTML = "";
		//start the animation
		pipes.style.animation = "";
		hole.style.animation = "";
		// addEventListener to #hole, so an anonymous function will be triggered to randomize the position of #hole
		hole.addEventListener("animationiteration", animationIteration);

		//GRAVITY FUNCTION PART OF THE CODE
		startInterval = setInterval(() => {
			// get the value of the 'top' property of the character
			let characterTop = parseInt(
				window.getComputedStyle(character).getPropertyValue("top")
			);

			//if currently not jumping
			if (jumping === false) {
				//set new character style top value. adding the top value will move the element down => 'gravity'
				//use prevGravCharTop as 'a point where the char starts falling'
				character.style.top =
					easeInQuad(gravFrame / 60, prevGravCharTop, 500, 1.15) +
					"px";
				//increments gravFrame to continue animation. easeInQuad will return diff values everytime setInterval is run
				gravFrame++;
			}
			//when it's jumping, set the prevGravCharTop to the most updated position of the char, characterTop.
			//resets the gravity animation, gravFrame = 0;
			else {
				prevGravCharTop = characterTop;
				gravFrame = 0;
			}

			//HIT DETECTION PART OF THE CODE
			let pipesLeft = parseInt(
				window.getComputedStyle(pipes).getPropertyValue("left")
			);
			let holeTop = parseInt(
				window.getComputedStyle(hole).getPropertyValue("top")
			);
			let cTop = -(500 - characterTop);

			//if character 'hits' the bottom of game div, go to gameState 2
			//OR
			//if character 'hits' the pipes, go to gameState 2
			//if pipes.left < char.width AND pipes.left < -pipes.width+char.width AND (cTop is taller than holeTop OR cTop is shorter than lowerHoleTop-char.height)
			if (
				characterTop >= 470 ||
				(pipesLeft < 50 &&
					pipesLeft > -20 &&
					(cTop < holeTop || cTop > holeTop + 150 - 30))
			) {
				pipes.style.animation = "none"; //stops the animation
				hole.style.animation = "none"; //stops the animation

				text.innerHTML = "GAME OVER <br><br>TRY AGAIN?";
				//disables fadingAnimation
				text.style.animation = "none";
				//sets gameState = 2;
				gameState = 2;
			}
		}, 1000 / 60);
		jump(); //jump new game is starting
	} else {
		//if gameState = 2, and startGame() is invoked:
		//set to main screen settings
		text.innerHTML = "CLICK<br>OR<br>SPACEBAR<br>TO START";
		text.style.animation = "";
		//RESET TO DEFAULT SETTINGS
		//resets the position of the character, and score
		score = 0;
		scoreOutput.innerHTML = score;
		character.style.top = "50%"; //resets the char position
		gravFrame = 0; //resets the gravity
		clearInterval(jumpInterval);
		jumping = false;
		prevGravCharTop = 250;
		jumpFrame = 0;
		clearInterval(startInterval);
		hole.removeEventListener("animationiteration", animationIteration);
		//sets gameState = 0;
		gameState = 0;
	}
}
```
