self.onmessage = (e: MessageEvent<string>) => {
    self.postMessage("hello, world from the worker");
};

