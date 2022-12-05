import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, useDisclose, isEmptyObj, useToast } from 'native-base';
import ConfirmModal from 'components/confirm-modal';
import { requestRentRoom, selectAccommodationState } from 'store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';

const RequestRentalButton = (props) => {
  const { item } = props;
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const { rentRequest, error } = useSelector(selectAccommodationState);
  const rentRequestData = rentRequest.data;
  const rentRequestLoading = rentRequest.loading;
  const [buttonProps, setButtonProps] = useState({
    title: 'Yêu cầu thuê phòng',
    disable: false,
  });
  useEffect(() => {
    if (!isEmptyObj(rentRequestData) && rentRequestData.accommodationId === item.id) {
      setButtonProps({
        title: 'Đã gửi yêu cầu thuê phòng',
        disable: true,
      });
    }
  }, [item.id, rentRequestData]);
  useEffect(() => {
    if (isEmptyObj(error)) return;
    toast.show({
      description: error.message,
    });
  }, [error, toast]);
  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(requestRentRoom(item));
  };
  return (
    <>
      <TouchableOpacity>
        <Button
          bgColor="tertiary.600"
          height="16"
          _text={{
            color: 'white',
            fontSize: 'xl',
            fontWeight: 'bold',
          }}
          isDisabled={buttonProps.disable}
          _disabled={{
            opacity: 0.4,
          }}
          isLoading={rentRequestLoading}
          onPress={onOpen}
          _pressed={{
            opacity: 0.8,
          }}
        >
          {buttonProps.title}
        </Button>
      </TouchableOpacity>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        cancelTitle="Hủy"
        headerTitle="Bạn chắc chắn muốn thuê phòng này"
        content="Sau khi nhấn “Đồng ý”, yêu cầu thuê phòng của bạn sẽ chờ được chủ trọ duyệt. Trước khi được duyệt, bạn có thể hủy yêu cầu bất cứ lúc nào."
        saveTitle="Đồng ý"
      />
    </>
  );
};

export default RequestRentalButton;
