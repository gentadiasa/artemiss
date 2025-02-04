import React, {FC, useCallback, } from "react"
import { SafeAreaView, Linking } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Text,
  BackNavigation, Button
} from "@components"
import { NavigatorParamList } from "@navigators/main-navigator"
import {VStack} from "@components/view-stack";
import Spacer from "@components/spacer";
import {Colors, Layout, Spacing} from "@styles";
import {useStores} from "../../bootstrap/context.boostrap";
import RNAnimated from "react-native-animated-component";
import Config from 'react-native-config';

const Settings: FC<StackScreenProps<NavigatorParamList, "settingsPage">> = observer(
  ({ navigation }) => {

    const { authStore } = useStores()

    const goBack = () => {
      navigation.reset({
        routes: [{ name: 'homepage' }]
      })
    }

    const goToMyAccount = () => navigation.navigate('myAccount')

    const goToNotification = () => navigation.navigate('notificationSettings')

    const logout = useCallback( ()=>{
      authStore.resetAuthStore()
    }, [])

    const deleteAccountForm = async() => {
      try {
        const url = Config.DELETE_ACCOUNT_URL

        if (await Linking.canOpenURL(url)) {
          await Linking.openURL(url)
        }
      } catch (e) {
        console.log(e)
        throw new Error('Error deleteAccountForm button');
      }
    }

    return (
      <VStack testID="CoachingJournalMain" style={{backgroundColor: Colors.ABM_BG_BLUE, flex: 1, justifyContent: 'center'}}>
        <SafeAreaView style={Layout.flex}>
          <BackNavigation goBack={goBack} color={Colors.ABM_DARK_BLUE} />
          <VStack top={Spacing[8]} horizontal={Spacing[24]} bottom={Spacing[12]}>
            <Spacer height={Spacing[24]} />
            <Text type={'header'} style={{ fontSize: Spacing[16]}} text="Settings" />
            <Spacer height={Spacing[32]} />
          </VStack>
          <VStack top={Spacing[32]} horizontal={Spacing[24]} style={[Layout.heightFull, {backgroundColor: Colors.WHITE, borderTopStartRadius: Spacing[48], borderTopEndRadius: Spacing[48]}]}>
            <VStack top={Spacing[32]} horizontal={Spacing[48]}>
              <RNAnimated
                appearFrom={'left'}
                animationDuration={300}
              >
                <Button
                  type={"primary"}
                  text={"My Account"}
                  onPress={goToMyAccount}
                />
              </RNAnimated>
              {/* <Spacer height={Spacing[16]} />
              <RNAnimated
                appearFrom={'left'}
                animationDuration={500}
              >
                <Button
                  type={"primary-dark"}
                  text={"Notifications"}
                  onPress={goToNotification}
                />
              </RNAnimated> */}
              <Spacer height={Spacing[16]} />
              <RNAnimated
                appearFrom={'left'}
                animationDuration={700}
              >
                <Button
                  type={"warning"}
                  text={"Delete Account"}
                  onPress={deleteAccountForm}
                />
              </RNAnimated>
              <Spacer height={Spacing[16]} />
              <RNAnimated
                appearFrom={'left'}
                animationDuration={700}
              >
                <Button
                  type={"primary-dark"}
                  text={"Logout"}
                  onPress={logout}
                />
              </RNAnimated>
            </VStack>
            <Spacer height={Spacing[12]} />

          </VStack>
        </SafeAreaView>
      </VStack>
    )
  },
)

export default Settings;
