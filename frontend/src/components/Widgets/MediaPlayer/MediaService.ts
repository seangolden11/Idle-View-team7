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

      bridge.call("luna://com.idle_view_app.media.service/startPlayback", JSON.stringify({
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

      bridge.call("luna://com.idle_view_app.media.service/stopPlayback", "{}");
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

      bridge.call("luna://com.idle_view_app.media.service/status", "{}");
  });
};
