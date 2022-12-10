import React, { useEffect, useState } from 'react';
import request from 'utils/axios';
import Loading from 'components/loading';
import { Center, Flex, Heading, VStack } from 'native-base';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import roomStatusConstanst from 'utils/roomStatus';

const mapRoomStatusToText = (status) => {
  switch (status) {
    case 'AVAILABLE':
      return 'Còn trống';
    case 'RENTING':
      return 'Đã thuê';
    default:
      return 'Không xác định';
  }
};

function mapRoomStatusToColor(status) {
  switch (status) {
    case 'AVAILABLE':
      return '#00b894';
    case 'RENTING':
      return '#d63031';
    default:
      return '#00b894';
  }
}

const roomStatus = Object.values(roomStatusConstanst);

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const AdminRoomStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [chartData, setChartData] = useState([]);
  // since everything is in the same component, we can use useEffect to fetch data without using redux
  useEffect(() => {
    setLoading(true);
    request
      .get('/statistics/rooms')
      .then((res) => {
        setChartData(
          roomStatus.map((status) => ({
            name: mapRoomStatusToText(status),
            count: res.data.rooms.filter((room) => room.status === status).length,
            color: mapRoomStatusToColor(status),
            legendFontColor: '#7F7F7F',
            lengendFontSize: 24,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  if (loading) return <Loading />;

  return error ? (
    <Flex alignItems="center" justifyContent="center">
      {error.message}
    </Flex>
  ) : (
    <VStack pt={4}>
      <VStack>
        <Center py={4} bg="#fff">
          <Heading> Số lượng phòng </Heading>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width} // from react-native
            height={300}
            chartConfig={chartConfig}
            paddingLeft="30"
            center={[10, 0]}
            accessor="count"
            backgroundColor="transparent"
            absolute
          />
        </Center>
      </VStack>
    </VStack>
  );
};

export default AdminRoomStatistics;
