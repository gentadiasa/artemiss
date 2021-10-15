/* eslint-disable max-lines */
// #region IMPORTS
// PACKAGES
import { makeAutoObservable } from "mobx"
import ServiceStore from "./store.service"
import { Api } from "@services/api"
import { ProfileApi } from "@services/api/profile/profile-api"
import { ErrorFormResponse } from "@services/api/auth/auth-api.types"
import { TeamResponse, UpdateProfileResponse } from "@services/api/profile/profile-api.types"
import { ProfileUpdateForm } from "@screens/auth/create-profile"

// CONFIGS

// CONSTANTS

export type UserProfile = {
  userId: string
  fullName: string
  nickName: string
  phoneNumber?: string
  isAllowNotification?: number
  isAllowReminderNotification?: number
  email: string
  team1Id: string
  team2Id: string
  team3Id: string
}

export default class MainStore {
  // #region PROPERTIES

  serviceStore: ServiceStore
  api: Api
  isLoading: boolean

  errorCode: number
  errorMessage: string

  profileApi: ProfileApi
  teamResponse: TeamResponse

  userProfile: UserProfile

  // #region CONSTRUCTOR

  constructor(serviceStore: ServiceStore, api: Api) {
    this.serviceStore = serviceStore
    this.api = api
    this.isLoading = false

    this.errorCode = null
    this.errorMessage = null

    this.profileApi = new ProfileApi(this.api)

    this.teamResponse = null

    this.userProfile = {
      userId: "",
      fullName: "",
      nickName: "",
      email: "",
      team1Id: "",
      team2Id: "",
      team3Id: "",
      phoneNumber: "",
      isAllowNotification: 0,
      isAllowReminderNotification: 0,
    }

    makeAutoObservable(this)
  }
  // #endregion

  // #region ACTIONS

  formError(data: ErrorFormResponse) {
    this.errorCode = data.errorCode
    this.errorMessage = data.message
  }

  async getTeamList() {
    console.log("getTeamList")
    this.isLoading = true
    try {
      const response = await this.profileApi.getTeamList()

      console.log(response)

      if (response.kind === "form-error") {
        this.formError(response.response)
      }

      if (response.kind === "ok") {
        await this.getTeamSuccess(response.response)
      }
    } catch (e) {
      console.log("getTeamList error")
      console.log(e)
      this.getTeamFailed(e)
    } finally {
      console.log("get team done")
      this.isLoading = false
    }
  }

  async getTeamSuccess(data: TeamResponse) {
    await this.serviceStore.setHeaderToken(data.token)
    this.teamResponse = data
  }

  getTeamFailed(e: any) {
    this.errorMessage = e
  }

  async updateProfile(userId: string, data: ProfileUpdateForm) {
    console.log("updateProfile")
    this.isLoading = true
    try {
      const response = await this.profileApi.updateProfile(userId, data)

      if (response.kind === "form-error") {
        this.formError(response.response)
      }

      if (response.kind === "ok") {
        await this.updateProfileSuccess(response.response)
      }
    } catch (e) {
      console.log("updateProfile error")
      console.log(e)
      this.updateProfileFailed(e)
    } finally {
      console.log("updateProfile done")
      this.isLoading = false
    }
  }

  async updateProfileSuccess(data: UpdateProfileResponse) {
    this.userProfile = {
      userId: data.data.userId,
      fullName: data.data.fullname,
      nickName: data.data.nickname,
      email: data.data.email,
      team1Id: data.data.team1Id,
      team2Id: data.data.team2Id,
      team3Id: data.data.team3Id,
      isAllowNotification: this.userProfile.isAllowNotification,
      isAllowReminderNotification: this.userProfile.isAllowReminderNotification,
    }

    await this.serviceStore.setToken(data.data.token)
  }

  async setProfile() {
    console.log("setProfile")
    this.isLoading = true
    try {
      const response = await this.profileApi.getProfile()

      if (response.kind === "form-error") {
        this.formError(response.response)
      }
      if (response.kind === "ok") {
        this.userProfile = {
          userId: response.response[0]["user_nickname"],
          fullName: response.response[0]["user_fullname"],
          nickName: response.response[0]["user_nickname"],
          email: response.response[0]["user_email"],
          team1Id: response.response[0]["user_team_1_id"],
          team2Id: response.response[0]["user_team_2_id"],
          team3Id: response.response[0]["user_team_3_id"],
          phoneNumber: response.response[0]["user_phone_number"],
          isAllowNotification: response.response[0]["user_is_allow_notification"],
          isAllowReminderNotification: response.response[0]["user_is_allow_reminder_notification"],
        }
        console.log("USer profile ", this.userProfile)
      }
    } catch (e) {
      console.log("setProfile error")
      console.log(e)
      // this.updateProfileFailed(e)
    } finally {
      console.log("setProfile done")
      this.isLoading = false
    }
  }

  updateProfileFailed(e: any) {
    this.errorMessage = e
  }

  // #endregion
}

// #endregion
