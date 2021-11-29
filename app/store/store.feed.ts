/* eslint-disable max-lines */
// #region IMPORTS
// PACKAGES
import { makeAutoObservable } from "mobx"
import ServiceStore from "./store.service"
import { Api } from "@services/api"
import { FeedApi } from "@services/api/feed/feed-api"
import { ErrorFormResponse, FeedApiModel } from "@services/api/feed/feed-api.types"
import { CreatePostType, FeedItemType } from "@screens/feed/feed.type"


export default class FeedStore {
  // #region PROPERTIES
  
  serviceStore: ServiceStore
  api: Api
  isLoading: boolean

  refreshData: boolean

  errorCode: number
  errorMessage: string

  feedApi: FeedApi
  listFeeds: FeedItemType[]
  listMyFeed: FeedItemType[]

  constructor(serviceStore: ServiceStore, api: Api) {
    this.serviceStore = serviceStore
    this.api = api
    this.isLoading = false

    this.errorCode = null
    this.errorMessage = null

    this.listFeeds = []
    this.listMyFeed = []
    this.feedApi = new FeedApi(this.api)
  }

  async getListFeeds() {
    this.isLoading = true
    try {
      const response = await this.feedApi.getListFeeds()

      if (response.kind === "form-error") {
        this.formError(response.response)
      }

      if (response.kind === "ok") {
        this.getListFeedsSuccess(response.response.data)
      }
    } catch (e) {
      console.log(e)
      this.setErrorMessage(e)
    } finally {
      console.log("getListFeeds done")
      this.isLoading = false
    }
  }

  getListFeedsSuccess(data: FeedApiModel[]) {
    console.log("getListFeedsSuccess data", data)
    this.listFeeds = []
    data.forEach(post => {
      this.listFeeds.push({
        id: post.feed_id,
        description: post.feed_description,
        imageUrl: post.feed_images_url,
        author: {
          id: post.feed_author_id,
          nickname: post.feed_author_nickname,
          title: 'Head of something',
          photo: post.feed_author_photo,
        },
        commentCount: post.feed_comment_count,
        isNew: true,
        createdAt: post.feed_created_at,
        updatedAt: post.feed_updated_at,
        isDeleted: (post.feed_is_deleted === 1),
        deletedAt: post.feed_deleted_at
      })
    })
    
    console.log("list feed: ", this.listFeeds)
  }

  clearListFeed() {
    this.listFeeds = []
    console.log("list feed: ", this.listFeeds)
  }


  async getListMyFeeds(id) {
    this.isLoading = true
    try {
      const response = await this.feedApi.getListMyFeed(id)

      if (response.kind === "form-error") {
        this.formError(response.response)
      }

      if (response.kind === "ok") {
        this.getListMyFeedsSuccess(response.response.data)
      }
    } catch (e) {
      console.log(e)
      this.setErrorMessage(e)
    } finally {
      console.log("getListMyFeeds done")
      this.isLoading = false
    }
  }

  getListMyFeedsSuccess(data: FeedApiModel[]) {
    console.log("getListMyFeedsSuccess data", data)
    const tempListMyFeeds: FeedItemType[] = []
    data.forEach(post => {
      tempListMyFeeds.push({
        id: post.feed_id,
        description: post.feed_description,
        imageUrl: post.feed_images_url,
        author: {
          id: post.feed_author_id,
          nickname: post.feed_author_nickname,
          title: '',
          photo: post.feed_author_photo,
        },
        commentCount: post.feed_comment_count,
        isNew: true,
        createdAt: post.feed_created_at,
        updatedAt: post.feed_updated_at,
        isDeleted: (post.feed_is_deleted === 1),
        deletedAt: post.feed_deleted_at
      })
    })
    
    this.listMyFeed = tempListMyFeeds
    console.log("list my feed: ", this.listMyFeed)
  }

  clearListMyFeed() {
    this.listMyFeed = []
    console.log("list MY feed: ", this.listMyFeed)
  }


  async uploadImage(formData: FormData) {
    console.log("Upload Photo")
    this.isLoading = true
    try {
      const response = await this.feedApi.PostUploadFeedImages(formData)

      console.log(response)

      if (response.kind === "form-error") {
        this.formError(response.response)
      }

      if (response.kind === "ok") {
        return response.response;
      }
    } catch (e) {
      console.log("Upload Feed Image error")
      console.log(e)
      this.setErrorMessage(e)
    } finally {
      console.log("Upload Feed Image done")
      this.isLoading = false
    }
  }

  formError(data: ErrorFormResponse) {
    this.errorCode = data.errorCode
    this.errorMessage = data.message
  }

  setErrorMessage(e: any) {
    this.errorMessage = e
  }
}
