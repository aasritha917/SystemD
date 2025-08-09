// State interface
interface TrafficLightState {
  change(light: TrafficLight): void;
  report(): void;
}

// Red State
class RedState implements TrafficLightState {
  change(light: TrafficLight): void {
    console.log("Changing from RED to GREEN...");
    light.setState(new GreenState());
  }
  report(): void {
    console.log("🔴 Red Light - Vehicles must stop.");
  }
}

// Green State
class GreenState implements TrafficLightState {
  change(light: TrafficLight): void {
    console.log("Changing from GREEN to YELLOW...");
    light.setState(new YellowState());
  }
  report(): void {
    console.log("🟢 Green Light - Vehicles can move.");
  }
}

// Yellow State
class YellowState implements TrafficLightState {
  change(light: TrafficLight): void {
    console.log("Changing from YELLOW to RED...");
    light.setState(new RedState());
  }
  report(): void {
    console.log("🟡 Yellow Light - Vehicles should slow down.");
  }
}

// Traffic Light Context
class TrafficLight {
  private state: TrafficLightState;

  constructor() {
    this.state = new RedState(); // Initial state
  }

  setState(state: TrafficLightState): void {
    this.state = state;
  }

  change(): void {
    this.state.change(this);
  }

  report(): void {
    this.state.report();
  }
}

// Example Usage
const trafficLight = new TrafficLight();

trafficLight.report(); 
trafficLight.change();
trafficLight.report(); 
trafficLight.change();
trafficLight.report(); 
trafficLight.change();
trafficLight.report(); 
