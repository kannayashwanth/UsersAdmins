import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {colors} from '../../theme/colors';
import { UserRole } from '../../graphQL/Query/useUsers';

type GroupedRadioInputProps = {
  options: UserRole[];
  value: UserRole;
  onChange(selOption: UserRole): void;
  disabled?: boolean;
};

const GroupedRadioInput: React.FC<GroupedRadioInputProps> = ({
  options,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}>
      {options.map(option => {
        const isSelected = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => {
              onChange(option);
            }}
            accessibilityLabel={option}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
            disabled={disabled}>
            <View
              style={{
                padding: 2,
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.gray,
                borderRadius: 10,
              }}>
              <View
                style={{
                  padding: 6,
                  backgroundColor: isSelected ? 'blue' : '#ffffff',
                  borderRadius: 10,
                }}
              />
            </View>
            <Text style={{textTransform: 'capitalize'}}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default GroupedRadioInput;
