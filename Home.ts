interface LightState {
  turnOn(): void;
  turnOff(): void;
  detectMotion(): void;
  adjustBrightness(): void;
}

class SmartLight {
  private state: LightState;

  constructor(
    private offState: LightState,
    private onState: LightState,
    private motionState: LightState,
    private brightnessState: LightState
  ) {
    this.state = offState;
  }

  setState(state: LightState) {
    this.state = state;
  }

  getOffState() {
    return this.offState;
  }

  getOnState() {
    return this.onState;
  }

  getMotionState() {
    return this.motionState;
  }

  getBrightnessState() {
    return this.brightnessState;
  }

  turnOn() {
    this.state.turnOn();
  }

  turnOff() {
    this.state.turnOff();
  }

  detectMotion() {
    this.state.detectMotion();
  }

  adjustBrightness() {
    this.state.adjustBrightness();
  }
}

class OffState implements LightState {
  constructor(private light: SmartLight) {}
  turnOn() {
    console.log("Light turned on manually.");
    this.light.setState(this.light.getOnState());
  }
  turnOff() {
    console.log("Light already off.");
  }
  detectMotion() {
    console.log("Motion detected. Turning on light.");
    this.light.setState(this.light.getMotionState());
  }
  adjustBrightness() {
    console.log("Light is off. No brightness adjustment.");
  }
}

class OnState implements LightState {
  constructor(private light: SmartLight) {}
  turnOn() {
    console.log("Light already on.");
  }
  turnOff() {
    console.log("Light turned off.");
    this.light.setState(this.light.getOffState());
  }
  detectMotion() {
    console.log("Motion detected but light already on.");
  }
  adjustBrightness() {
    console.log("Switching to brightness adjustment state.");
    this.light.setState(this.light.getBrightnessState());
  }
}

class MotionDetectionState implements LightState {
  constructor(private light: SmartLight) {}
  turnOn() {
    console.log("Light already on due to motion.");
  }
  turnOff() {
    console.log("Light turned off.");
    this.light.setState(this.light.getOffState());
  }
  detectMotion() {
    console.log("Motion detected. Light remains on.");
  }
  adjustBrightness() {
    console.log("Switching to brightness adjustment state.");
    this.light.setState(this.light.getBrightnessState());
  }
}

class BrightnessAdjustmentState implements LightState {
  constructor(private light: SmartLight, private isDaytime: boolean) {}
  turnOn() {
    console.log("Light already on. Adjusting brightness.");
  }
  turnOff() {
    console.log("Light turned off.");
    this.light.setState(this.light.getOffState());
  }
  detectMotion() {
    console.log("Motion detected. Brightness remains adjusted.");
  }
  adjustBrightness() {
    if (this.isDaytime) console.log("Brightness reduced for daytime.");
    else console.log("Brightness increased for nighttime.");
  }
}

const light = new SmartLight(
  new OffState(null as any),
  new OnState(null as any),
  new MotionDetectionState(null as any),
  new BrightnessAdjustmentState(null as any, true)
);

(light as any).offState = new OffState(light);
(light as any).onState = new OnState(light);
(light as any).motionState = new MotionDetectionState(light);
(light as any).brightnessState = new BrightnessAdjustmentState(light, false);

light.turnOn();
light.adjustBrightness();
light.detectMotion();
light.turnOff();
