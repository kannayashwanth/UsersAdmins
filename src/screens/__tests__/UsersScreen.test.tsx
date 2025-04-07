import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import { Text } from 'react-native';
import useUsers from '../../graphQL/Query/useUsers';
import UsersScreen from '../UsersScreen';

jest.mock('../../graphQL/Query/useUsers');

describe('UsersScreen', () => {
  const mockRequest = jest.fn();

  const mockUsers = [
    {id: '1', name: 'Alice'},
    {id: '2', name: 'Bob'},
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useUsers as jest.Mock).mockReturnValue({
      request: mockRequest,
      data: null,
      loading: true,
      error: null,
    });

    const {getByText} = render(<UsersScreen />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders user list', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      request: mockRequest,
      data: {
        listZellerCustomers: {
          items: mockUsers,
        },
      },
      loading: false,
      error: null,
    });

    const {getByTestId, getByText} = render(<UsersScreen />);

    expect(getByTestId('UserCard_1')).toBeTruthy();
    expect(getByTestId('UserCard_2')).toBeTruthy();
    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Bob')).toBeTruthy();
  });

  it('filters by role and search input', async () => {
    (useUsers as jest.Mock).mockReturnValue({
      request: mockRequest,
      data: {
        listZellerCustomers: {
          items: [],
        },
      },
      loading: false,
      error: null,
    });

    const {getByPlaceholderText, getByTestId, getByText} = render(<UsersScreen />);

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'John');

    const radio = getByText('MANAGER');
    fireEvent.press(radio);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith({
        variables: {
          filter: {
            role: {eq: 'MANAGER'},
            name: {contains: 'John'},
          },
          limit: 10,
        },
      });
    });
  });
});
