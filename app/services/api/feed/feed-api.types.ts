import { GeneralApiProblem } from "../api-problem"

export type FeedApiModel = {
  "feed_id": string
  "feed_description": string
  "feed_images_url": string
  "feed_author_id": string
  "feed_is_deleted": number
  "feed_created_at": string
  "feed_updated_at": string
  "feed_comments": string[]
}

export type CommentApiModel = {
  "feed_comment_id": string
  "feed_comment_comment": string
  // "feed_comment_feedId": string
  // "feed_comment_authorId": string
  "feed_comment_isDeleted": number
  "feed_comment_created_at": string
  "feed_comment_updated_at": string
  "feed_comment_author_id": string
  "feed_comment_feed_id": string
  "feed_comment_author": null
}

export interface ErrorFormResponse {
  errorCode: number
  message: string
}

export interface GetListFeedsResponse {
  message: string
  token: string
  data: {
    feeds: FeedApiModel[]
  }
}

export type GetListFeedsResult = { kind: "form-error"; response: ErrorFormResponse } | { kind: "ok"; response: GetListFeedsResponse }  | GeneralApiProblem