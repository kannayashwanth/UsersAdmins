import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, RefreshControl, TextInput} from 'react-native';
import GroupedRadioInput from '../components/inputs/GroupedRadioInput';
import UserCard from '../components/cards/UserCard';
import {getHeight} from '../utils/utils';
import {colors} from '../theme/colors';
import useUsers, {UserRole} from '../graphQL/Query/useUsers';

const optionsList: UserRole[] = ['ADMIN', 'MANAGER']

const UsersScreen = () => {
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [name, setName] = useState('');
  const {request, data, loading, error} = useUsers();
  const handler = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fetchUsers = useCallback(() => {
    request({
      variables: {
        filter: {
          role: {eq: role},
          name: {contains: name},
        },
        limit: 10,
      },
    });
  }, [name, role]);

  useEffect(() => {
    if (handler.current) {
      clearTimeout(handler.current);
    }
    handler.current = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, [role, name, fetchUsers]);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
        gap: 15,
      }}>
      <GroupedRadioInput
        value={role}
        onChange={setRole}
        options={optionsList}
      />

      <TextInput
        onChangeText={e => {
          setName(e);
        }}
        value={name}
        style={{borderWidth: 2, padding: 10}}
        placeholder="Search"
      />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={data?.listZellerCustomers?.items}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <UserCard user={item}  />
          )}
          contentContainerStyle={{
            marginTop: getHeight(0.75),
          }}
          refreshing={loading}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchUsers} />
          }
        />
      )}
    </View>
  );
};

export default UsersScreen;
