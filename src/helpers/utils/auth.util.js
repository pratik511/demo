import { STORAGEKEY } from "./app.config";
import localStore from "./localstore.util";

export const getUserInfo = () => localStore.get_data(STORAGEKEY.userData);

export const setUserInfo = (data) => localStore.store_data(STORAGEKEY.userData, data);

export const getUserLogin = () => localStore.get_data(STORAGEKEY.islogin);

export const userLogin = (data) => localStore.store_data(STORAGEKEY.islogin, data);

export const logout = () => {
  localStore.remove_data(STORAGEKEY.islogin);
  return true;
};

export const isLoggedIn = () => {
  const islogin = getUserLogin();
  return islogin ? true : false;
};

