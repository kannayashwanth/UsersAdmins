import React from 'react';
import { Pressable, Text, View } from 'react-native';

type GroupedRadioInputProps = {
  options: string[];
  value: string;
  onChange(selOption: string): void;
  disabled: boolean;
};

const GroupedRadioInput: React.FC<GroupedRadioInputProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
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
              gap: 2,
            }}
            disabled={disabled}>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: isSelected ? 'black' : 'blue',
              }}
            />
            <Text>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default GroupedRadioInput;
