import { ApiResponse } from "apisauce"
import { Api } from "../api"
import { getGeneralApiProblem } from "../api-problem"
import { GetNotificationsListResult } from "@services/api/notification/notification-api.types";
import {DEFAULT_API_CONFIG} from "@services/api/api-config";

export class NotificationApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getListNotifications(page: number, limit: number): Promise<GetNotificationsListResult> {
    console.log("getListNotifications()")
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/notification`,{
        limit: limit,
        page: page
      }, {baseURL: `${DEFAULT_API_CONFIG.url.slice(0, -3)}v2/`})
      console.log(response.data)

      if (response.status === 400) {
        const res = response.data
        return { kind: "form-error", response: res }
      }

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const res = response.data

      console.log(res)

      return { kind: "ok", response: res }
    } catch (e) {
      console.log(e)
      console.log("error")
      // __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
