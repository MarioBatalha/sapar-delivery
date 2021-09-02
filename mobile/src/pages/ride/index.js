import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
//import { PROVIDER_GOOGLE } from 'react-native-maps';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Pulse from 'react-native-pulse';
import { ActivityIndicator } from 'react-native-paper';
import { Marker, Polyline } from 'react-native-maps';

import Man from '../../assets/img/man.jpg';
import api from '../../services/api';
import { getRideInfos } from '../../store/modules/app/action';
import socket from '../../services/socket';
import {
  updateRide,
  acceptRide,
  requestRide,
} from '../../store/modules/app/action';

import {
  Title,
  SubTitle,
  Button,
  ButtonText,
  Avatar,
  Map,
  BoldText,
  Spacer,
  Input,
  AddressList,
  AddressItem,
} from '../../styles';

const Ride = () => {
  const dispatch = useDispatch();
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [driverLocation, setDriverLocation] = useState({
    latitude: -8.83682,
    longitude: 13.23432,
  });
  const [activeInput, setActiveInput] = useState(null);
  const [list, setList] = useState([]);
  const mapRef = useRef(null);
  const server = useRef(null);
  const { user, ride } = useSelector(state => state.app);

  const handleRideStatus = () => {
    if (ride?.user?._id) {
      if (ride?.driver?._id) {
        return 'inRide';
      } else {
        return 'inSearch';
      }
    }
    return 'empty';
  };

  const handleGetPlaces = async () => {
    try {
      const response = await api.get(`/address/${address}`);
      const res = response.data;

      if (!res.error) {
        setList(res.list);
      } else {
        alert(res.message);
        return false;
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGetRide = () => {
    dispatch(getRideInfos(origin.place_id, destination.place_id));
  };

  const handleUpdateSocketId = async socketId => {
    try {
      await api.put(`/socket/${user._id}`, { socketId });
      console.log('socket updated');
    } catch (err) {
      alert('update socketId error => ' + err.message);
    }
  };

  const handleUpdateLocation = async coordinates => {
    try {
      await api.put(`/location/${user._id}`, {
        coordinates,
        socketId: ride?.user?.socketId,
        status: handleRideStatus(),
      });
    } catch (err) {
      console.log('update location error => ' + err.message);
    }
  };

  const handleRideAccept = () => {
    dispatch(acceptRide());
  };

  const handleUpdateMapLocation = async coordinates => {
    if (user.typeUser === 'P') {
      setDriverLocation({
        latitude: coordinates[0],
        longitude: coordinates[1],
      });

      mapRef.current.animateCamera({
        center: {
          latitude: coordinates[0],
          longitude: coordinates[1],
        },
        zoom: 17,
      });
    }
  };

  const handleInitSocket = () => {
    server.current = socket();

    server.current.on('connect', () => {
      const id = server.current.id;
      handleUpdateSocketId(id);

      server.current.on('ride-request', ride => {
        console.log('ride request => ', ride);
        dispatch(updateRide(ride));
      });
      server.current.on('ride-accept', ride => {
        dispatch(updateRide(ride));
      });

      server.current.on('ride-update', coordinates => {
        handleUpdateMapLocation(coordinates);
      });
    });
  };

  useEffect(() => {
    mapRef.current.fitToCoordinates(ride?.info?.route, {
      options: {
        edgePadding: {
          top: 100,
          right: 70,
          bottom: 150,
          left: 70,
        },
      },
    });
  }, [ride]);

  useEffect(() => {
    handleInitSocket();
  }, []);

  return (
    <View
      justify="flex-start"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Map
        provider="google"
        loadingEnabled={true}
        showsUserLocation={true}
        ref={mapRef}
        initialRegion={{
          latitude: -8.83682,
          longitude: 13.23432,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        disabled={handleRideStatus() === 'inSearch' && user.TypeUser === 'P'}
        onRegionChangeComplete={region => {
          if (user.typeUser === 'D') {
            setDriverLocation(region);
            handleUpdateLocation([region.latitude, region.longitude]);
          }
        }}
      >
        {(ride?._id || user.typeUser === 'D') && (
          <Marker coordinates={driverLocation}></Marker>
        )}

        {ride?.info?.route && (
          <>
            <Polyline
              coordinates={ride?.info?.route}
              strokeWidth={4}
              strokeColor="default"
            ></Polyline>

            <Marker coordinate={ride?.info?.route[0]} pinColor="pinColor">
              {' '}
            </Marker>
            <Marker
              coordinate={ride?.info?.route[ride?.info?.route.length - 1]}
              pinColor="pinColor"
            ></Marker>
          </>
        )}
        {/* PASSAGEIRO PROCURANDO VIAGEM */}
        {handleRideStatus() !== 'empty' &&
          user.typeUser === 'P' &&
          !ride?.info && (
            <View
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
              height="auto"
              zIndex={999}
              borderRadius={25}
              width="95%"
              top={390}
            >
              <Title color="default">TÁXI</Title>
              <Input
                color="secondary"
                placeholder="Endereço de embarque"
                value={origin.description}
                onChangeText={address => handleGetPlaces(address)}
                onFocus={() => setActiveInput('setOrigin')}
              />
              <Input
                color="secondary"
                placeholder="Endereço de destino"
                value={destination.description}
                onChangeText={address => handleGetPlaces(address)}
                onFocus={() => setActiveInput('setDestination')}
              />

              <View alignItems="center" justifyContent="center" width="100%">
                <AddressList
                  color="transparent"
                  data={list}
                  keyExtractor={item => item.place_id}
                  renderItem={{ item, index }(
                    <AddressItem
                      color="transparent"
                      onPress={() => eval(activeInput)(item)}
                    >
                      <SubTitle bold>{item.description}</SubTitle>
                      <SubTitle small>{item.secondary.text}</SubTitle>
                    </AddressItem>,
                  )}
                />
              </View>

              <Button
                color="button"
                border="1px solid #000"
                marginBottom={10}
                onPress={() => handleGetRide()}
              >
                <ButtonText>Prosseguir</ButtonText>
              </Button>
            </View>
          )}

        {/* MOTORISTA SEM VIAGEM*/}
        {user.typeUser === 'D' && handleRideStatus() === 'empty' && (
          <View
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
            height={200}
            zIndex={999}
            borderRadius={25}
            width="95%"
            top={420}
          >
            <SubTitle color="default">Olá, Ricardo Rafael.</SubTitle>
            <Title>Nenhuma viagem encontrada.</Title>
          </View>
        )}

        {/* PASSAGEIRO INF0RMAÇOES DA CORRIDA*/}
        {user.typeUser === 'P' &&
          handleRideStatus() !== 'inRide' &&
          ride?.info && (
            <View
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
              height={400}
              zIndex={999}
              borderRadius={25}
              width="95%"
              top={220}
            >
              <Title color="default">TÁXI</Title>
              <View
                top={10}
                padding={10}
                position="absolute"
                flexDirection="row"
              >
                <BoldText color="default">Embarque: </BoldText>
                <SubTitle color="default" numberOfLines={1}>
                  {ride?.info?.start_address}
                </SubTitle>
              </View>
              <View
                top={40}
                padding={10}
                position="absolute"
                flexDirection="row"
              >
                <BoldText color="default">Destino: </BoldText>
                <SubTitle color="default" numberOfLines={1}>
                  {' '}
                  {ride?.info?.end_address}{' '}
                </SubTitle>
              </View>
              <SubTitle color="default">
                Adicionando 1325 AOA a cada KM
              </SubTitle>
              <View
                alignItems="center"
                justifyContent="center"
                style={{ backgroundColor: '#FFF' }}
                padding={25}
                position="relative"
                height={100}
                borderRadius="100%"
                width="auto"
                margin={30}
              >
                <BoldText color="default">{ride?.info.distance}</BoldText>
                <BoldText color="default">{ride?.info.price} AOA</BoldText>
              </View>
              <Button
                onPress={() => dispatch(requestRide())}
                color="button"
                border="1px solid #000"
                marginBottom={10}
                type={
                  handleRideStatus() === 'inSearch' ? 'inputBorder' : 'button'
                }
              >
                <ButtonText color="default">
                  {handleRideStatus() === 'inSearch'
                    ? 'Cancelar viagem'
                    : 'Confirmar viagem'}
                </ButtonText>
              </Button>
            </View>
          )}

        {/* PROCURANDO O TAXI MAIS PROXIMO*/}
        {user.typeUser === 'P' && handleRideStatus() === 'inSearch' && (
          <View
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
            height={200}
            zIndex={999}
            borderRadius={25}
            width="95%"
            top={420}
          >
            <Title color="default">TÁXI</Title>
            <View padding={30}>
              <Pulse
                color="black"
                numPulses={3}
                diameter={100}
                speed={20}
                duration={2000}
              />
            </View>
            <Spacer height={10} />
            <SubTitle color="default">
              Localizar táxi mais próximo disponivel...
            </SubTitle>
          </View>
        )}

        {/* INFORMAÇOES DO MOTORISTA*/}
        {user.typeUser === 'D' && status === 'inSearch' && (
          <View
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
            height={400}
            zIndex={999}
            borderRadius={25}
            width="95%"
            top={220}
          >
            <Title color="default">TÁXI</Title>
            <View top={10} padding={10} position="absolute" flexDirection="row">
              <Avatar
                source={Man}
                style={{
                  resizeMode: 'cover',
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
              />
            </View>
            <View justifyContent="left">
              <View flexDirection="row">
                <BoldText color="default">Motorista: </BoldText>
                <SubTitle color="default"> {ride?.driver.name} </SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Viatura: </BoldText>
                <SubTitle color="default"> {ride?.car.brand} </SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Cor: </BoldText>
                <SubTitle color="default">{ride?.car.colors} </SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Matricula: </BoldText>
                <SubTitle color="default"> {ride?.car.plate} </SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Avaliaçao </BoldText>
                <Entypo name="star" size={15} color="black" />
                <Entypo name="star" size={15} color="black" />
                <Entypo name="star" size={15} color="black" />
              </View>
            </View>
            <Spacer height={20} />
            <ActivityIndicator animating={true} size={40} color="#161616" />
            <Spacer height={40} />
            <BoldText color="default">O seu táxi está a caminho...</BoldText>
          </View>
        )}

        {/* ALERTA DE CHEGADA DO MOTORISTA*/}
        {handleRideStatus() === 'inRide' && (
          <View
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
            height={250}
            zIndex={999}
            borderRadius={25}
            width="95%"
            top={375}
          >
            <Title color="default" style={{ top: -15 }}>
              TÁXI
            </Title>
            <View
              top={50}
              padding={30}
              position="absolute"
              flexDirection="column"
            >
              <Avatar
                source={Man}
                style={{
                  resizeMode: 'cover',
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
              />
              <SubTitle color="default">Ricardo Rafael</SubTitle>
            </View>
            <BoldText color="default" style={{ marginTop: 100 }}>
              O seu táxi chegou...
            </BoldText>
          </View>
        )}

        {/* VIAGEM EM CURSO*/}
        {user.typeUser === 'P' && handleRideStatus() === 'inRide' && (
          <View
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
            <Title color="default">Viagem em curso</Title>
            <View flexDirection="row">
              <BoldText color="default">Distancia: </BoldText>
              <SubTitle color="default" numberOfLines={1}>
                {ride?.info.distance?.text}
              </SubTitle>
            </View>
            <View flexDirection="row">
              <BoldText color="default">Valor: </BoldText>
              <SubTitle color="default" numberOfLines={1}>
                {ride?.info.price} AOA
              </SubTitle>
            </View>
            <View flexDirection="row">
              <BoldText color="default">Duraçao aproximada: </BoldText>
              <SubTitle color="default">{ride?.info.duration_text}</SubTitle>
            </View>
            <Button color="button" border="1px solid #000">
              <ButtonText>Cancelar Viagem</ButtonText>
            </Button>
          </View>
        )}

        {/* ACEITAR VIAGEM */}
        {user.typeUser === 'D' && ride?.info && (
          <View
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
            height={400}
            zIndex={999}
            borderRadius={25}
            width="95%"
            top={220}
          >
            <Title color="default">TÁXI</Title>
            <View flexDirection="column" margin={10}>
              <Avatar
                source={Man}
                style={{
                  resizeMode: 'cover',
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
              />
              <SubTitle color="default"> {ride?.info.user.name} </SubTitle>
            </View>
            <View justifyContent="left">
              <View flexDirection="row">
                <BoldText color="default">Embarque: </BoldText>
                <SubTitle color="default">
                  {' '}
                  {ride?.info.start_address}{' '}
                </SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Destino: </BoldText>
                <SubTitle color="default"> {ride?.info.end_address} </SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Duraçao estimada: </BoldText>
                <SubTitle color="default">
                  {' '}
                  {ride?.info.duration_text}{' '}
                </SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Distancia: </BoldText>
                <SubTitle color="default">{ride?.info.distance?.text}</SubTitle>
              </View>
              <View flexDirection="row">
                <BoldText color="default">Preço: </BoldText>
                <SubTitle color="default"> {ride?.info.price} AOA</SubTitle>
              </View>
            </View>
            <Button
              onPress={() => handleRideAccept()}
              type={handleRideStatus() !== 'inRide' ? 'primary' : 'muted'}
              color="button"
              border="1px solid #000"
              marginBottom={10}
            >
              <ButtonTex color="default">
                {' '}
                {handleRideStatus() !== 'inRide'
                  ? 'Aceitar Viagem'
                  : 'Cancelar Viagem'}
              </ButtonTex>
            </Button>
          </View>
        )}

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
      </Map>
    </View>
  );
};
export default Ride;
