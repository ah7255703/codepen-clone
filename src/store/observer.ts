import { useSyncExternalStore } from "react";

type Listener = () => void;

export abstract class Observer<DT> {
    data: DT;
    listeners = new Set<Listener>();

    constructor(intialData: DT) {
        this.data = intialData;
    }

    nofity = () => {
        this.listeners.forEach(listener => listener());
    }

    subscribe = (listener: Listener) => {
        this.listeners.add(listener);
        return () => this.unsubscribe(listener);
    }

    unsubscribe = (listener: Listener) => {
        this.listeners.delete(listener);
    }

    update = (data: DT) => {
        this.data = data;
        this.nofity();
    }

    getData = () => this.data;
}

export function useObserver<DT>(observer: Observer<DT>) {
    return useSyncExternalStore(observer.subscribe, observer.getData);
}