import React from 'react';
import { WebView } from 'react-native-webview';

const VideoWebView = ({ route }) => {
  const { videoUrl } = route.params;
  return <WebView source={{ uri: videoUrl }} style={{ flex: 1 }} />;
};

export default VideoWebView;
