import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContainerComponent from '../../components/common/ContainerComponent'
import TextComponent from '../../components/common/TextComponent'

const Celender = () => {
  return (
    <ContainerComponent>
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TextComponent
          text='Celendar'
          textAlign='center'
          fontWeight={'800'}
          size={40}
        />
     </View>
    </ContainerComponent>
  )
}

export default Celender

const styles = StyleSheet.create({})