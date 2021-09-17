import {StyleSheet} from 'react-native';
import {Colors} from '../../themes/colors';

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  bottomContent: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  scrollView: {
    backgroundColor: Colors.white
  },
  title: {
    color: '#1E2171',
    paddingLeft: 15,
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 25,
  },
  text: {
    color: '#1E2171',
    paddingLeft: 15,
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonRegister: {
    backgroundColor: '#07359A',
    alignItems: 'center',
    marginTop: 84,
    width: 225,
    borderRadius: 20,
  },
  buttonSignin: {
    backgroundColor: '#054DEC',
    alignItems: 'center',
    marginTop: 21,
    width: 225,
    borderRadius: 20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSignDisable: {
    color: Colors.mediumGray,
    fontSize: 18,
    fontWeight: 'bold',
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default styles;
