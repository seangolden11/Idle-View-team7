const spawn = require('child_process').spawn;
const Service = require('webos-service');

// 서비스 등록
const service = new Service("com.idle_view_app.media.service");

let currentPlayer = null;

service.register("startPlayback", (message) => {
    const videoUrl = message.payload.videoUrl;

    if (currentPlayer) {
        message.respond({ returnValue: false, message: "Playback already in progress" });
        return;
    }

    // ffmpeg 실행
    currentPlayer = spawn('ffmpeg', ['-i', videoUrl, '-f', 'null', '-']);

    currentPlayer.on('exit', (code) => {
        console.log(`Playback finished with code ${code}`);
        currentPlayer = null;
    });

    message.respond({ returnValue: true, message: "Playback started" });
});

service.register("stopPlayback", (message) => {
    if (currentPlayer) {
        currentPlayer.kill();
        currentPlayer = null;
        message.respond({ returnValue: true, message: "Playback stopped" });
    } else {
        message.respond({ returnValue: false, message: "No playback in progress" });
    }
});

service.register("status", (message) => {
    const isPlaying = currentPlayer !== null;
    message.respond({ returnValue: true, isPlaying });
});
