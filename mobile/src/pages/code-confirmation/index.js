import React, { useState, useEffect } from 'react';
import { View, Image, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/img/logo.png';

import {
  Title,
  SubTitle,
  Spacer,
  Input,
  Button,
  ButtonText,
  BoldText,
} from '../../styles';

const CodeConfirmation = () => {
  const [visible, setVisible] = useState(true);

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
  const handleHome = () => {
    navigation.navigate('Home');
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
      <Spacer height={60} />
      <View alignItems="center" justifyContent="center" width="100%">
        {/*<AntDesign name="checkcircle" size={100} color="white" />
          <Spacer height={60} />
          <Title color='secondary'>Sua conta foi criada com sucesso</Title>*/}
        {/* Colocar a condiçao caso o codigo seja confirmado*/}
        <Title color="secondary">Código de confirmação</Title>
        <SubTitle>
          Foi enviado um código por mensagem para o seu número. Digite abaixo
        </SubTitle>
        <Spacer height={30} />
        <View width="80%">
          <Input width="70%" placeholder="C- XXX - XXX" />
          <Button>
            <SubTitle>
              Não recebeu o codigo? <BoldText>Reenviar</BoldText>
            </SubTitle>
          </Button>
          <Button color="button" onPress={handleHome}>
            <ButtonText>Confirmar</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CodeConfirmation;
