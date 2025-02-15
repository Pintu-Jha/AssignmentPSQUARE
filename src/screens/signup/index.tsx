import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { signupUser } from '../../api/slices/authSlice';
import EmailIcon from '../../assets/svg/Email';
import PassWordIcon from '../../assets/svg/Password';
import PersonIcon from '../../assets/svg/Person';
import ContainerComponent from '../../components/common/ContainerComponent';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import TextComponent from '../../components/common/TextComponent';
import { useAppDispatch } from '../../components/hooks';
import { AuthRouteNames } from '../../navigation/auth/AuthRouteName';
import { spacing } from '../../styles/spacing';
import { replace } from '../../utils/helperFunctions';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onPressLogin = () => {
    replace(AuthRouteNames.Login)
  }

  const handleSignup = async () => {
    if (!name || !email || !passWord) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true)
      const resultAction = await dispatch(signupUser({ name, email, password:passWord })).unwrap();
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Signup Failed', error as string);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
   <ContainerComponent useScrollView={false}>
    <View style={styles.container}>
      <TextComponent
        text='SIGNUP'
        textAlign={'center'}
        size={24}
        fontWeight={'500'}
      />
    </View>
    <View style={styles.container}>
      <TextComponent
        text='Healthcare'
        textAlign={'center'}
        size={50}
        fontWeight={'500'}
      />
    </View>

   <View style={styles.textInputContainer}>
   <CustomInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        leftIcon={<PersonIcon color={"#000"} size={24}  />}
        keyboardType="email-address"
        containerStyle={{marginTop:spacing.MARGIN_20}}
      />
   <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        leftIcon={<EmailIcon color={"#000"} size={24}  />}
        keyboardType="email-address"
        containerStyle={{marginTop:spacing.MARGIN_20}}
      />
     <CustomInput
        value={passWord}
        onChangeText={setPassWord}
        placeholder="PassWord"
        leftIcon={<PassWordIcon color={"#000"} size={24}  />}
        containerStyle={{marginTop:spacing.MARGIN_30}}
      />
   </View>
   <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
      <TextComponent text="I Have an Account: " color="#000" size={16} fontWeight='500'/>
      <TouchableOpacity onPress={onPressLogin}>
        <TextComponent text="Click here to login" color="#04238E" size={16} fontWeight="500" />
      </TouchableOpacity>
    </View>

    <View style={styles.loginBtnContainer}>
    <CustomButton
        title="SIGNUP"
        onPress={handleSignup}
        gradientColors={['#5391B4','#5391B4']}
        loading={isLoading}
      />
    </View>
</ContainerComponent>
  )
}

export default Signup

const styles = StyleSheet.create({
  container:{
    marginVertical:spacing.MARGIN_30
  },
  textInputContainer:{
    marginVertical:spacing.MARGIN_30
  },
  loginBtnContainer:{
    marginTop:spacing.MARGIN_100
  }
})