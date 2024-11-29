export const startPlayback = (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
      const bridge = new WebOSServiceBridge();

      bridge.onservicecallback = (response: string) => {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse.returnValue) {
              resolve(parsedResponse.message);
          } else {
              reject(parsedResponse.message || "Failed to start playback");
          }
      };

      bridge.call("luna://com.example.idleview.service/startPlayback", JSON.stringify({
          videoUrl
      }));
  });
};

export const stopPlayback = (): Promise<string> => {
  return new Promise((resolve, reject) => {
      const bridge = new WebOSServiceBridge();

      bridge.onservicecallback = (response: string) => {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse.returnValue) {
              resolve(parsedResponse.message);
          } else {
              reject(parsedResponse.message || "Failed to stop playback");
          }
      };

      bridge.call("luna://com.example.idleview.service/stopPlayback", "{}");
  });
};

export const getStatus = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
      const bridge = new WebOSServiceBridge();

      bridge.onservicecallback = (response: string) => {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse.returnValue) {
              resolve(parsedResponse.isPlaying);
          } else {
              reject("Failed to get playback status");
          }
      };

      bridge.call("luna://com.example.idleview.service/status", "{}");
  });
};
