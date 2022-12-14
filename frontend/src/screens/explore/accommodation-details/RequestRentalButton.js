import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, useDisclose, isEmptyObj, useToast, Box } from 'native-base';
import ConfirmModal from 'components/confirm-modal';
import { requestRentRoom, selectAccommodationState, resetError, resetRentRequest } from 'store/reducer/accommodation';
import { selectRentingState } from 'store/reducer/renting';
import { useDispatch, useSelector } from 'react-redux';
import CustomToast from 'components/custom-toast';

const RequestRentalButton = (props) => {
  const { item } = props;
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const { rentRequest } = useSelector(selectAccommodationState);
  const { roomInfo } = useSelector(selectRentingState);
  const rentRequestData = rentRequest.data;
  const rentRequestLoading = rentRequest.loading;
  const { error, isSuccess } = rentRequest;
  const dispatch = useDispatch();
  const [buttonProps, setButtonProps] = useState({
    title: 'Yêu cầu thuê phòng',
    disable: false,
  });

  useEffect(() => {
    if (!isEmptyObj(rentRequestData)
      && rentRequestLoading === false
      && Array.isArray(rentRequestData)
      && rentRequestData.some(reqData => reqData.accommodationId === item.id)) {
      setButtonProps({
        title: 'Đã gửi yêu cầu thuê phòng',
        disable: true,
      });
    }
  }, [item.id, rentRequestData, rentRequestLoading]);

  useEffect(() => {
    if (isSuccess) {
      setButtonProps({
        title: 'Đã gửi yêu cầu thuê phòng',
        disable: true,
      })
      toast.show({
        onCloseComplete: () => dispatch(resetError()),
        render: () => <CustomToast description='Chủ trọ sẽ liên lạc với bạn khi yêu cầu được duyệt' title='Yêu cầu thuê phòng thành công!' status='success' />,
        placement: 'top',
      })
    }

    return () => 
      dispatch(resetRentRequest())
  }, [isSuccess, toast, dispatch])
  const onConfirm = () => {
    dispatch(requestRentRoom(item));
  };
  return (
    <>
      {error && toast.show({
        onCloseComplete: () => dispatch(resetError()),
        render: () => <CustomToast description={error.message} title='Xin lỗi bạn' status='error' />,
        placement: 'top'
      })}
      <TouchableOpacity>
        {roomInfo.data && roomInfo.data?.accommodationId === item.id && roomInfo.data?.status === 'RENTING' ? <Box /> : (
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
        )}
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
