import Content from '@/components/Content';
import { View } from 'react-native';

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-aaa',
    title: 'Fourth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-sss',
    title: 'Fifth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-dddd',
    title: 'Sixth Item',
  },
];

export default function TestScreen() {
  return (
    <View>
      <Content data={data} />
    </View>
  );
}
