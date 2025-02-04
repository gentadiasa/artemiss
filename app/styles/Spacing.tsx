import {ms} from 'react-native-size-matters';
import { Dimensions } from 'react-native';

const Spacing = {
  '1': ms(1),
  '2': ms(2),
  '3': ms(3),
  '4': ms(4),
  '5': ms(5),
  '6': ms(6),
  '8': ms(8),
  '10': ms(10),
  '12': ms(12),
  '14': ms(14),
  '16': ms(16),
  '18': ms(18),
  '20': ms(20),
  '22': ms(22),
  '24': ms(24),
  '28': ms(28),
  '32': ms(32),
  '36': ms(36),
  '42': ms(42),
  '48': ms(48),
  '52': ms(52),
  '54': ms(54),
  '60': ms(60),
  '64': ms(64),
  '67': ms(67),
  '72': ms(72),
  '84': ms(84),
  '96': ms(96),
  '100': ms(100),
  '112': ms(112),
  '128': ms(128),
  '144': ms(144),
  '160': ms(160),
  '256': ms(256),
  '320': ms(320),
  '480': ms(480),
};

export const CustomSpacing = ms;

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeightScreen = Dimensions.get('screen').height;
export const deviceWidthScreen = Dimensions.get('screen').width;

// responsive
export const rHeight = (h: number) => {
  return deviceHeight * (h / 100);
};
export const rWidth = (w: number) => {
  return deviceWidth * (w / 100);
};

export default Spacing;
