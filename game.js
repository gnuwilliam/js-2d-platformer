// requestAnimationFrame first
(function() {
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

// Define canvas and get context
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200;

canvas.width = width;
canvas.height = height;

// Define player object
var player = {
    x: width / 2,
    y: height - 5,
    width: 5,
    height: 5,
    speed: 3,
    velX: 0,
    velY: 0,
    jumping: false
};

// init an array of keys to be pressed
var keys = [];

// add friction
var friction = 0.8;

function update () {
    // check for keys
    // --
    // up arrow or space
    if (keys[38] || keys[32]) {
        // jump!
        player.jumping = true;
        player.velY = -player.speed * 2;
    }

    // right arrow
    if (keys[39]) {
        // increase speed to the right
        if (player.velX < player.speed) {
            player.velX++;
        }
    }

    // left arrow
    if (keys[37]) {
        // increase speed to the right
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;

    // move the player
    player.x += player.velX;
    player.y += player.velY;

    // don't allow the player to go outside the canvas
    if (player.x >= width - player.width) {
        player.x = width - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    // draw player
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // do the loop again
    requestAnimationFrame(update);
}

window.addEventListener("load", function () {
    update();
});

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
