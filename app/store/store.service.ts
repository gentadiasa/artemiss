// #region IMPORTS
import * as storage from "@utils/storage"

// PACKAGE IMPORTS
import {makeAutoObservable} from 'mobx';
import {ACCESS_TOKEN_KEY, LAST_SEEN_FEED} from "./types.store";
import {Api} from "@services/api";

// #endregion


// #region MAIN CLASS

export default class ServiceStore {
  // #region PROPERTIES

  api: Api
  accessToken = '';
  refreshToken = '';
  rehydrated = false;

  // #endregion

  lastSeenFeed = '';

  // #region CONSTRUCTOR

  constructor(api: Api) {

    console.log('init store')

    this.api = api

    makeAutoObservable(this);

    this.initToken();
    this.initLastSeenFeed();
    // this.api.apisauce.addMonitor(response => this.responseMonitor(response, this.clearTokens))
  }

  private async responseMonitor(response: any, clearTokens) {
    console.log('Response Monitor')
    console.log(response.status)

    const { ok, status } = response;

    if (!ok && status === 401) {
      await this.initToken();
      console.log('Token Expired gan!')
      try {
        await clearTokens()
      } catch (e){
        console.log(e)
        console.log('Clear Token Error')
      } finally {
        console.log('Token Cleared')
        // clearHeaderToken()
      }
      // should be back to login screen
    }

    // TODO Add network error or timeout state (?)
  }

  setRehydrated(value: boolean) {
    console.log('start setRehydrated');

    this.rehydrated = value;

    console.log('end setRehydrated');
  }

  // #endregion

  // #region ACTIONS

  // #region TOKENS


  // eslint-disable-next-line class-methods-use-this
  setHeaderToken(token: string) {
    this.api.setToken(token)
  }

  // eslint-disable-next-line class-methods-use-this
  clearHeaderToken() {
    this.api.removeToken()
  }

  private async initToken() {
    console.log('start initToken');

    try {
      // Check whether there's a saved token or not
      const savedToken = await storage.load(ACCESS_TOKEN_KEY);
      // const savedRefreshToken = await storage.load(REFRESH_TOKEN_KEY);

      // Token available
      if (savedToken) {
        console.log('SAVED TOKEN');
        this.accessToken = savedToken;
        this.setHeaderToken(savedToken);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Unable to retrieved saved token from storage.');
    }
    this.setRehydrated(true);
  }

  async setToken(value: string) {
    console.log('start setToken');
    this.accessToken = value;
    try {
      await storage.save(ACCESS_TOKEN_KEY, value);
      this.setHeaderToken(value);
    } catch (error) {
      console.log(error);
      throw new Error('Unable to save token to storage.');
    }

    console.log('end setToken');
  }

  async clearTokens() {
    console.log('start clearTokens');

    this.refreshToken = '';
    this.accessToken = '';
    try {
      await storage.remove(ACCESS_TOKEN_KEY);
    } catch (error) {
      throw new Error('Unable to remove access token and refresh token.');
    }

    console.log('end clearTokens');
  }

  private async initLastSeenFeed() {
    console.log('start initLastSeenFeed');

    try {
      // Check whether there's a saved token or not
      const savedLastSeenFeed = await storage.load(LAST_SEEN_FEED);
      // const savedRefreshToken = await storage.load(REFRESH_TOKEN_KEY);

      // Token available
      if (savedLastSeenFeed) {
        console.log('SAVED LastSeenFeed');
        this.lastSeenFeed = savedLastSeenFeed;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Unable to retrieved saved last seen feed from storage.');
    }
  }

  async setLastSeenFeed(lastSeenDate: string) {
    console.log('start setLastSeenFeed');

    this.lastSeenFeed = lastSeenDate;
    console.log('')
    try {
      await storage.save(LAST_SEEN_FEED, this.lastSeenFeed);
    } catch (error) {
      console.log(error);
      throw new Error('Unable to save last seen feed to storage.');
    }

    console.log('end setLastSeenFeed');
  }

}

// #endregion
