import { AppRoute } from "@navigators/navigation-type"
import {
  coachingJournalMain,
  newJournalEntry,
  fillFeedback,
  quizForm,
  fillFeedbackDetail,
  overviewJournalEntry,
  fillFeedbackCoachee,
  overviewJournalEntryByUser,
} from "@screens/coaching-journal"
import {
  commentList,
  feedTimelineMain,
  feedGuideline,
  myFeedList,
  newPost,
  postDetails,
} from "@screens/feed"
import {
  settings,
  myAccount,
  myAccountVerifyOTP,
  changePassword,
  changePhone,
  changeDivision,
  changeUserPosition,
  notification,
} from "@screens/settings"
import { notifications } from "@screens/notification"
import { homepage, moodTeam } from "@screens/homepage"
import { JournalEntryType } from "@screens/coaching-journal/new-journal-entry"
import {
  leaderboards,
  guidePoints,
  assessment,
  juaraAssessment,
  juaraQuizMain,
  juaraQuizResult
} from "@screens/leaderboard"
import { JLDetail, JournalDetail, JournalInLearnerJournalModel, LearnerJournalInJournalDetail } from "app/store/store.coaching"
import juaraAssessmentQuiz from "@screens/leaderboard/juara-assessment-quiz"
import { FeedItemType } from "@screens/feed/feed.type"
import {
  addIdea,
  brainstorms,
  brainstormGroupList,
  newBrainstormsGroup,
  sendEmail,
} from "@screens/brainstorm"
import { feedbackCommitment, feedbackDetail, feedbackMain } from "@screens/feedback"
import { cultureMeasurementImplementation, cultureMeasurementImplementationQuestionnaire, cultureMeasurementInfrastructure, cultureMeasurementInfrastructureQuestionnaire, cultureMeasurementIntroduction, cultureMeasurementRating, cultureMeasurementRatingQuestionnaire, cultureMeasurementMain } from "@screens/culture-measurement"
import { createEvent, previewEvent } from "@screens/event"

const screens: AppRoute[] = [
  {
    name: "coachingJournalMain",
    component: coachingJournalMain,
  },
  {
    name: "newJournalEntry",
    component: newJournalEntry,
  },
  {
    name: "fillFeedback",
    component: fillFeedback,
  },
  {
    name: "settingsPage",
    component: settings,
  },
  {
    name: "myAccount",
    component: myAccount,
  },
  {
    name: "myAccountVerifyOTP",
    component: myAccountVerifyOTP,
  },
  {
    name: "changePassword",
    component: changePassword,
  },
  {
    name: "changeDivision",
    component: changeDivision,
  },
  {
    name: "changeUserPosition",
    component: changeUserPosition,
  },
  {
    name: "changePhone",
    component: changePhone,
  },
  {
    name: "quizForm",
    component: quizForm,
  },
  {
    name: "notificationList",
    component: notifications,
  },
  {
    name: "notificationSettings",
    component: notification,
  },
  {
    name: "homepage",
    component: homepage,
  },
  {
    name: "moodTeam",
    component: moodTeam,
  },
  {
    name: "fillFeedbackDetail",
    component: fillFeedbackDetail,
  },
  {
    name: "overviewJournalEntry",
    component: overviewJournalEntry,
  },
  {
    name: "overviewJournalEntryByUser",
    component: overviewJournalEntryByUser,
  },
  {
    name: "fillFeedbackCoachee",
    component: fillFeedbackCoachee,
  },
  {
    name: "feedTimelineMain",
    component: feedTimelineMain,
  },
  {
    name: "feedGuideline",
    component: feedGuideline,
  },
  {
    name: "newPost",
    component: newPost,
  },
  {
    name: "commentList",
    component: commentList,
  },
  {
    name: "myFeedList",
    component: myFeedList,
  },
  {
    name: "postDetails",
    component: postDetails,
  },
  {
    name: "leaderboards",
    component: leaderboards,
  },
  {
    name: "guidePoints",
    component: guidePoints,
  },
  {
    name: "assessment",
    component: assessment,
  },
  {
    name: "juaraAssesment",
    component: juaraAssessment,
  },
  {
    name: "juaraAssesmentQuiz",
    component: juaraAssessmentQuiz,
  },
  {
    name: "brainstorms",
    component: brainstorms,
  },
  {
    name: "addIdea",
    component: addIdea,
  },
  {
    name: "brainstormGroupList",
    component: brainstormGroupList,
  },
  {
    name: "newBrainstormsGroup",
    component: newBrainstormsGroup,
  },
  {
    name: "sendEmail",
    component: sendEmail,
  },
  {
    name: "juaraQuizMain",
    component: juaraQuizMain,
  },
  {
    name: "juaraQuizResult",
    component: juaraQuizResult,
  },
  {
    name: "feedbackMain",
    component: feedbackMain,
  },
  {
    name: "feedbackDetail",
    component: feedbackDetail,
  },
  {
    name: "feedbackCommitment",
    component: feedbackCommitment,
  },
  {
    name: "cultureMeasurementMain",
    component: cultureMeasurementMain,
  },
  {
    name: "cultureMeasurementIntroduction",
    component: cultureMeasurementIntroduction,
  },
  {
    name: "cultureMeasurementImplementation",
    component: cultureMeasurementImplementation,
  },
  {
    name: "cultureMeasurementRating",
    component: cultureMeasurementRating
  },
  {
    name: "cultureMeasurementRatingQuestionnaire",
    component: cultureMeasurementRatingQuestionnaire
  },
  {
    name: "cultureMeasurementImplementationQuestionnaire",
    component: cultureMeasurementImplementationQuestionnaire,
  },
  {
    name: "cultureMeasurementInfrastructure",
    component: cultureMeasurementInfrastructure,
  },
  {
    name: "cultureMeasurementInfrastructureQuestionnaire",
    component: cultureMeasurementInfrastructureQuestionnaire,
  },
  {
    name: "createEvent",
    component: createEvent,
  },
  {
    name: "previewEvent",
    component: previewEvent,
  },
]

export type NavigatorParamList = {
  coachingJournalMain: undefined
  feedTimelineMain: {
    newPost?: boolean
  }
  feedGuideline: {
    savedAgreeTnc: string
  }
  settingsPage: undefined
  myAccount: {
    newEmail?: string
    newNickname?: string
    photo?: string
    isPasswordChange?: boolean
  }
  myAccountVerifyOTP: {
    newEmail: string
    newNickname: string
    photo?: string
  }
  changePhone: undefined
  changePassword: undefined
  changeDivision: undefined
  changeUserPosition: {
    isFromSetting: boolean
  }
  newJournalEntry: {
    isDetail: boolean
  }
  newJournalLearnerEntry: {
    isDetail: boolean
  }
  fillFeedback: {
    isDetail: boolean
    data: JournalEntryType
  }
  quizForm: undefined
  notificationList: undefined
  notificationSettings: undefined
  homepage: undefined
  moodTeam: undefined
  fillFeedbackDetail: undefined
  overviewJournalEntry: {
    journalId: string
    isCoachee: boolean
    jlId: string
  }
  overviewJournalEntryByUser: {
    title: string
    learnerJournals?: LearnerJournalInJournalDetail[]
    coachJournal?: JournalInLearnerJournalModel
  }
  fillFeedbackCoachee: {
    isFilled: boolean
    journalId: string
  }
  newPost: undefined
  commentList: undefined
  myFeedList: undefined
  postDetails: {
    data: FeedItemType
    isFromMainFeed: boolean
  }
  leaderboards: undefined
  guidePoints: undefined
  assessment: undefined
  juaraAssesment: undefined
  juaraAssesmentQuiz: {
    id: string
  }
  brainstorms: {
    groupId: string
    isMember: boolean
  }
  addIdea: {
    isView: boolean
    groupId?: string
    ideaId?: string
    hasSelectedIdea: boolean
  },
  brainstormGroupList: undefined,
  newBrainstormsGroup: undefined
  sendEmail: {
    title: string
  },
  juaraQuizMain: undefined
  juaraQuizResult: {
    score: number,
    totalQuestions: number;
  },
  feedbackMain: undefined,
  feedbackDetail: {
    id: string,
    coachId?: string,
    isFeedbackRequest: boolean
  }
  feedbackCommitment: {
    feedbackUserId: string
  }

  cultureMeasurementMain: undefined,
  cultureMeasurementIntroduction: undefined,
  cultureMeasurementImplementation: {
    cmoId: string,
    isToCreate: boolean,
    cmTakerId: string
  },
  cultureMeasurementImplementationQuestionnaire: {
    cmoId: string,
    isToCreate: boolean,
    totalPage: number,
    cmTakerId: string
  }
  cultureMeasurementInfrastructure: {
    cmoId: string,
    isToCreate: boolean,
    cmTakerId: string
  },
  cultureMeasurementInfrastructureQuestionnaire: {
    cmoId: string,
    isToCreate: boolean,
    totalPage: number,
    cmTakerId: string
  }
  cultureMeasurementRating: {
    cmoId: string,
    isToCreate: boolean,
    cmTakerId: string,
    isFromQuestionnaire: boolean
  }
  cultureMeasurementRatingQuestionnaire: {
      cmoId: string,
      isToCreate: boolean,
      totalPage: number,
      cmTakerId: string
      isGoToLastModifiedPage: boolean
  }
}

export default screens
