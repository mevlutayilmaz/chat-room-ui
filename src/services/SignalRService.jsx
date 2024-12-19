import { HubConnectionBuilder } from '@microsoft/signalr';
import AuthService from './AuthService';

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection() {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7283/chathub", {
          accessTokenFactory: () => AuthService.getAccessToken()
        })
        .build();
        
      try {
        await this.connection.start();
        console.log("SignalR connected!");
      } catch (error) {
        console.error("SignalR connection failed: ", error);
      }
    }
  }

  getConnection() {
    if (!this.connection) {
      throw new Error("SignalR connection has not been initialized. Call startConnection first.");
    }
    return this.connection;
  }

  async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      console.log("SignalR connection stopped.");
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;