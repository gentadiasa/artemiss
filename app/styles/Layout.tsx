import {StyleSheet} from 'react-native';

const LayoutStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexBottom: {
    justifyContent: 'flex-end',
  },
  flexCenter: {
    alignItems: 'center',
  },
  flexCenterMid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexMid: {
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },

  flexRowAround: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexRowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexTopCenter: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  flexTrailing: {
    alignItems: 'flex-end',
  },
  flexWrapTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  heightFull: {
    height: '100%'
  },
  widthFull: {
    width: '100%'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default LayoutStyles;
