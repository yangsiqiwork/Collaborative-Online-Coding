import { Injectable } from '@angular/core';

declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any

  constructor() { }

  init(): void {
    this.collaborationSocket = io();
    this.collaborationSocket = io(window.location.origin, { query: 'message=' + '123'})

    this.collaborationSocket.on("message", (message) => {
      console.log("reiceived: " + message);
    })
  }
}
