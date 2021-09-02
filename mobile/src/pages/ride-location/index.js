import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
//import { PROVIDER_GOOGLE } from 'react-native-maps';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import { Title, SubTitle, Button, ButtonText, BoldText } from '../../styles';

const RideLocation = () => {
  const [list, setList] = useState([]);

  const getPlaces = async address => {
    try {
      const response = await api.get(`/address/${address}`);
      const res = response.data;

      if (re.error) {
        alert(res.message);
        return false;
      }

      setList(res.list);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <View
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: '#FFB21E',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      padding={10}
      position="absolute"
      height={300}
      zIndex={999}
      borderRadius={25}
      width="95%"
      top={325}
    >
      <Title color="default" style={{ top: -15 }}>
        TÁXI
      </Title>
      <Fontisto name="taxi" size={30} color="#161616" />
      <View flexDirection="row">
        <BoldText color="default">Embarque: </BoldText>
        <SubTitle color="default">Mutamba</SubTitle>
      </View>
      <View flexDirection="row">
        <BoldText color="default">Destino: </BoldText>
        <SubTitle color="default">Vila Alice</SubTitle>
      </View>
      <Button color="button" border="1px solid #000">
        <ButtonText>Proceder</ButtonText>
      </Button>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        style={{
          backgroundColor: '#FFB21E',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        borderRadius={40}
        width="95%"
        top={300}
      >
        <Button width="auto">
          <FontAwesome5 name="home" size={30} color="black" />
        </Button>
        <Button width="auto">
          <FontAwesome5 name="wallet" size={30} color="black" />
        </Button>
        <Button width="auto">
          <Fontisto name="arrow-swap" size={30} color="black" />
        </Button>
        <Button width="auto">
          <FontAwesome name="user-circle" size={30} color="black" />
        </Button>
      </View>
    </View>
  );
};
export default RideLocation;
