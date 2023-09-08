import React, { FC, useCallback, useEffect, useRef } from 'react';

const App: FC = () => {
  const workerRef = useRef<Worker>();

  const sendMessageToWorker = useCallback(() => {
    workerRef.current?.postMessage({});
  }, []);

  useEffect(() => {
    workerRef.current = new Worker("/workers/sampleWorker.js");

    workerRef.current?.addEventListener('message', (event) => {
      alert('message received from worker: ' + JSON.stringify(event.data));
    });

    return () => workerRef.current?.terminate();
  }, []);

  return (
    <div>
      <button type="button" onClick={sendMessageToWorker}>
        Send message to worker
      </button>
    </div>
  );
}

export default App;
