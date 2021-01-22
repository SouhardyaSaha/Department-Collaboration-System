import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  connectSocket() {
    const socket = io('http://localhost:3000', {
      // reconnectionDelayMax: 10000,
      // auth: {
      //   token: '123',
      // },
      // query: {
      //   'my-key': 'my-value',
      // },
    });
  }
}
