import React from 'react';
import ImageView from 'react-native-image-viewing';
import { Box, Text } from 'native-base';


const CounterCurrentShow = (props) => {
  const { currentIndex, totalImage } = props;
  return (
    <Box
      bgColor='coolGray.200'
      marginBottom='8'
      width='12'
      alignItems='center'
      marginX='auto'
      rounded='full'
    >
      <Text>{`${currentIndex+1}/${totalImage}`}</Text>
    </Box>
  )
}

const ImagePreview = (props) => {
  const { images, currentIndex, visible, setVisible } = props;
  return (
    <ImageView
      images={images}
      imageIndex={currentIndex}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      FooterComponent={(params) => <CounterCurrentShow currentIndex={params.imageIndex} totalImage={images.length}/>}
    />
  )
}

export default ImagePreview

