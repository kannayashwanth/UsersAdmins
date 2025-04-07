import {
  LazyQueryHookExecOptions,
  OperationVariables,
  useLazyQuery,
} from '@apollo/client';
import {USERS_QUERY} from '../UsersListQuery';
import {useCallback} from 'react';

export interface ZellerCustomer {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ZellerCustomerConnection {
  items: ZellerCustomer[];
  nextToken?: string;
}

export type UserRole = 'ADMIN'| 'MANAGER';

const useUsers = () => {
  const [request, response] = useLazyQuery<{
    listZellerCustomers: ZellerCustomerConnection;
  }>(USERS_QUERY);

  const fetchUsers = useCallback(
    (
      options?:
        | Partial<
            LazyQueryHookExecOptions<
              {listZellerCustomers: ZellerCustomerConnection},
              OperationVariables
            >
          >
        | undefined,
    ) => {
      request(options);
    },
    [request],
  );

  return {
    data: response.data,
    request: fetchUsers,
    loading: response.loading,
    error: response.error,
    refetch: response.refetch
  };
};

export default useUsers;
