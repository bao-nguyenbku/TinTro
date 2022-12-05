import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import ConfirmModal from 'components/confirm-modal';
import { useDisclose } from 'native-base';
import { requestRentRoom } from 'store/reducer/accommodation';
import { useDispatch } from 'react-redux';

const RequestRentalButton = (props) => {
  const { item } = props;
  const { isOpen, onOpen, onClose } = useDisclose();
  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(requestRentRoom(item));
  }
  return (
    <>
      <TouchableOpacity>
        <Button
          bgColor='tertiary.600'
          height='16'
          _text={{
            color: 'white',
            fontSize: 'xl',
            fontWeight: 'bold'
          }}
          onPress={onOpen}
          _pressed={{
            opacity: 0.8
          }}
        >Yêu cầu thuê phòng</Button>
      </TouchableOpacity>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        cancelTitle='Hủy'
        headerTitle='Bạn chắc chắn muốn thuê phòng này'
        content='Sau khi nhấn “Đồng ý”, yêu cầu thuê phòng của bạn sẽ chờ được chủ trọ duyệt. Trước khi được duyệt, bạn có thể hủy yêu cầu bất cứ lúc nào.'
        saveTitle='Đồng ý'
      />
    </>
  )
}

export default RequestRentalButton;
