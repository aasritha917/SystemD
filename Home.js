var SmartLight = /** @class */ (function () {
    function SmartLight(offState, onState, motionState, brightnessState) {
        this.offState = offState;
        this.onState = onState;
        this.motionState = motionState;
        this.brightnessState = brightnessState;
        this.state = offState;
    }
    SmartLight.prototype.setState = function (state) {
        this.state = state;
    };
    SmartLight.prototype.getOffState = function () {
        return this.offState;
    };
    SmartLight.prototype.getOnState = function () {
        return this.onState;
    };
    SmartLight.prototype.getMotionState = function () {
        return this.motionState;
    };
    SmartLight.prototype.getBrightnessState = function () {
        return this.brightnessState;
    };
    SmartLight.prototype.turnOn = function () {
        this.state.turnOn();
    };
    SmartLight.prototype.turnOff = function () {
        this.state.turnOff();
    };
    SmartLight.prototype.detectMotion = function () {
        this.state.detectMotion();
    };
    SmartLight.prototype.adjustBrightness = function () {
        this.state.adjustBrightness();
    };
    return SmartLight;
}());
var OffState = /** @class */ (function () {
    function OffState(light) {
        this.light = light;
    }
    OffState.prototype.turnOn = function () {
        console.log("Light turned on manually.");
        this.light.setState(this.light.getOnState());
    };
    OffState.prototype.turnOff = function () {
        console.log("Light already off.");
    };
    OffState.prototype.detectMotion = function () {
        console.log("Motion detected. Turning on light.");
        this.light.setState(this.light.getMotionState());
    };
    OffState.prototype.adjustBrightness = function () {
        console.log("Light is off. No brightness adjustment.");
    };
    return OffState;
}());
var OnState = /** @class */ (function () {
    function OnState(light) {
        this.light = light;
    }
    OnState.prototype.turnOn = function () {
        console.log("Light already on.");
    };
    OnState.prototype.turnOff = function () {
        console.log("Light turned off.");
        this.light.setState(this.light.getOffState());
    };
    OnState.prototype.detectMotion = function () {
        console.log("Motion detected but light already on.");
    };
    OnState.prototype.adjustBrightness = function () {
        console.log("Switching to brightness adjustment state.");
        this.light.setState(this.light.getBrightnessState());
    };
    return OnState;
}());
var MotionDetectionState = /** @class */ (function () {
    function MotionDetectionState(light) {
        this.light = light;
    }
    MotionDetectionState.prototype.turnOn = function () {
        console.log("Light already on due to motion.");
    };
    MotionDetectionState.prototype.turnOff = function () {
        console.log("Light turned off.");
        this.light.setState(this.light.getOffState());
    };
    MotionDetectionState.prototype.detectMotion = function () {
        console.log("Motion detected. Light remains on.");
    };
    MotionDetectionState.prototype.adjustBrightness = function () {
        console.log("Switching to brightness adjustment state.");
        this.light.setState(this.light.getBrightnessState());
    };
    return MotionDetectionState;
}());
var BrightnessAdjustmentState = /** @class */ (function () {
    function BrightnessAdjustmentState(light, isDaytime) {
        this.light = light;
        this.isDaytime = isDaytime;
    }
    BrightnessAdjustmentState.prototype.turnOn = function () {
        console.log("Light already on. Adjusting brightness.");
    };
    BrightnessAdjustmentState.prototype.turnOff = function () {
        console.log("Light turned off.");
        this.light.setState(this.light.getOffState());
    };
    BrightnessAdjustmentState.prototype.detectMotion = function () {
        console.log("Motion detected. Brightness remains adjusted.");
    };
    BrightnessAdjustmentState.prototype.adjustBrightness = function () {
        if (this.isDaytime)
            console.log("Brightness reduced for daytime.");
        else
            console.log("Brightness increased for nighttime.");
    };
    return BrightnessAdjustmentState;
}());
var light = new SmartLight(new OffState(null), new OnState(null), new MotionDetectionState(null), new BrightnessAdjustmentState(null, true));
light.offState = new OffState(light);
light.onState = new OnState(light);
light.motionState = new MotionDetectionState(light);
light.brightnessState = new BrightnessAdjustmentState(light, false);
light.turnOn();
light.adjustBrightness();
light.detectMotion();
light.turnOff();
