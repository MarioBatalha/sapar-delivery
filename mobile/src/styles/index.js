import styled from 'styled-components/native';
import theme from './theme.json';

import MapView from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
  background-color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.default};
  color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.transparent};
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  justify-content: ${props => props.justify || 'center'};
  padding: ${props => props.padding || 0}px;
  width: 100%;
  align-items: ${props => props.align || 'center'};
  max-width: ${props => props.width || '100%'};
  max-height: ${props => (props.height ? props.height + 'px' : 'auto')};
  position: ${props => props.position || 'relative'};
  top: ${props => props.top || 0};
  z-index: ${props => props.zIndex || 1};
  border: ${props => props.border || '2px solid #FFFFFF00 '};
  border-radius: ${props => (props.small ? '10px' : '20px')};
`;

export const Button = styled.TouchableOpacity`
  width: ${props => props.width || '100%'};
  top: ${props => props.top || 0};
  padding: ${props => (props.compact ? 5 : 15)}px;
  margin: 5px 5px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  border-radius: 5px;
  border: ${props => props.border || '2px solid #FFFFFF00 '};
  background-color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.transparent};
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.default};
`;

export const BoldText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.secondary};
`;

export const Title = styled.Text`
  text-align: left;
  font-size: 25px;
  color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.default};
  font-weight: bold;
  text-align: ${props => props.align || 'center'};
  padding: 15px 50px;
`;

export const SubTitle = styled.Text`
  font-size: ${props => (props.small ? '12px' : '15px')};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  text-align: ${props => props.align || 'center'};
  color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.secondary};
`;

export const Input = styled.TextInput`
  border: 1px solid ${theme.colors.inputBorder};
  border-radius: 5px;
  width: 100%;
  height: ${props => props.height || 40}px;
  margin: 5px 5px;
  padding: 20px 10px;
  opacity: 0.9;
  color:  ${props =>
    props.color ? theme.colors[props.color] : theme.colors.default};
  background-color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.secondary};
`;

export const GooglePlacesAutocomplete = styled.TextInput`
  border: 1px solid ${theme.colors.inputBorder};
  border-radius: 5px;
  width: 100%;
  height: ${props => props.height || 40}px;
  margin: 5px 5px;
  padding: 20px 10px;
  opacity: 0.9;
  background-color: ${props =>
    props.color ? theme.colors[props.color] : theme.colors.secondary};
`;

export const AddressList = styled.FlatList`
  flex: 1;
  width: 100%;
  padding-top: 10;
`;

export const Spacer = styled.View`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 10}px;
`;

export const Avatar = styled.Image.attrs({
  elevation: 50,
})`
  width: ${props => (props.small ? '35px' : '50px')};
  height: ${props => (props.small ? '35px' : '50px')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${props => (props.small ? '35px' : '50px')};
  top: ${props => props.top || 0};
`;

export const Map = styled(MapView)`
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
`;

export const PickerButton = styled.TouchableOpacity`
  width: ${props => props.width || '80%'};
  height: ${props => props.height || '80%'};
  border-width: 3px;
  border-style: solid;
  justify-content: space-around;
  border-radius: ${props => (props.small ? '10px' : '20px')};
  align-items: center;
  top: ${props => props.top || 0};
  border-color: ${props =>
    props.active ? theme.colors.secondary : theme.colors.button};
  background-color: ${props =>
    props.active ? theme.colors.primary + '80' : theme.colors.button};
`;
