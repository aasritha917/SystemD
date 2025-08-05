
interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Sending EMAIL: ${message}`);
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

class PushNotification implements Notification {
  send(message: string): void {
    console.log(`Sending PUSH Notification: ${message}`);
  }
}

class NotificationFactory {
  static createNotification(type: "Email" | "SMS" | "Push"): Notification {
    switch (type) {
      case "Email":
        return new EmailNotification();
      case "SMS":
        return new SMSNotification();
      case "Push":
        return new PushNotification();
      default:
        throw new Error(`Unsupported notification type: ${type}`);
    }
  }
}

// Usage
const notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!"); // Output: Sending EMAIL: Welcome!
