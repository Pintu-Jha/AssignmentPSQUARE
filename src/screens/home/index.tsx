import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EmailIcon from '../../assets/svg/Email'
import ContainerComponent from '../../components/common/ContainerComponent'
import Header from '../../components/common/HeaderComponent'
import MenuIcon from '../../assets/svg/BurgarMenu'
import LOGO from '../../assets/svg/LOGO'
import { spacing } from '../../styles/spacing'
import ActionGrid from '../../components/common/ActionButton'
import HomeActionReminderIcon from '../../assets/svg/HomeActionReminderIcon'
import HomeActionMessage from '../../assets/svg/HomeActionMessage'
import HomeActionCelendar from '../../assets/svg/HomeActionCelendar'
import TextComponent from '../../components/common/TextComponent'
import CustomButton from '../../components/common/CustomButton'
import { PromotionalCardsList } from '../../components/common/PromotionalCard'
import PrmotionCardImage from '../../assets/svg/PrmotionCardImage'
import PomotionMeditonIcon from '../../assets/svg/PomotionMeditonIcon'
import HomeActionQuestionIcon from '../../assets/svg/HomeActionQuestionIcon'
import { navigate } from '../../utils/helperFunctions'
import { HomeRoutesName } from '../../navigation/main/healthcare-home/HomeRoutesName'

const Home = () => {

  const actionButtons = [
    {
      title: 'Questions',
      icon: <HomeActionQuestionIcon size={24}  />,
      onPress: () => console.log('Questions pressed'),
    },
    {
      title: 'Reminders',
      icon: <HomeActionReminderIcon size={24} color="#2196F3" />,
      onPress: () => navigate(HomeRoutesName.RemindersScreen),
    },
    {
      title: 'Messages',
      icon: <HomeActionMessage size={24} color="#FFC107" />,
      onPress: () => console.log('Messages pressed'),
    },
    {
      title: 'Calendar',
      icon: <HomeActionCelendar size={24} color="#9C27B0" />,
      onPress: () => console.log('Calendar pressed'),
    },
  ];
  const promotionalCards  = [
    {
      title: 'Get the Best\nMedical Service',
      description: 'Rem illum facere quo corporis Quis in saepe itaque ut quos pariatur. Qui numquam rerum hic repudiandae rerum id amet tempore nam molestias omnis qui earum voluptatem!',
      backgroundColor: '#C8F5C4', 
      Icon: PrmotionCardImage,
      // buttonText: 'Learn More',
      // onButtonPress: () => console.log('Medical service pressed'),
    },
    {
      title: '80% offer',
      description: 'On Health Products',
      backgroundColor: '#D7D0FF', 
      Icon: PomotionMeditonIcon,
      buttonText: 'SHOP NOW',
      onButtonPress: () => console.log('Shop now pressed'),
    },  
    {
      title: 'Get the Best\nMedical Service',
      description: 'Rem illum facere quo corporis Quis in saepe itaque ut quos pariatur. Qui numquam rerum hic repudiandae rerum id amet tempore nam molestias omnis qui earum voluptatem!',
      backgroundColor: '#C8F5C4', 
      Icon: PrmotionCardImage,
      // buttonText: 'Learn More',
      // onButtonPress: () => console.log('Medical service pressed'),
    },
    {
      title: '80% offer',
      description: 'On Health Products',
      backgroundColor: '#D7D0FF', 
      Icon: PomotionMeditonIcon,
      buttonText: 'SHOP NOW',
      onButtonPress: () => console.log('Shop now pressed'),
    },    
  ];
  return (
    <ContainerComponent>
      <Header
         leftItem={ 
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
           <TouchableOpacity style={{marginRight:spacing.MARGIN_10}}>
           <MenuIcon  color='#000' size={30}/>
           </TouchableOpacity>
            <LOGO/>
          </View>}
        rightItem={
         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
           <EmailIcon  color='#000' size={30}/>
            <EmailIcon   color='#000' size={30}/>
        </View>
        }
      />
      <View style={{flex:1}}>
      <ActionGrid actions={actionButtons} />

      <View style={styles.uploadPrescriptionContainer}>
        <TextComponent
          text='UPLOAD PRESCRIPTION'
          color='#3A3A3A'
          fontWeight={'700'}
          size={20}
        />
        <TextComponent
          text={'Upload a Prescription and Tell Us What  you Need. We\ndo the Rest. !'}
          color='#3A3A3A'
          fontWeight={'600'}
          size={14}
          lineHeight={24}
        />
       <View style={styles.uploadPrescriptionSubContainer}>
         <TextComponent
            text={"Flat 25% OFF ON\nMEDICINES"}
            fontWeight="700"
            color="#4A4A4A"
            size={14}
          />
        <CustomButton
          title="ORDER NOW"
          textStyle={{ color: "#fff", fontWeight: "700" }}
          gradientColors={["#1C82DF", "#1C82DF"]}
          onPress={() => {}}
          containerStyle={styles.orderButton}
        />
       </View>
      </View>
     
      </View>
     <PromotionalCardsList cards={promotionalCards} />
    </ContainerComponent>
  )
} 

export default Home

const styles = StyleSheet.create({
  uploadPrescriptionContainer:{
    marginTop:spacing.MARGIN_16
  },
  uploadPrescriptionSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.PADDING_10,
  },
  
  
  orderButton: {
    justifyContent: "center",
    alignItems: "center",
  },
})