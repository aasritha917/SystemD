interface PlayerState {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
}

class PlayState implements PlayerState {
  play(player: MediaPlayer): void {
    console.log("Already playing");
  }
  pause(player: MediaPlayer): void {
    console.log("Pausing...");
    player.setState(new PauseState());
  }
  stop(player: MediaPlayer): void {
    console.log("Stopping...");
    player.setState(new StopState());
  }
}

class PauseState implements PlayerState {
  play(player: MediaPlayer): void {
    console.log("Resuming play...");
    player.setState(new PlayState());
  }
  pause(player: MediaPlayer): void {
    console.log("Already paused");
  }
  stop(player: MediaPlayer): void {
    console.log("Stopping...");
    player.setState(new StopState());
  }
}

class StopState implements PlayerState {
  play(player: MediaPlayer): void {
    console.log("Starting from beginning...");
    player.setState(new PlayState());
  }
  pause(player: MediaPlayer): void {
    console.log("Cannot pause. Media is stopped.");
  }
  stop(player: MediaPlayer): void {
    console.log("Already stopped");
  }
}

class MediaPlayer {
  private state: PlayerState;
  constructor() {
    this.state = new StopState();
  }
  setState(state: PlayerState) {
    this.state = state;
  }
  play() {
    this.state.play(this);
  }
  pause() {
    this.state.pause(this);
  }
  stop() {
    this.state.stop(this);
  }
}

const player = new MediaPlayer();
player.play();
player.pause();
player.play();
player.stop();
player.pause();
