class RecordingListeners {
  constructor() {
    this.chunks = [];
    this.recorder = null;
  }

  static assignListeners(recorder, ...listeners) {
    listeners.forEach(listener => {
      recorder[listener.event] = listener.handler;
    });
    return recorder;
  }

  setRecorder = recorder => {
    const recorderWithListeners = RecordingListeners.assignListeners(
      recorder,
      {
        event: 'onstop',
        handler: this.onStop,
      },
      {
        event: 'onstart',
        handler: this.onStart,
      },
      {
        event: 'ondataavailable',
        handler: this.onDataAvailable,
      }
    );
    this.recorder = recorderWithListeners;
  };

  onStop = e => {
    console.log('stopped!');
  };

  onStart = e => {
    console.log('started!');
  };

  onDataAvailable = e => {
    console.log('onDataAvailable!');
  };
}

export default RecordingListeners;
