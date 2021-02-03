import socketio from 'socket.io';

export class SocketIoConnectionDevice {
  private socket: socketio.Socket;

  constructor(socket: socketio.Socket) {
    this.socket = socket;
  }

  async handle(): Promise<socketio.Socket> {
    return this.socket;
  }
}
