import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import UsersScreen from '../UsersScreen';
import {USERS_QUERY} from '../../graphQL/UsersListQuery';

test('renders Users screen correctly', () => {
  const {getByText} = render(<HomeScreen />);

  expect(getByText('Home Screen')).toBeTruthy();
});
