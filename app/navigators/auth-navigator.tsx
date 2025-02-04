import {AppRoute} from "@navigators/navigation-type";
import {login, verifyPhone, verifyOTP, createProfile, landingPage, forgotPassword, termsConds} from "@screens/auth";

const screens: AppRoute[] = [
  {
    name: 'login',
    component: login,
  },
  {
    name: 'verifyPhone',
    component: verifyPhone,
  },
  {
    name: 'verifyOTP',
    component: verifyOTP,
  },
  {
    name: 'createProfile',
    component: createProfile,
  },
  {
    name: 'landingPage',
    component: landingPage,
  },
  {
    name: 'forgotPassword',
    component: forgotPassword,
  },
  {
    name: 'termsConds',
    component: termsConds,
  },
];

export type NavigatorParamList = {
  login: undefined;
  verifyPhone: undefined;
  verifyOTP: undefined;
  createProfile: {
    isFromVerifyOtp: boolean
  };
  landingPage: undefined;
  forgotPassword: undefined
  termsConds: undefined
};

export default screens
