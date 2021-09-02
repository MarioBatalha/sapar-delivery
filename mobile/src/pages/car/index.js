import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { useDispatch } from 'react-redux';

//import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { updateCar } from '../../store/modules/app/action';

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

const Car = () => {
  const dispatch = useDispatch();
  const [car, setCar] = useState({
    owner: null,
    plate: null,
    brand: null,
    color: null,
  });

  const handleSignIn = () => {
    dispatch(updateCar(car));
  };

  const handleLoginPage = () => {
    useNavigation.navigate('Login');
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
      <View width="85%">
        <SubTitle color="secondary">
          Registre a sua viatura e trabalhe connosco
        </SubTitle>
        <Spacer height={20} />
        <View width="80%">
          <Input
            placeholder="Proprietário"
            onChangeText={owner => {
              setCar({ ...car, owner });
            }}
            value={car.owner}
          />
          <Input
            placeholder="Matrícula"
            onChangeText={plate => {
              setCar({ ...car, plate });
            }}
            value={car.plate}
          />
          <Input
            placeholder="Marca e Modelo"
            onChangeText={brand => {
              setCar({ ...car, brand });
            }}
            value={car.brand}
          />
          <Input
            placeholder="Cor"
            onChangeText={owner => {
              setCar({ ...car, color });
            }}
            value={car.color}
          />

          <Button color="button" onPress={() => handleSignIn()}>
            <ButtonText color="default">Começar a usar</ButtonText>
          </Button>
          <Button onPress={() => handleLoginPage()}>
            <SubTitle color="secondary">
              Já tem registro?<BoldText> Entrar. </BoldText>
            </SubTitle>
          </Button>
        </View>
      </View>
    </View>
  );
};
export default Car;
