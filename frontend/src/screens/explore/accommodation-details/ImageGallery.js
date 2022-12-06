import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, Image, HStack, ScrollView } from 'native-base';
import ImagePreview from './ImagePreview';

const ImageGallery = (props) => {
  const { images } = props;
  const [visible, setVisible] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePressGalleryImg = (imageIndex) => {
    setCurrentIndex(imageIndex);
    setVisible(true);
  }
  return (
    <Box marginTop='2'>
      <Text fontSize='lg' fontWeight='700'>Thư viện ảnh</Text>
      <ScrollView
       horizontal
      >
        <HStack
          space={2}
        >
          {images && images.map((item, index) => {
            return (
              <TouchableOpacity
                key={item}
                onPress={() => handlePressGalleryImg(index)}
              >
                <Image 
                  source={{
                    uri: item
                  }}
                  alt='gallery-img'
                  width={70}
                  height={70}
                  rounded='xl'
                />
              </TouchableOpacity>
            )
          })}
        </HStack>
      </ScrollView>
      <ImagePreview
        images={images.map(item => ({ uri: item }))}
        visible={visible}
        currentIndex={currentIndex}
        setVisible={setVisible}
      />
    </Box>
  )
}

export default ImageGallery;
