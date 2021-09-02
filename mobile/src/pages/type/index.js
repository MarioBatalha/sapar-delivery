import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateUser, createUser } from '../../store/modules/app/action';

import {
  Button,
  ButtonText,
  Title,
  BoldText,
  SubTitle,
  PickerButton,
  Spacer,
} from '../../styles';

const Type = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.app);

  const navigation = useNavigation();

  const handleNextPage = () => {
    const route = user.typeUser === '' ? 'Car' : 'Home';
    navigation.navigate(route);
  };

  const handleToggleType = typeUser => {
    dispatch(updateUser({ typeUser }));
    dispatch(createUser());
  };

  return (
    <View
      justify="center"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      style={{ backgroundColor: '#161616' }}
    >
      <View alignItems="center" justifyContent="center" top={-30}>
        <BoldText color="secondary">Passageiro ou motorista?</BoldText>
        <SubTitle>Selecione qual será a sua função no Vam Bazar</SubTitle>
      </View>
      <View>
        <PickerButton
          value="driver"
          height="200px"
          width="350px"
          style={{ backgroundColor: '#FFB21E' }}
          onPress={() => handleToggleType('D')}
          active={user.typeUser === 'D'}
        >
          <Fontisto name="taxi" size={70} color="black" />
          <Title>Motorista</Title>
        </PickerButton>
        <Spacer height={20} />
        <PickerButton
          height="200px"
          width="350px"
          style={{ backgroundColor: '#FFB21E' }}
          onPress={() => handleToggleType('P')}
          active={user.typeUser === 'P'}
        >
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={70}
            color="black"
          />
          <Title>Passageiro</Title>
        </PickerButton>
      </View>
      <Spacer height={20} />
      <View width="100%" alignItems="center" justifyContent="center">
        <Button color="button" width="90%" onPress={() => handleNextPage()}>
          <ButtonText>Próximo Passo</ButtonText>
        </Button>
      </View>
    </View>
  );
};

export default Type;
