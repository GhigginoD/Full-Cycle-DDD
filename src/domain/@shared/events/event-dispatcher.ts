import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface{
  eventHandlers: {[evenNname: string]: EventHandlerInterface[]} = {}

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if(!this.eventHandlers[eventName]){
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }
  notify(event: EventInterface): void {
    throw new Error("Method not implemented.");
  }
  unregister(eventName: string): void {
    throw new Error("Method not implemented.");
  }
  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }

}