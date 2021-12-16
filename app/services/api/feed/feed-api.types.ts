import { GeneralApiProblem } from "../api-problem"

export type FeedApiModel = {
  "feed_id": string
  "feed_description": string
  "feed_images_url": string
  "feed_author_id": string
  "feed_is_deleted": number
  "feed_created_at": string
  "feed_updated_at": string
  "feed_deleted_at": string
  "feed_author_nickname": string
  "feed_author_photo": string
  "feed_comment_count": number
}

export type CommentApiModel = {
  "feed_comment_id": string
  "feed_comment_comment": string
  "feed_comment_feed_id": string
  "feed_comment_author_id": string
  "feed_comment_reply_to_id": string
  "feed_comment_created_at": string
  "feed_comment_updated_at": string
  "feed_comment_deleted_at": string
  "feed_comment_author_nickname": string
  "feed_comment_author_photo": null
  "feed_comment_reply_to_nickname": string
}

export interface ErrorFormResponse {
  errorCode: number
  message: string
}

export interface GetListFeedsResponse {
  message: string
  token: string
  data: FeedApiModel[]
  
}

export interface PostUploadFeedImagesResponse {
  message: string
  token: string
  data: {
    urls: string
  }
}

export interface CreatePostResponse {
  message: string
  token: string
  data: {
    feed: {
      "id": string
      // "isDeleted": boolean
      "description": string
      "imagesUrl": string
      "authorId": string
      "feed_updated_at": string
      "feed_created_at": string
    }
  }
}

export interface DeletePostResponse {
  message: string
  token: string
  data: {
    
  }
}
export interface GetListCommentResponse {
  message: string
  token: string
  data: {
    comments: CommentApiModel[]
  }
}
export interface CreateCommentResponse {
  message: string
  token: string
  data: {
    comment: {
      id: string,
      comment: string,
      feedId: string,
      authorId: string,
      "feed_comment_updated_at": string,
      "feed_comment_created_at": string
    },
    token: string
  }
}

export type GetListFeedsResult = { kind: "form-error"; response: ErrorFormResponse } | { kind: "ok"; response: GetListFeedsResponse }  | GeneralApiProblem
export type PostUploadFeedImagesResult = { kind: "form-error"; response: ErrorFormResponse } | { kind: "ok"; response: PostUploadFeedImagesResponse }  | GeneralApiProblem
export type CreatePostResult = { kind: "form-error"; response: ErrorFormResponse } | { kind: "ok"; response: CreatePostResponse }  | GeneralApiProblem
export type DeletePostResult = { kind: "form-error"; response: ErrorFormResponse } | { kind: "ok"; response: DeletePostResponse }  | GeneralApiProblem
export type GetListCommentResult = { kind: "form-error"; response: ErrorFormResponse } | { kind: "ok"; response: GetListCommentResponse }  | GeneralApiProblem
export type CreateCommentResult = { kind: "form-error"; response: ErrorFormResponse } | { kind: "ok"; response: CreateCommentResponse }  | GeneralApiProblem