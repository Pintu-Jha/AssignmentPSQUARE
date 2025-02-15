import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import EmailIcon from '../../assets/svg/Email';
import PassWordIcon from '../../assets/svg/Password';
import ContainerComponent from '../../components/common/ContainerComponent';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import TextComponent from '../../components/common/TextComponent';
import { spacing } from '../../styles/spacing';
import { navigate } from '../../utils/helperFunctions';
import { AuthRouteNames } from '../../navigation/auth/AuthRouteName';
import { useAppDispatch } from '../../components/hooks';
import { loginUser } from '../../api/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isLoding, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onPressRegister = () => {
    navigate(AuthRouteNames.Signup)
  }

  const handleLogin = async () => {
    if (!email || !passWord) {
      Alert.alert('Please enter email and password');
      return;
    }
    try {
      setIsLoading(true)
      const result = await dispatch(loginUser({ email, password: passWord })).unwrap();
      console.log(result);
      Alert.alert('Login Successful');
    } catch (error) {
      console.error('Login error:', error);
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
   <ContainerComponent useScrollView={false}>
    <View style={styles.container}>
      <TextComponent
        text='LOGIN'
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
        <TextComponent
      text='Forgot Password !'
      textAlign={'right'}
      color={'#04238E'}
      style={{marginTop:spacing.MARGIN_8}}
      size={16}
      fontWeight={'500'}
   />
   </View>
   <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
      <TextComponent text="Don't Have an Account: " color="#000" size={16} fontWeight='500'/>
      <TouchableOpacity onPress={onPressRegister}>
        <TextComponent text="Click here to register" color="#04238E" size={16} fontWeight="500" />
      </TouchableOpacity>
    </View>

    <View style={styles.loginBtnContainer}>
    <CustomButton
        title="LOGIN"
        onPress={handleLogin}
        gradientColors={['#5391B4','#5391B4']}
        loading={isLoding}
      />
    </View>
</ContainerComponent>
  )
}

export default Login

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