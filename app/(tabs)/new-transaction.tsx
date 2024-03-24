import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ScrollView, Input, Button, Text, YStack } from 'tamagui';
import { addPurchase } from '../services/database';

interface FormData {
  amount: string;
  category: string;
  note: string;
}

export default function TabNewTransactionScreen() {
  const [date, setDate] = useState(new Date());
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const amountInputRef = useRef<Input>(null);

  const onSubmit = (data: FormData) => {
    // Call the addPurchase function from the database file
    addPurchase(Number(data.amount), data.category, date.toISOString(), data.note, (error) => {
      if (!error) {
        reset({
          amount: '',
          category: '',
          note: ''
        });
        setDate(new Date());

        if (amountInputRef.current) {
          amountInputRef.current.focus();
        }
      }
    });
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <ScrollView padding="$3">
      <YStack gap="$2">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input 
              ref={amountInputRef}
              placeholder='Amount'
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
          name="amount"
          rules={{ required: 'You must enter an amount' }}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}

        
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Category"
            />
          )}
          name="category"
          rules={{ required: 'You must enter a category' }}
        />
        {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Note"
            />
          )}
          name="note"
        />

        <Button onPress={handleSubmit(onSubmit)}>Add Transaction</Button>
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
