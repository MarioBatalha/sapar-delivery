import React, { useState, useEffect } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/img/logo.png';

import {
  Title,
  SubTitle,
  Input,
  Button,
  ButtonText,
  BoldText,
} from '../../styles';

const Register = () => {
  const [visible, setVisible] = useState(true);
  const [isChecked, setChecked] = useState(true);

  useEffect(() => {
    const keyboarDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setVisible(false),
    );

    const keyboarDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setVisible(true),
    );

    return () => {
      keyboarDidShowListener.remove();
      keyboarDidHideListener.remove();
    };
  }, []);

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Login');
  };

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
        <FontAwesome5 name="user-plus" size={50} color="white" />
        <Title color="secondary">Registrar</Title>
      </View>
      <View width="80%">
        <Input keyboardType="numeric" placeholder="+244 911 111 111" />
        <Input textContentType="password" placeholder="Palavra-passe" />
        <View width="105%" color="transparent">
          <CheckBox
            center
            title="Aceito os termos e condições"
            checked={isChecked}
            checkedColor="#FFB21E"
            containerStyle={{ backgroundColor: '#FFFFFF00' }}
          />
          <CheckBox
            center
            title="Aceito receber com novidades"
            checkedColor="#FFB21E"
            containerStyle={{ backgroundColor: '#FFFFFF00' }}
          />
        </View>
        <Button color="button" onPress={handleRegister}>
          <ButtonText color="default">Registar</ButtonText>
        </Button>
        <Button onPress={handleRegister}>
          <SubTitle color="secondary">
            Já tem conta?<BoldText> Entrar. </BoldText>
          </SubTitle>
        </Button>
      </View>
    </View>
  );
};
export default Register;
