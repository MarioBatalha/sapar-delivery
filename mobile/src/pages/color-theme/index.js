import React from 'react';
import { Image, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Logo from '../../assets/img/logo.png';

import {
  Container,
  Title,
  Spacer,
  Avatar,
  Button,
  ButtonText,
} from '../../styles';

const ColorTheme = () => {
  const navigation = useNavigation();

  const handleColorTheme = () => {
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
        padding={50}
        position="relative"
        height={270}
        top={10}
        zIndex={9}
      >
        <Image source={Logo} />
        <Title color="secondary">Sapar Delivery</Title>
      </View>
      <Spacer height={150} />
      <View>
        <Title color="secondary">ESCOLHER TEMA</Title>
        <Spacer height={30} />
        <View flexDirection="row" justifyContent="space-around">
          <Button width="auto" onPress={handleColorTheme}>
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={80}
              color="white"
            />
            <ButtonText color="secondary">Claro</ButtonText>
          </Button>
          <Button width="auto" onPress={handleColorTheme}>
            <MaterialCommunityIcons
              name="circle-slice-8"
              size={80}
              color="gray"
            />
            <ButtonText color="secondary">Escuro</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ColorTheme;
