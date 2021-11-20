import React, { createRef, FC, useCallback, useEffect, useState } from "react"
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Text, BackNavigation, Button, TextField } from "@components"
import { NavigatorParamList } from "@navigators/feed-navigator"
import { HStack, VStack } from "@components/view-stack"
import Spacer from "@components/spacer"
import { Colors, Layout, Spacing } from "@styles"

import FastImage from "react-native-fast-image"
import { launchImageLibrary, ImagePickerResponse, launchCamera } from "react-native-image-picker"
import { useStores } from "../../bootstrap/context.boostrap"

import insertPict from "@assets/icons/feed/insertPict.png"
import smileYellow from "@assets/icons/coachingJournal/empty/smile-yellow.png"
import { FeedTimelineItem } from "./feed.type"
import ActionSheet from "react-native-actions-sheet/index"

const NEW_ITEM_CONTAINER: StyleProp<any> = {
  zIndex: 10,
  height: Spacing[18],
  width: Spacing[18],
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.MAIN_RED,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  right: 0,
  // alignSelf: "flex-end",
}

const NewPost: FC<StackScreenProps<NavigatorParamList, "newPost">> = observer(({ navigation }) => {
  // empty list state
  const { feedStore } = useStores()

  const qualityImage = Platform.OS === "ios" ? 0.4 : 0.5
  const maxWidthImage = 1024
  const maxHeightImage = 1024

  const [selectedPicture, setSelectedPicture] = useState([])
  const [isAddPictDisabled, setIsAddPictDisabled] = useState(false)
  const [selectionPictLimit, setSelectionPictLimit] = useState(4)
  // const onRefresh = React.useCallback(async() => {
  //   setCoachingData([])
  // }, []);

  const goBack = () => navigation.goBack()

  const actionSheetRef = createRef()

  const NotificationCounter = ({ id }: { id: number }) => {
    return (
      <TouchableOpacity style={NEW_ITEM_CONTAINER} onPress={() => {removeSelectedPict(id)}}>
        {/* <VStack > */}
          <Text
            type={"label"}
            style={{ fontSize: Spacing[12], color: "white" }}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            text={"X"}
          />
        {/* </VStack> */}
      </TouchableOpacity>
    )
  }

  const removeSelectedPict = (id) => {
    const tempSelected = [...selectedPicture];
    tempSelected.splice(id, 1);
    setSelectedPicture(tempSelected)
  }
 
  const cameraHandler = useCallback(async (response: ImagePickerResponse) => {
    if (!response.didCancel) {
      const formData = new FormData()
      // formData.append('files', response.assets[0].base64 )
      formData.append("files", {
        ...response.assets[0],
        // @ts-ignore
        uri:
          Platform.OS === "android"
            ? response.assets[0].uri
            : response.assets[0].uri.replace("file://", ""),
        name: `profile-image-${
          response.assets[0].fileName.toLowerCase().split(" ")[0]
        }-${new Date().getTime()}.jpeg`,
        type: response.assets[0].type ?? "image/jpeg",
        size: response.assets[0].fileSize,
      })
      console.log("RESPONSE ASET: ", response.assets)

      setSelectedPicture((selectedPicture) => [...selectedPicture, ...response.assets])
      actionSheetRef.current?.setModalVisible(false)
    } else {
      console.log("cancel")
    }
  }, [])

  const openGallery = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: qualityImage,
        maxWidth: maxWidthImage,
        maxHeight: maxHeightImage,
        includeBase64: false,
        selectionLimit: selectionPictLimit,
      },
      cameraHandler,
    )
  }, [])

  const openCamera = useCallback(() => {
    launchCamera(
      {
        mediaType: "photo",
        quality: qualityImage,
        maxWidth: maxWidthImage,
        maxHeight: maxHeightImage,
        includeBase64: false,
      },
      cameraHandler,
    )
  }, [])

  const getListFeed = useCallback(async () => {
    await feedStore.getListFeeds()
  }, [])

  useEffect(() => {
    if (selectedPicture.length === 4) {
      setIsAddPictDisabled(true)
    } else {
      setIsAddPictDisabled(false)
    }

    console.log("selectedPicture.length ", selectedPicture.length)
    let maxSelectPict = 4 - selectedPicture.length
    // console.log('maxSelectPict ', maxSelectPict)
    setSelectionPictLimit(maxSelectPict)
    // console.log("selected pict: ", selectedPicture)
  }, [
    selectedPicture,
    isAddPictDisabled,
    setIsAddPictDisabled,
    setSelectionPictLimit,
    selectionPictLimit,
  ])

  

  return (
    <VStack
      testID="newPost"
      style={{ backgroundColor: Colors.WHITE, flex: 1, justifyContent: "center" }}
    >
      <SafeAreaView style={Layout.flex}>
        <BackNavigation color={Colors.UNDERTONE_BLUE} goBack={goBack} />
        <ScrollView
          refreshControl={
            <RefreshControl
              //   refreshing={coachingStore.isLoading}
              //   onRefresh={onRefresh}
              tintColor={Colors.MAIN_RED}
            />
          }
        >
          <VStack top={Spacing[8]} horizontal={Spacing[24]} bottom={Spacing[12]}>
            <HStack>
              <Text type={"left-header"} style={{}} text="Update your Feed." />
              <Spacer />
              <HStack>
                <Button type={"transparent"} text={"Cancel"} onPress={goBack} />
              </HStack>
            </HStack>

            {/* <Spacer height={Spacing[8]} /> */}
            <VStack top={Spacing[12]}>
              <TextField
                style={{ paddingTop: 0, textAlign: "left" }}
                inputStyle={{ minHeight: Spacing[128] }}
                isRequired={false}
                secureTextEntry={false}
                isTextArea={true}
                // editable={!coachingStore.isDetail}
                // value={values.commitment}
                // isError={isError === "commitment"}
                placeholder={"Mau cerita tentang apa nih?"}
                onChangeText={() => console.log("alala")}
                charCounter={false}
              />
            </VStack>
            <HStack>
              <HStack>
                <TouchableOpacity
                  disabled={isAddPictDisabled}
                  onPress={() => {
                    actionSheetRef.current?.setModalVisible(true)
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.MAIN_BLUE,
                      padding: Spacing[4],
                      borderRadius: 5,
                      width: Spacing[36],
                      height: Spacing[36],
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: Spacing[14],
                    }}
                  >
                    <FastImage
                      style={{
                        backgroundColor: Colors.MAIN_BLUE,
                        height: Spacing[24],
                        width: Spacing[24],
                        borderRadius: Spacing[8],
                      }}
                      source={insertPict}
                      resizeMode={"contain"}
                    />
                  </View>
                </TouchableOpacity>

                <ScrollView style={{ maxWidth: "65%" }} horizontal={true}>
                  {selectedPicture.map((pic, id) => {
                    return (
                      <VStack>
                        <NotificationCounter id={id} />
                        <FastImage
                          key={id}
                          style={{
                            height: Spacing[54],
                            width: Spacing[96],
                            borderRadius: Spacing[16],
                            marginRight: Spacing[10],
                          }}
                          source={pic}
                          resizeMode={"cover"}
                        />
                      </VStack>
                    )
                  })}
                  {/* <FastImage
                    style={{
                      height: Spacing[24],
                      width: Spacing[24],
                      borderRadius: Spacing[24],
                      marginRight: Spacing[10],
                    }}
                    source={smileYellow}
                    resizeMode={"cover"}
                  />
                  <FastImage
                    style={{
                      height: Spacing[24],
                      width: Spacing[24],
                      borderRadius: Spacing[24],
                    }}
                    source={smileYellow}
                    resizeMode={"cover"}
                  /> */}
                </ScrollView>
              </HStack>
              <Button
                type={"primary"}
                text={"Update"}
                style={{
                  height: Spacing[32],
                  paddingHorizontal: Spacing[16],
                  right: 0,
                  position: "absolute",
                }}
                textStyle={{ fontSize: Spacing[14], lineHeight: Spacing[18] }}
                onPress={() => console.log("lele")}
              />
            </HStack>
            <HStack>
              <Spacer />
              <Spacer />
            </HStack>
          </VStack>
        </ScrollView>
      </SafeAreaView>
      <ActionSheet ref={actionSheetRef}>
        <VStack
          style={{ justifyContent: "center" }}
          vertical={Spacing[24]}
          horizontal={Spacing[24]}
        >
          <Button
            onPress={() => {
              openGallery()
            }}
            type={"primary"}
            text={"Galeri Foto 🖼️"}
          />
          <Spacer height={Spacing[12]} />
          <Button
            onPress={() => {
              openCamera()
            }}
            type={"primary"}
            text={"Kamera 📸"}
          />
        </VStack>
      </ActionSheet>
    </VStack>
  )
})

export default NewPost
