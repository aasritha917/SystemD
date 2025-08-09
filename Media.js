var PlayState = /** @class */ (function () {
    function PlayState() {
    }
    PlayState.prototype.play = function (player) {
        console.log("Already playing");
    };
    PlayState.prototype.pause = function (player) {
        console.log("Pausing...");
        player.setState(new PauseState());
    };
    PlayState.prototype.stop = function (player) {
        console.log("Stopping...");
        player.setState(new StopState());
    };
    return PlayState;
}());
var PauseState = /** @class */ (function () {
    function PauseState() {
    }
    PauseState.prototype.play = function (player) {
        console.log("Resuming play...");
        player.setState(new PlayState());
    };
    PauseState.prototype.pause = function (player) {
        console.log("Already paused");
    };
    PauseState.prototype.stop = function (player) {
        console.log("Stopping...");
        player.setState(new StopState());
    };
    return PauseState;
}());
var StopState = /** @class */ (function () {
    function StopState() {
    }
    StopState.prototype.play = function (player) {
        console.log("Starting from beginning...");
        player.setState(new PlayState());
    };
    StopState.prototype.pause = function (player) {
        console.log("Cannot pause. Media is stopped.");
    };
    StopState.prototype.stop = function (player) {
        console.log("Already stopped");
    };
    return StopState;
}());
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer() {
        this.state = new StopState();
    }
    MediaPlayer.prototype.setState = function (state) {
        this.state = state;
    };
    MediaPlayer.prototype.play = function () {
        this.state.play(this);
    };
    MediaPlayer.prototype.pause = function () {
        this.state.pause(this);
    };
    MediaPlayer.prototype.stop = function () {
        this.state.stop(this);
    };
    return MediaPlayer;
}());
var player = new MediaPlayer();
player.play();
player.pause();
player.play();
player.stop();
player.pause();
