import { ApiResponse } from "apisauce"
import { Api } from "../api"
import { getGeneralApiProblem } from "../api-problem"
import { GetProfileResult, GetTeamMemberResult, TeamListResult, UpdateProfileResult } from "./profile-api.types";
import {ProfileUpdateForm} from "@screens/auth/create-profile";

export class ProfileApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getTeamList(): Promise<TeamListResult> {
    console.log('get team list')

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/team")
      if(response.status === 400){
        const res = response.data
        return { kind: "form-error", response: res }
      }
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const res = response.data
      return { kind: "ok", response: res }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data"}
    }
  }

  async updateProfile(userId: string, formData: ProfileUpdateForm): Promise<UpdateProfileResult> {
    try {
      console.log('updateProfile', userId)
      console.log('updateProfile data', formData)
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.patch(
        `/user/${userId}`,
        formData,
      )

      console.log('updateProfile response', response)

      if(response.status === 400){
        const res = response.data
        return { kind: "form-error", response: res }
      }

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const res = response.data
      console.log('response res', res)

      return { kind: "ok", response: res }
    } catch (e) {
      console.log('error', e)
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data"}
    }
  }

  async getProfile(): Promise<GetProfileResult> {
    console.log('getProfile() GetProfileResult',)
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/user/profile`)
      if(response.status === 400){
        const res = response.data
        return { kind: "form-error", response: res }
      }

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const res = response.data

      return { kind: "ok", response: res }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data"}
    }
  }

  async getTeamMember(id: string): Promise<GetTeamMemberResult> {
    try {
      console.log('getTeamMember())', id)

      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/user?teamId=${id}`)
      console.log('ApiResponse():', response.data.data[0])
      if(response.status === 400){
        const res = response.data
        return { kind: "form-error", response: res }
      }

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      console.log('getTeamMember():', response.data.data)

      const res = response.data.data

      return { kind: "ok", response: res }
    } catch (e) {
      console.log('getTeamMember(): e', e)

      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data"}
    }
  }


}
