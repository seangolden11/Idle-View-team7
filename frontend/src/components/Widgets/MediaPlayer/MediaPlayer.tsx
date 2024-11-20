import ReactPlayer from "react-player";
//import Video from

function MediaPlayer(){
    return(
        <div className="noglobal">
            <div className="video-pkayer">
            <ReactPlayer url = {Video} playing loop muted className = "react-player"/>
            </div>
        </div>
    );
}

export default MediaPlayer;