import React, { useState, useEffect } from 'react';
import "./Video.css"
const VideoGallery = () => {
 
  const [videos, setVideos] = useState([
    "https://dmsl-vlab.s3.ap-south-1.amazonaws.com/Assignment_5.mp4"
  ]);



  return (
    <div className="video-gallery">
      {videos.map((videoUrl, index) => (
        <div key={index} className="video-container">
          <video width="600" controls>
            <source src={videoUrl} type="video/mp4" />
           
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
