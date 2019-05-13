/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { WebView } from 'react-native';

const VideoDetail = (props) => {
  // what an annoyingly long path
  const { videoId } = props.navigation.state.params.video.id;
  return (
    <WebView
      source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
      automaticallyAdjustContentInsets={false}
    />
  );
};

export default VideoDetail;
