//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

//Hero Image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

//Backbone Image
var backboneReady = false;
var backboneImage = new Image();
backboneImage.onload = function () {
	backboneReady = true;
};
backboneImage.src = "images/backbone.png";

//Git Image
var gitReady = false;
var gitImage = new Image();
gitImage.onload = function () {
	gitReady = true;
};
gitImage.src = "images/git.png";

//Html5 Image
var html5Ready = false;
var html5Image = new Image();
html5Image.onload = function () {
	html5Ready = true;
};
html5Image.src = "images/html5.png";

//jQuery Image
var jqueryReady = false;
var jqueryImage = new Image();
jqueryImage.onload = function () {
	jqueryReady = true;
};
jqueryImage.src = "images/jquery.png";

//Postgresql Image
var postgresqlReady = false;
var postgresqlImage = new Image();
postgresqlImage.onload = function () {
	postgresqlReady = true;
};
postgresqlImage.src = "images/postgresql.png";

//Rails Image
var railsReady = false;
var railsImage = new Image();
railsImage.onload = function () {
	railsReady = true;
};
railsImage.src = "images/rails.png";

//Ruby Image
var rubyReady = false;
var rubyImage = new Image();
rubyImage.onload = function () {
	rubyReady = true;
};
rubyImage.src = "images/ruby.png";

//Game objects
var hero = {
	speed: 256,
	x: 0,
	y: 0
};
var skill = {
	x: 0,
	y: 0,
	currentSkill: 1
};
var skillsAcquired = 0;

//Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Reset the game when the player catches a skill
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	
	//Throw the skill somewhere on the screen randomly
	skill.x = 32 + (Math.random() * (canvas.width - 64));
	skill.y = 32 + (Math.random() * (canvas.height - 64));
	
	//Randomize skill to appear on the screen
	skill.currentSkill = Math.floor((Math.random()*7)+1);
};

//Update game objects
var update = function (modifier) {
	if (38 in keysDown) {
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) {
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) {
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) {
		hero.x += hero.speed * modifier;
	}
	
	//Are they touching?
	if (
		hero.x <= (skill.x + 32)
		&& skill.x <= (hero.x + 32)
		&& hero.y <= (skill.y + 32)
		&& skill.y <= (hero.y + 32)
	) {
		++skillsAcquired;
		reset();
	}
};

//Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (backboneReady && skill.currentSkill == 1) {
		ctx.drawImage(backboneImage, skill.x, skill.y);
	}
	if (gitReady && skill.currentSkill == 2) {
		ctx.drawImage(gitImage, skill.x, skill.y);
	}
	if (html5Ready && skill.currentSkill == 3) {
		ctx.drawImage(html5Image, skill.x, skill.y);
	}
	if (jqueryReady && skill.currentSkill == 4) {
		ctx.drawImage(jqueryImage, skill.x, skill.y);
	}
	if (postgresqlReady && skill.currentSkill == 5) {
		ctx.drawImage(postgresqlImage, skill.x, skill.y);
	}
	if (railsReady && skill.currentSkill == 6) {
		ctx.drawImage(railsImage, skill.x, skill.y);
	}
	if (rubyReady && skill.currentSkill == 7) {
		ctx.drawImage(rubyImage, skill.x, skill.y);
	}
	
	//Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Skills Acquired: " + skillsAcquired, 32, 32);
	
	if (skillsAcquired >= 10) {
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.beginPath();
		ctx.arc(420,50,17,0,2*Math.PI);
		ctx.fill();

		ctx.font = "12px Helvetica";
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillText("10",413,42);
	}
	if (skillsAcquired >= 25) {
		ctx.fillStyle = "rgb(221, 255, 255)";
		ctx.beginPath();
		ctx.arc(440,50,17,0,2*Math.PI);
		ctx.fill();

		ctx.font = "12px Helvetica";
		ctx.fillStyle = "rgb(34, 34, 34)";
		ctx.fillText("25",433,42);
	}
	if (skillsAcquired >= 50) {
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.beginPath();
		ctx.arc(460,50,17,0,2*Math.PI);
		ctx.fill();

		ctx.font = "12px Helvetica";
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillText("50",452,42);
		ctx.font = "24px Helvetica";
		ctx.fillText("You Have Acquired The Skills To Be An",44,180);
		ctx.fillText("App Academy Champ Congratulations!",44,210);
	}
	
};

//The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000);
	render();
	
	then = now;
};

//Play the game
reset();
var then = Date.now();
setInterval(main, 1);

