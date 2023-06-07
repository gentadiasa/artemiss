import React, { FC, useCallback, useReducer, useState, useEffect } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Text, Button, TextField, DropDownPicker, DropDownItem } from "@components"
import { NavigatorParamList } from "@navigators/main-navigator"
import { HStack, VStack } from "@components/view-stack"
import Spacer from "@components/spacer"
import { Colors, Layout, Spacing } from "@styles"

import { ACTIVITIES_TYPE } from "@screens/coaching-journal/components/activities-type-legends"

import { dimensions } from "@config/platform.config"

import CalendarPicker from "react-native-calendar-picker"
import { typography } from "@theme"
import { useStores } from "../../bootstrap/context.boostrap"

import Modal from "react-native-modalbox"
import moment from "moment"

import Spinner from "react-native-loading-spinner-overlay"

import { Formik } from "formik"
import { FeedbackJLSixth } from "../../store/store.coaching"

export type JournalEntryType = {
  coachId: string
  date: string
  title: string
  content: string
  strength: string
  improvement: string
  recommendationForCoachee: string
  type: string
  label: string
  learnerIds: string[]
  documentsUrl: string
}

const JournalEntryInitialValue: JournalEntryType = {
  coachId: "",
  date: moment(new Date()).format(),
  title: "",
  content: "",
  strength: "",
  improvement: "",
  recommendationForCoachee: "",
  type: "",
  label: "",
  learnerIds: [],
  documentsUrl: ""
}

const NewJournalEntry: FC<StackScreenProps<NavigatorParamList, "newJournalEntry">> = observer(
  ({ navigation, route }) => {
    const { isDetail } = route.params

    const { mainStore, coachingStore } = useStores()

    const styles = StyleSheet.create({
      textError: {
        color: Colors.MAIN_RED,
      },
    })

    const fieldError = false

    // empty list state
    const [selectedActivities, setSelectedActivities] = useState<string>("")
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    const [isModalVisible, setModalVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [dataTeamMember, setDataTeamMember] = useState<DropDownItem[]>([]);
    const [dataJournalTags, setDataJournalTags] = useState([
      {
        id: '0',
        key: 'KPI coaching',
        item: 'KPI coaching'
      },
      {
        id: '1',
        key: 'Project Culture Coaching',
        item: 'Project Culture coaching',
      },
      {
        id: '2',
        key: 'other',
        item: 'Others',
      }
    ]);

    const [title, setTitle] = useState<string>("")
    const [learner, setLearner] = useState({})
    const [learnerDetail, setLearnerDetail] = useState("")

    const [content, setContent] = useState<string>("")
    const [leassons, setLeassons] = useState<string>("")

    const [strength, setStrength] = useState<string>("")
    const [improvement, setImprovement] = useState<string>("")
    const [recommendationForCoachee, setRecommendationForCoachee] = useState<string>("")
    const [activity, setActivity] = useState<string>("")
    const [isError, setError] = useState<boolean>(false)
    const [isErrorFile, setErrorFile] = useState<boolean>(false)

    const [isEncouragementModalVisible, setIsEncouragementModalVisible] = useState(false)

    const [journalEntryForm, setJournalEntryForm] =
      useState<JournalEntryType>(JournalEntryInitialValue)

    const toggleModal = () => {
      setTimeout(() => {
        setModalVisible(!isModalVisible)
      }, 100)
    }

    const toggleEncouragementModal = () => {
      setTimeout(() => {
        setIsEncouragementModalVisible(!isEncouragementModalVisible)
      }, 100)
    }

    const closeModal = () => {
      setTimeout(() => {
        setModalVisible(false)
      }, 100)
    }

    const onDateChange = (selectedDate, setFieldValue) => {
      const dateTime = moment(selectedDate).format()
      setSelectedDate(dateTime)
      setFieldValue("date", selectedDate)
      console.log(dateTime)
    }

    const getListUser = useCallback(async (id: string) => {
      await mainStore.getListUser(id)
      console.log("useEffect mainStore.listUserProfile", mainStore.listUserProfile)
    }, [])

    useEffect(() => {
      if (mainStore.listUserProfile) {
        console.log("mainStore.listUserProfile", mainStore.listUserProfile)
        const itemsData: DropDownItem[] = mainStore.listUserProfile.map((item, index) => {
          return {
            item: item.fullname,
            id: item.id,
          }
        })
        setDataTeamMember(itemsData)
      }
    }, [mainStore.listUserProfile])

    useEffect(() => {
      setSelectedDate(moment().format("LLLL"))
      coachingStore.resetLoading()
      mainStore.resetLoading()
    }, [])

    const getListDetail = useCallback(async () => {
      await coachingStore.getJournalDetail()
      console.log("coachingStore.getListDetail", coachingStore.journalDetail)
      console.log("coachingStore.isDetailCoach", coachingStore.isDetailCoach)

      console.log("coachingStore.getListDetail.is_edited", coachingStore.journalDetail.is_edited)

      if (coachingStore.isDetailCoach) {
        setTitle(coachingStore.journalDetail.journal_title)
        setContent(coachingStore.journalDetail.journal_content)
        setStrength(coachingStore.journalDetail.journal_strength)
        setImprovement(coachingStore.journalDetail.journal_improvement)
        // setRecommendationForCoachee(coachingStore.journalDetail.jl_commitment[0].desc)
        setSelectedDate(coachingStore.journalDetail.journal_date)
        setSelectedActivities(coachingStore.journalDetail.journal_type)
        setLearnerDetail(coachingStore.journalDetail.jl_learner_fullname[0])
        setLeassons(coachingStore.journalDetail.jl_lesson_learned[0].desc)
        forceUpdate()
      } else {
        setTitle(coachingStore.journalDetail.journal_title)
        setContent(coachingStore.journalDetail.jl_content)
        setRecommendationForCoachee(coachingStore.journalDetail.jl_commitment)
        setLeassons(coachingStore.journalDetail.jl_lesson_learned)
        setSelectedDate(coachingStore.journalDetail.journal_date)
        setSelectedActivities(coachingStore.journalDetail.journal_type)
        setLearnerDetail(coachingStore.journalDetail.coach_fullname)
        forceUpdate()
      }
    }, [coachingStore.journalDetail, coachingStore.journalDetailSucced])

    useEffect(() => {
      getListUser(mainStore.userProfile.team1_id)
    }, [])

    useEffect(() => {
      if (
        coachingStore.messageUpdatedJournal == "Success" &&
        coachingStore.isDetail &&
        !coachingStore.isDetailCoach
      ) {
        navigation.navigate("fillFeedback")
      }
    }, [coachingStore.messageUpdatedJournal])

    const goBack = () => {
      coachingStore.resetCoachingStore()
      navigation.goBack()
    }

    const holdActivitiesId = useCallback(
      (selectedId, setFieldValue) => {
        console.log(selectedId)
        setSelectedActivities(selectedId)
        setFieldValue("type", selectedId)
      },
      [selectedActivities],
    )

    const searchDataUser = (id: string) => {
      dataTeamMember.find((data) => {
        return data.id == id
      })
    }

    useEffect(() => {
      if(coachingStore.messageCreateJournal === "Success" && !coachingStore.isDetail){
        coachingStore.resetCoachingStore()
        coachingStore.setRefreshData(true)
        coachingStore.clearJournal().then(()=>{
          navigation.reset({
            routes: [{ name: 'coachingJournalMain' }]
          })
        })
      }
    },[coachingStore.messageCreateJournal, coachingStore.createJournalSucceed])

    const onSubmit = useCallback(
      async (data: JournalEntryType) => {
        if (data.title === "" || !data.learnerIds[0] || data.content === "" || data.strength === "" || data.improvement === ""
        || data.recommendationForCoachee === "" || !data.type || data.type === "" || data.type === "Others" && data.label === ""
        || data.date === "") {
          setError(true)
        } else {
          setError(false)
          setErrorFile(false)
          setJournalEntryForm(data)
          console.log("journal entry to be passed ", data)
          console.log("journalEntryForm submitted", journalEntryForm)
          let temp = processLearnerIds(data)
          if (!isError && !isErrorFile) {
            await coachingStore.createJournal(temp)
          }
        }
      },
      [setJournalEntryForm, journalEntryForm],
    )

    const processLearnerIds = (journalEntry) : JournalEntryType => {
      console.log("journalEntryForm ", journalEntryForm)
      const tempLearnerIds = [];
      for (let i = 0; i < journalEntry.learnerIds.length; i++) {
        tempLearnerIds.push(journalEntry.learnerIds[i].id);
      }
      journalEntry.learnerIds = tempLearnerIds;

      return journalEntry;
    }

    const goToFeedback = (journalEntry) => {
      console.log("journalEntryForm ", journalEntryForm)
      const tempLearnerIds = [];
      for (let i = 0; i < journalEntry.learnerIds.length; i++) {
        tempLearnerIds.push(journalEntry.learnerIds[i].id);
      }
      journalEntry.learnerIds = tempLearnerIds;
      // if(!isDetail){
      navigation.navigate("fillFeedback", {
        data: journalEntry,
        isDetail: false,
      })
      // }
    }

    const ActivityTypeSelector = ({
      onActivityPress = (item) => setActivity(item),
      selectedActivity = "weekly_coaching",
      isError = false,
      isErrorFile = false,
    }) => {
      const styles = StyleSheet.create({
        container: {
          borderColor: "red",
          borderRadius: Spacing[20],
          borderStyle: "dashed",
          borderWidth: isError ? Spacing[2] : 0,
          justifyContent: "space-around",
          padding: Spacing[6],
        },
      })

      return (
        <HStack style={styles.container}>
          {ACTIVITIES_TYPE.map((item, index) => {
            if (index < 2) {
              return (
                <TouchableOpacity
                  style={{
                    borderColor: Colors.MAIN_RED,
                    borderWidth: item.value === selectedActivity ? Spacing[2] : 0,
                    height: Spacing[32],
                    width: Spacing[32],
                    backgroundColor: item.color,
                    borderRadius: Spacing[128],
                  }}
                  onPress={() => onActivityPress(item.value)}
                />
              )
            } else {
              return <></>
            }
          })}
        </HStack>
      )
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Layout.flex}
      >
        <VStack
          testID="CoachingJournalMain"
          style={{ backgroundColor: Colors.WHITE, flex: 1, justifyContent: "center" }}
        >
          <Formik
            initialValues={journalEntryForm}
            // validationSchema={JournalEntryTypeSchema}
            onSubmit={onSubmit}
            // validate={validate}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <>
                <SafeAreaView style={Layout.flex}>
                  <ScrollView style={[Layout.flex, { flex: 1 }]} nestedScrollEnabled={true}>
                    <VStack top={Spacing[32]} horizontal={Spacing[24]}>
                      <HStack>
                        <Text type={"left-header"} style={{}} text="Tambah Coaching Journal." />
                        <Spacer />
                        <HStack>
                          <Button type={"light-bg"} text={"Cancel"} onPress={goBack} />
                        </HStack>
                      </HStack>

                      <VStack>
                      { isError && <Text
                          type={"label"}
                          style={{
                            textAlign: 'center',
                            marginTop: Spacing[4],
                            color: Colors.MAIN_RED
                          }}
                        >Ups! Sepertinya ada kolom yang belum diisi! Silahkan dicek kembali dan isi semua kolom yang tersedia!</Text>
                      }
                      { isErrorFile && <Text
                          type={"label"}
                          style={{
                            textAlign: 'center',
                            marginTop: Spacing[4],
                            color: Colors.MAIN_RED
                          }}
                        >Ups! Sepertinya file dokumen tidak sesuai dengan syarat yang telah disediakan! Silahkan dicek kembali!</Text>
                      }
                        <TextField
                          value={values.title}
                          onChangeText={handleChange("title")}
                          isRequired={false}
                          editable={!coachingStore.isDetail}
                          isError={isError && !values.title}
                          secureTextEntry={false}
                          placeholder={"Tulis nama judul sesi coaching di sini."}
                        />
                        <HStack style={{ zIndex: 100 }}>
                          <VStack style={{ width: Spacing[64] }}>
                            <Text
                              type={"body-bold"}
                              style={[
                                { textAlign: "center", top: Spacing[4] },
                                isError && values.learnerIds.length == 0 ? styles.textError : null,
                              ]}
                              text="dengan"
                            />
                          </VStack>
                          <VStack
                            style={{ maxWidth: dimensions.screenWidth - Spacing[128], flex: 1 }}
                          >
                            {!coachingStore.isDetail ? (
                              // TODO Integrate multiple choice with backend
                              <DropDownPicker
                                items={dataTeamMember}
                                isRequired={false}
                                // value={values.lea}
                                onValueChange={(value: DropDownItem | DropDownItem[]) => {
                                  setFieldValue("learnerIds", value)
                                }}
                                placeholder={"Pilih coachee (max. 5 orang)"}
                                containerStyle={{ marginTop: Spacing[4] }}
                                isError={isError && values.learnerIds.length == 0}
                                multiple={true}
                              />
                            ) : (
                              <TextField
                                style={{
                                  paddingTop: 0,
                                  minWidth: dimensions.screenWidth - Spacing[128],
                                }}
                                value={journalEntryForm.learnerIds.toString()}
                                isError={isError && values.learnerIds.length == 0}
                                inputStyle={{ minHeight: Spacing[48] }}
                                isRequired={false}
                                secureTextEntry={false}
                                isTextArea={true}
                              />
                            )}
                          </VStack>
                        </HStack>
                        <HStack>
                          <TouchableOpacity
                            style={{ height: "100%", width: "20%" }}
                            onPress={toggleModal}
                            disabled={coachingStore.isDetail}
                          >
                            <VStack
                              horizontal={Spacing[8]}
                              vertical={Spacing[2]}
                              style={{
                                flex: 1,
                                width: "100%",
                                borderRadius: Spacing[12],
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                backgroundColor: Colors.ABM_MAIN_BLUE,
                              }}
                            >
                              <Text
                                type={"button"}
                                style={{ color: Colors.WHITE, bottom: -Spacing[8] }}
                                text={`${moment(selectedDate).format("DD MMM")}`.split(" ")[0]}
                              />
                              <Text type={"button"} style={{ color: Colors.WHITE }}>
                                {`${moment(values.date).format("DD MMM")}`.split(" ")[1]}
                              </Text>
                            </VStack>
                          </TouchableOpacity>
                          <Spacer />
                          <VStack top={Spacing[8]} style={{ width: "75%" }}>
                            <Text
                              type={"body-bold"}
                              style={[
                                { textAlign: "center", top: Spacing[4] },
                                isError && !values.content ? styles.textError : null,
                              ]}
                            >
                              {`Apa yang `}
                              <Text type={"body-bold"} style={{ color: Colors.ABM_LIGHT_BLUE }}>
                                {"dibicarakan"}
                              </Text>
                              {` saat coaching?`}
                            </Text>
                            <TextField
                              style={{ paddingTop: 0 }}
                              value={values.content}
                              // editable={!coachingStore.isDetail}
                              isError={isError && !values.content }
                              onChangeText={handleChange("content")}
                              inputStyle={{ minHeight: Spacing[72] }}
                              isRequired={false}
                              secureTextEntry={false}
                              isTextArea={true}
                              charCounter={true}
                            />
                          </VStack>
                        </HStack>
                        {coachingStore.isFormCoach && (
                          <VStack top={Spacing[12]}>
                            <Text
                              type={"body-bold"}
                              style={[
                                { textAlign: "center", top: Spacing[4] },
                                isError && !values.strength ? styles.textError : null,
                              ]}
                            >
                              {`Sebagai coach, apa yang sudah saya lakukan dengan `}
                              <Text type={"body-bold"} style={{ color: Colors.ABM_LIGHT_BLUE }}>
                                {"efektif?"}
                              </Text>
                            </Text>
                            <TextField
                              style={{ paddingTop: 0 }}
                              inputStyle={{ minHeight: Spacing[48] }}
                              isRequired={false}
                              value={values.strength}
                              editable={!coachingStore.isDetail}
                              isError={isError && !values.strength}
                              onChangeText={handleChange("strength")}
                              secureTextEntry={false}
                              isTextArea={true}
                              charCounter={true}
                            />
                          </VStack>
                        )}
                        {coachingStore.isFormCoach && (
                          <VStack top={Spacing[12]}>
                            <Text
                              type={"body-bold"}
                              style={[
                                { textAlign: "center", top: Spacing[4] },
                                isError && !values.improvement ? styles.textError : null,
                              ]}
                            >
                              {`Sebagai coach, kualitas apa yang dapat saya `}
                              <Text
                                type={"body-bold"}
                                style={[
                                  { color: Colors.ABM_LIGHT_BLUE },
                                  fieldError ? styles.textError : null,
                                ]}
                              >
                                {"tingkatkan?"}
                              </Text>
                            </Text>
                            <TextField
                              style={{ paddingTop: 0 }}
                              inputStyle={{ minHeight: Spacing[48] }}
                              isRequired={false}
                              secureTextEntry={false}
                              isTextArea={true}
                              editable={!coachingStore.isDetail}
                              isError={isError && !values.improvement}
                              value={values.improvement}
                              onChangeText={handleChange("improvement")}
                              charCounter={true}
                            />
                          </VStack>
                        )}
                        {coachingStore.isDetail && (
                          <VStack top={Spacing[12]}>
                            <Text
                              type={"body-bold"}
                              style={[
                                { textAlign: "center", top: Spacing[4] },
                                isError ? styles.textError : null,
                              ]}
                            >
                              {"Tulislah "}
                              <Text type={"body-bold"} style={{ color: Colors.ABM_LIGHT_BLUE }}>
                                {'"lessons learned"'}
                              </Text>
                              {`-mu dicoaching sessions ini.`}
                            </Text>
                            <TextField
                              style={{ paddingTop: 0 }}
                              inputStyle={{ minHeight: Spacing[128] }}
                              isRequired={false}
                              secureTextEntry={false}
                              isTextArea={true}
                              editable={!coachingStore.isDetail}
                              // value={leassons}
                              isError={isError}
                              onChangeText={handleChange("recommendationForCoachee")}
                              charCounter={true}
                            />
                          </VStack>
                        )}
                        <VStack top={Spacing[12]}>
                          <Text
                            type={"body-bold"}
                            style={[
                              { textAlign: "center", top: Spacing[4] },
                              isError && !values.recommendationForCoachee ? styles.textError : null,
                            ]}
                          >
                            Dari sesi coaching, apa
                            <Text type={"body-bold"} style={{ color: Colors.ABM_LIGHT_BLUE }}>
                              {" rekomendasi saya untuk coachee?"}
                            </Text>
                          </Text>
                          <TextField
                            style={{ paddingTop: 0 }}
                            inputStyle={{ minHeight: Spacing[128] }}
                            isRequired={false}
                            secureTextEntry={false}
                            isTextArea={true}
                            editable={!coachingStore.isDetail}
                            value={values.recommendationForCoachee}
                            isError={isError && !values.recommendationForCoachee }
                            onChangeText={handleChange("recommendationForCoachee")}
                            charCounter={true}
                          />
                        </VStack>

                        <VStack>
                          <Text
                            type={"body-bold"}
                            style={[
                              { textAlign: "left" },
                              isError && !values.type ? styles.textError : null,
                            ]}
                          >Pilih kategori coaching:</Text>
                          <DropDownPicker
                            items={dataJournalTags}
                            isRequired={false}
                            hideInputFilter={true}
                            // value={values.lea}
                            onValueChange={(value: DropDownItem | DropDownItem[]) => {
                              setFieldValue("type", value.key)
                            }}
                            placeholder={"Pilih kategori"}
                            containerStyle={{ marginTop: -Spacing[24] }}
                            isError={isError && !values.type}
                            multiple={false}
                          />
                          {values.type === "other" && (
                            <TextField
                              style={{ paddingTop: 0 }}
                              inputStyle={{ minHeight: Spacing[48], marginTop: Spacing[8]}}
                              placeholder="Tulis kategori coaching di sini."
                              isRequired={false}
                              secureTextEntry={false}
                              isTextArea={false}
                              editable={!coachingStore.isDetail}
                              // value={leassons}
                              isError={isError && !values.label}
                              onChangeText={handleChange("label")}
                            />
                          )}
                        </VStack>

                        {/* {coachingStore.isFormCoach && (
                          <VStack vertical={Spacing[16]}>
                             <VStack bottom={Spacing[8]} horizontal={Spacing[96]}>
                              <ActivityTypeSelector
                                onActivityPress={(item)=>{
                                  console.log(item)
                                  holdActivitiesId(item, setFieldValue)
                                }}
                                selectedActivity={selectedActivities}
                                isError={isError === 'type'}
                              />
                            </VStack> 
                             <Text
                              type={"body-bold"}
                              style={[
                                { color: Colors.ABM_LIGHT_BLUE, textAlign: "center" },
                                fieldError ? styles.textError : null,
                              ]}
                            >
                              {"Pilihlah kategori sesi coaching-mu."}
                            </Text> 
                           </VStack>
                        )} */}
                        <VStack horizontal={Spacing[72]} top={Spacing[24]}>
                          {/* {coachingStore.isFormCoach ? (
                            <ActivitiesTypeLegends showedItems={[1]} />
                          ) : (
                            <ActivitiesTypeLegends showedItems={[2]} />
                          )}
                          <Spacer height={Spacing[24]} /> */}
                          {coachingStore.isDetail ? (
                            <Button
                              type={"primary"}
                              text={"Lihat Catatan Coachee"}
                              onPress={handleSubmit}
                            />
                          ) : (
                            <Button
                              type={"primary"}
                              text={"Simpan Catatan"}
                              onPress={handleSubmit}
                            />
                          )}
                        </VStack>
                      </VStack>
                    </VStack>
                  </ScrollView>
                  <Modal
                    isOpen={isModalVisible}
                    style={{
                      position: "absolute",
                      width: dimensions.screenWidth - Spacing[24],
                      backgroundColor: "rgba(52, 52, 52, 0)",
                    }}
                  >
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <VStack
                        style={{
                          backgroundColor: Colors.WHITE,
                          borderRadius: Spacing[48],
                          minHeight: Spacing[256],
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        horizontal={Spacing[24]}
                        vertical={Spacing[24]}
                      >
                        <VStack vertical={Spacing[12]}>
                          <Spacer height={Spacing[24]} />
                          <CalendarPicker
                            onDateChange={(value) => {
                              onDateChange(value, setFieldValue)
                            }}
                            textStyle={{
                              fontFamily: typography.primaryBold,
                              colors: Colors.ABM_MAIN_BLUE,
                            }}
                            selectedDayColor={Colors.ABM_YELLOW}
                            selectedDayTextColor={Colors.ABM_MAIN_BLUE}
                            style={{ padding: Spacing[20] }}
                            width={dimensions.screenWidth - Spacing[64]}
                            maxDate={new Date()}
                          />
                          <HStack style={[Layout.widthFull, { justifyContent: "center" }]}>
                            <Button type={"light-bg"} text={"Cancel"} onPress={toggleModal} />
                            <Spacer width={Spacing[4]} />
                            <Button
                              type={"primary"}
                              text={"Pilih"}
                              onPress={toggleModal}
                              style={{ minWidth: Spacing[72] }}
                            />
                          </HStack>
                        </VStack>
                      </VStack>
                    </View>
                  </Modal>
                </SafeAreaView>
              </>
            )}
          </Formik>

          <Spinner
            visible={coachingStore.isLoading || mainStore.isLoading}
            textContent={"Memuat..."}
            // textStyle={styles.spinnerTextStyle}
          />

          <Modal
            isOpen={isEncouragementModalVisible}
            style={{
              height: "50%",
              width: dimensions.screenWidth - Spacing[24],
              backgroundColor: "rgba(52, 52, 52, 0)",
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <VStack
                style={{
                  backgroundColor: Colors.WHITE,
                  borderRadius: Spacing[48],
                  minHeight: Spacing[256],
                  alignItems: "center",
                  justifyContent: "center",
                }}
                horizontal={Spacing[24]}
                vertical={Spacing[24]}
              >
                <VStack horizontal={Spacing[24]} top={Spacing[24]} style={Layout.widthFull}>
                  <VStack style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity style={{backgroundColor: Colors.ABM_LIGHT_BLUE, borderRadius: 999, width: Spacing[32], height: Spacing[32], alignItems:'center'}} onPress={toggleEncouragementModal}>
                      <Text type={"body-bold"} style={{color: Colors.WHITE, fontSize: Spacing[24], lineHeight: Spacing[32]}} >x</Text>
                    </TouchableOpacity>
                  </VStack>
                  <VStack>
                    <Text
                      type={"body-bold"}
                      style={{ fontSize: Spacing[18], textAlign: "center" }}
                      text={"Nicely done! "}
                    />
                    <Spacer height={Spacing[24]} />
                    <Text type={"body"} style={{ textAlign: "center", top: Spacing[4] }}>
                      {`Sebelum catatan coaching-mu tersimpan \n`}
                      <Text type={"body-bold"}>{"isi self-reflection feedback "}</Text>
                      <Text>{`dulu yaa`}</Text>
                    </Text>
                    <Spacer height={Spacing[24]} />
                    <Text
                      type={"body"}
                      style={{ textAlign: "center" }}
                      text={
                        "Feedback ini akan diisi juga oleh coachee-mu juga sehingga kamu dapat membandingkan penilaian dirimu sendiri dengan penilaian dari coachee-mu."
                      }
                    />
                    <Spacer height={Spacing[24]} />
                    <Text
                      type={"body"}
                      style={{ textAlign: "center", color: Colors.ABM_LIGHT_BLUE }}
                      text={
                        "Penting! Coaching journal-mu belum tersimpan sampai kamu klik “Submit” setelah melakukan feedback."
                      }
                    />
                    <Spacer height={Spacing[20]} />
                    <HStack bottom={Spacing[32]}>
                      <Spacer />
                      <VStack style={{ maxWidth: Spacing[256], minWidth: Spacing[128] }}>
                        <Button
                          type={"primary"}
                          text={"Isi Feedback"}
                          style={{ height: Spacing[32], paddingHorizontal: Spacing[8] }}
                          textStyle={{ fontSize: Spacing[14], lineHeight: Spacing[18] }}
                          onPress={goToFeedback}
                        />
                      </VStack>
                      <Spacer />
                    </HStack>
                  </VStack>
                </VStack>
              </VStack>
            </View>
          </Modal>
        </VStack>
      </KeyboardAvoidingView>
    )
  },
)

export default NewJournalEntry
