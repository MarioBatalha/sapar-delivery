import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateUser, checkUser } from '../../store/modules/app/action';

import social from '../../services/social';
import graph from '../../services/facebook';
import Logo from '../../assets/img/logo.png';

import {
  Title,
  SubTitle,
  Spacer,
  Avatar,
  Input,
  Button,
  ButtonText,
  BoldText,
} from '../../styles';

const Login = async () => {
  const phone = await AsyncStorage.getItem('phone');
  const password = await AsyncStorage.getItem('password');

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const handleSignUp = async () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    const { phone, password } = await AsyncStorage.getItem('user');
    await dispatch(checkUser(phone, password));
    if (user) {
      dispatch(updateUser(JSON.parse(user)));
      navigation.replace('Home');
    }
  };
  /*
    const login = async () => {
    try {
      const auth = await social.authorize('facebook', {
        scopes: 'email',
      });

      const user = await social.makeRequest(
        'facebook',
        '/me?fields=id,name,email',
      );

      const user = await graph.get(
        `/me?fields=id,name,email&access_token=${auth.response.credentials.accessToken}`,
      );

      dispatch(
        updateUser({
          fbId: user.data.id,
          nome: user.data.name,
          email: user.data.email,
          accessToken: auth.response.credentials.accessToken,
        }),
      );
      dispatch(checkUser());
    } catch (err) {
      alert(err.message);
    }
  };

  const checkLogin = async () => {
    //AsyncStorage.clear();
    const user = await AsyncStorage.getItem('@user');
    if (user) {
      dispatch(updateUser(JSON.parse(user)));
      navigation.replace('Home');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);*/

  return (
    <View
      justify="flex-start"
      style={{ backgroundColor: 'black' }}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <View
        alignItems="center"
        justifyContent="center"
        padding={30}
        position="relative"
        height={270}
        top={0}
        zIndex={9}
      >
        <Image source={Logo} />
        <Title color="secondary">Sapar Delivery</Title>
      </View>
      <View alignItems="center" justifyContent="center">
        <FontAwesome name="user-circle" size={50} color="white" />
        <Title color="secondary">Iniciar sessao</Title>
      </View>
      <View width="80%">
        <Button
          style={{ backgroundColor: '#4267B2' }}
          onPress={() => handleSignUp()}
          compact
          row
        >
          <Ionicons name="md-logo-facebook" size={24} color="white" />
          <Spacer width="10px" />
          <ButtonText color="secondary">Fazer Login com o Facebook</ButtonText>
        </Button>
        <Input
          keyboardType="numeric"
          placeholder="+244 911 111 111"
          value={phone}
          onChangeText={phone => {
            AsyncStorage.setItem('phone', phone);
          }}
        />
        <Input
          textContentType="password"
          placeholder="Palavra-passe"
          value={password}
          onChangeText={password => {
            AsyncStorage.setItem('password', password);
          }}
        />
        <Button color="button" onPress={() => handleLogin()}>
          <ButtonText color="default">Log In</ButtonText>
        </Button>
        <Button onPress={handleSignUp}>
          <SubTitle color="secondary">
            Não tem conta?<BoldText> Criar uma. </BoldText>
          </SubTitle>
        </Button>
      </View>
    </View>
  );
};
export default Login;
