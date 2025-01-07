import React, { useState, useEffect } from 'react';
import "./Video.css"
// const VideoGallery = () => {
 
//   const [videos, setVideos] = useState([
//     "https://dmsl-vlab.s3.ap-south-1.amazonaws.com/Assignment_5.mp4"
//   ]);



//   return (
//     <div className="video-gallery">
//       {videos.map((videoUrl, index) => (
//         <div key={index} className="video-container">
//           <video width="600" controls>
//             <source src={videoUrl} type="video/mp4" />
//           </video>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoGallery;

const VideoGallery = ({ id }) => {
  const defaultVideoUrl = "https://dmsl-vlab.s3.ap-south-1.amazonaws.com/Assignment_5.mp4";

  const [videos, setVideos] = useState([
    `https://dmsl-vlab.s3.ap-south-1.amazonaws.com/Assignment_${id}.mp4`
  ]);
<<<<<<< HEAD
=======

  const handleVideoError = (index) => {

    setVideos((prevVideos) => {
      const updatedVideos = [...prevVideos];
      updatedVideos[index] = defaultVideoUrl;
      return updatedVideos;
    });
  };

>>>>>>> 3709fab408143d2e2f1af7ddad66cec89df0be2c
  return (
    <div className="video-gallery">
      {videos.map((videoUrl, index) => (
        <div key={index} className="video-container">
          <video
            width="600"
            controls
            onError={() => handleVideoError(index)} 
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
