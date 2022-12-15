import React, { useState, useEffect } from "react";
import { Box, HStack, Text, Modal, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const ReviewModal = (props) => {
  const { isOpen, onClose, onConfirm, review } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    setSelectedIndex(-1);
  }, [isOpen])
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Đánh giá nhà trọ</Modal.Header>
        <Modal.Body>
          <Box
            alignItems='center'
          >
            <Text marginBottom='2'>Bạn cảm thấy nhà trọ như thế nào?</Text>
            <HStack
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              space={2}
            >
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setSelectedIndex(index)}
                  >
                    <Ionicons
                      name={index <= selectedIndex ? "star-sharp": "star-outline"}
                      color={index <= selectedIndex ? "#059669": "#000"}
                      size={24}
                    />
                  </TouchableOpacity>
                )
              })}
            </HStack>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Hủy
            </Button>
            <Button 
              bgColor='tertiary.600'
              isLoading={review.loading}
              onPress={() => {
              onConfirm(selectedIndex + 1);
              onClose();
            }}>
              Lưu kết quả
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default ReviewModal;