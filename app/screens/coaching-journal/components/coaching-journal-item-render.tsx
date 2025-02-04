import {HStack, VStack} from "@components/view-stack";
import {Colors, Layout, Spacing} from "@styles";
import {dimensions} from "@config/platform.config";
import {TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import notFeedbackIcon from "@assets/icons/coachingJournal/note-feedback.png";
import Spacer from "@components/spacer";
import {Text} from "@components";
import notIcon from "@assets/icons/coachingJournal/note.png";
import React from "react";
import {CoachingJournalItem, CoachingActivitiesItem} from "@screens/coaching-journal/coaching-journal.type";

type CoachingJournalItemRenderProps = {
  item: CoachingJournalItem
  index: number
  selectedActivities: string
  onPressActivity(id: string): void
  onPressNote(id: string, coach_id: string): void
  onPressNoteCoachee(id: string, coach_id: string, type: string, label: string, jlId: string): void
  isHomepageComponent?: boolean,
  userId: string,
}

export const CoachingJournalItemRender = (
  {
    item,
    index,
    selectedActivities,
    onPressActivity = ()=> null,
    onPressNote = ()=> null,
    onPressNoteCoachee = ()=> null,
    isHomepageComponent = false,
    userId
  }:CoachingJournalItemRenderProps) => {

  const dateArr = item.date.split(' ')

  const renderButtonTagged = (activityItem: CoachingActivitiesItem) => {
    if(activityItem.isTagged){
      // find journalLearner item from array of jls.
      let jlItem = activityItem.journal_learner.find(el => el.jl_learner_id === userId)

      return(
        <HStack left={Spacing[8]} style={{maxWidth: dimensions.screenWidth - Spacing[128]}}>
          <TouchableOpacity onPress={()=>onPressNoteCoachee(activityItem.id, activityItem.coach_id, activityItem.journal_type, activityItem.journal_label, jlItem.jl_id)} style={[{backgroundColor: Colors.ABM_BG_BLUE, borderRadius: Spacing[12], alignItems: 'center'}, Layout.widthFull]}>
            <HStack horizontal={Spacing[8]} style={{minHeight:Spacing[64]}}>
                <FastImage style={{
                  height: Spacing[24],
                  width: Spacing[24]
                }} source={jlItem.is_filled ? notIcon : notFeedbackIcon} resizeMode={"contain"}/>
                <Spacer width={Spacing[8]} />
                <Text type={'body-bold'} style={{lineHeight:Spacing[16]}} text={jlItem.is_filled ? 'Lihat \ncatatan.' : 'Isi catatan'} numberOfLines={2} />
            </HStack>
          </TouchableOpacity>
        </HStack>
      )
    }else{
      return(
        <HStack left={Spacing[8]} style={{maxWidth: dimensions.screenWidth - Spacing[128]}}>
          <TouchableOpacity onPress={()=>onPressNote(activityItem.id, activityItem.coach_id)} style={{flex:1,backgroundColor: Colors.ABM_BG_BLUE, borderRadius: Spacing[10], alignItems: 'center'}}>
            <HStack horizontal={Spacing[8]} style={{minHeight:Spacing[64]}}>
              <FastImage style={{
                height: Spacing[24],
                width: Spacing[24]
              }} source={notIcon} resizeMode={"contain"}/>
              <Spacer width={Spacing[8]} />
              <Text type={'body-bold'} style={{lineHeight:Spacing[16]}} text={'Lihat \ncatatan.'} numberOfLines={2} />
            </HStack>
          </TouchableOpacity>
        </HStack>
      )
    }
  }

  return(
    <HStack>
      <View style={{height: '100%'}}>
        <VStack horizontal={Spacing[8]} vertical={Spacing[2]} style={{flex:1, minWidth: Spacing[72], borderRadius: Spacing[12], alignItems: 'flex-end', justifyContent: 'flex-end', backgroundColor: isHomepageComponent ? Colors.ABM_LIGHT_BLUE : Colors.ABM_DARK_BLUE}}>
          <Text type={'button'} style={{color:Colors.WHITE, bottom: -Spacing[8]}} text={dateArr[0]} />
          <Text type={'button'} style={{color:Colors.WHITE}} text={dateArr[1]} />
        </VStack>
      </View>
      <VStack style={{alignItems: 'flex-start'}}>

        {item.activities.map((activitiesItem, activitiesIndex)=>{
          let listLearner = ''
          activitiesItem?.journal_learner?.forEach(learner => {
            listLearner = listLearner===''? learner.jl_fullname : listLearner +', '+ learner.jl_fullname
          })

          let statusColor:string = Colors.MAIN_BLUE

          if(activitiesItem.is_coachee){
            statusColor = Colors.ABM_GREEN;
          } else {
            switch (activitiesItem.type){
              case "KPI coaching":
                statusColor = Colors.HONEY_YELLOW;
                break;
              case "Project Culture Coaching":
                statusColor = Colors.SOFT_PURPLE;
                break;
              case "other":
                statusColor = Colors.SOFT_BLUE;
                break;
            }
          }
          return(
            <VStack style={[Layout.widthFull,{minWidth: dimensions.screenWidth - Spacing[72]}]}>
              {/* {renderContent} */}
              {selectedActivities === activitiesItem.id ? renderButtonTagged(activitiesItem) :
                <TouchableOpacity key={activitiesItem.id} onPress={()=>{onPressActivity(activitiesItem.id)}}>
                  <HStack horizontal={Spacing[8]} style={{maxWidth: dimensions.screenWidth - Spacing[144], minHeight:Spacing[64]}}>
                    <View style={{height: Spacing[16], width: Spacing[16], backgroundColor: statusColor, borderRadius: Spacing[128]}} />
                    <Spacer width={Spacing[12]}/>
                    <VStack style={Layout.widthFull}>
                      <HStack>
                        <VStack style={{backgroundColor: activitiesItem.is_coachee ? Colors.ABM_GREEN : Colors.WHITE,
                          paddingHorizontal: activitiesItem.is_coachee ? Spacing[8] : 0, alignItems: 'center', justifyContent: 'center', borderRadius: Spacing[48]}}>
                          <Text type={'body'} style={{color: Colors.WHITE}} numberOfLines={1} >
                            {activitiesItem.is_coachee ?
                              <Text type={'body'} text={activitiesItem.title} style={{color: Colors.WHITE}} numberOfLines={1} />
                              : <Text type={'body'} text={activitiesItem.title} numberOfLines={1} /> }
                          </Text>
                        </VStack>
                      </HStack>
                      {activitiesItem.coach_fullname ?
                        <Text type={'body-bold'} style={{color: statusColor, fontSize: Spacing[12]}} >
                          {activitiesItem.is_coachee ? `Coached by ` : 'You Coached '}
                          {activitiesItem.is_coachee ? <Text type={'body'} style={{color: Colors.UNDERTONE_BLUE}}>
                              {`${activitiesItem.coach_fullname}`}
                            </Text> :
                            <Text type={'body'} style={{color: Colors.UNDERTONE_BLUE}}>
                              {`${listLearner}`}
                            </Text>
                          }
                        </Text> : null}
                    </VStack>
                  </HStack>
                </TouchableOpacity>
              }
              <View style={{borderBottomWidth: activitiesIndex + 1 === item.activities.length ? 0 : Spacing[1], borderColor: Colors.MAIN_BLUE, paddingTop: Spacing[2], maxWidth: dimensions.screenWidth - Spacing[128]}}/>
            </VStack>
          )
        })}
      </VStack>
    </HStack>
  )
}
