import React from 'react';
import { View, Image } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Taxi from '../../assets/img/taxi.png';

import { Title, SubTitle, Button } from '../../styles';

const Home = () => {
  const navigation = useNavigation();

  const handleTaxi = () => {
    navigation.navigate('Ride');
  };

  const handleDelivery = () => {
    alert('Serviço de entrega indisponivel de momento');
  };

  const handleShop = () => {
    alert('Serviço compras indisponivel de momento');
  };

  const handleFood = () => {
    alert('Serviço refeições indisponivel de momento');
  };

  return (
    <View
      justify="flex-start"
      style={{ backgroundColor: '#000' }}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <View
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundColor: '#FFB21E',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 14,
        }}
        padding={30}
        position="relative"
        height={350}
        zIndex={999}
        borderRadius={25}
        width="100%"
      >
        <Image source={Taxi} top={20} width={10} height={10} />
        <Button top={-10} onPress={handleTaxi}>
          <Title>TÁXI</Title>
          <SubTitle color="default">
            Desloque-se de qualquer lugar a qualquer momento.
          </SubTitle>
        </Button>
      </View>
      <View
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundColor: '#FFB21E',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 14,
        }}
        padding={10}
        position="relative"
        height={140}
        width="100%"
        top={-20}
        zIndex={888}
        borderRadius={25}
      >
        <Button top={-20} onPress={handleDelivery}>
          <Title>ENTREGAS</Title>
          <SubTitle color="default">Entregas a qualquer momento.</SubTitle>
        </Button>
      </View>
      <View
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundColor: '#FFB21E',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 14,
        }}
        padding={20}
        position="relative"
        height={120}
        width="100%"
        top={-30}
        zIndex={777}
        borderRadius={25}
      >
        <Button top={-20} onPress={handleShop}>
          <Title>COMPRAS</Title>
          <SubTitle color="default">
            Compre o que quiser no conforto da sua casa.
          </SubTitle>
        </Button>
      </View>
      <View
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundColor: '#FFB21E',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 14,
        }}
        padding={20}
        position="relative"
        height={140}
        width="100%"
        top={-70}
        zIndex={666}
        borderRadius={25}
      >
        <Button top="10px" onPress={handleFood}>
          <Title>REFEIÇOES</Title>
          <SubTitle color="default">
            Compre o que quiser no conforto da sua casa.
          </SubTitle>
        </Button>
      </View>
      <View
        alignItems="center"
        justifyContent="center"
        top={-73}
        width="110%"
        padding={10}
      >
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          style={{ backgroundColor: '#FFB21E' }}
          borderRadius={40}
          width="90%"
          padding={10}
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
    </View>
  );
};
export default Home;
