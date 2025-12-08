import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useUserStore} from '../zustand/userStore';

export default function UserDetailsScreen({navigation}: any) {
  const {
    firstName,
    lastName,
    phone,
    city,
    state,
    age,
    setFirstName,
    setLastName,
    setPhone,
    setCity,
    setState,
    setAge,
  } = useUserStore();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Details</Text>

      <Input label="First Name" value={firstName} onChange={setFirstName} />

      <Input label="Last Name" value={lastName} onChange={setLastName} />

      <Input
        label="Phone"
        value={phone}
        keyboardType="number-pad"
        onChange={setPhone}
      />

      <Input label="City" value={city} onChange={setCity} />

      <Input label="State" value={state} onChange={setState} />

      <Input
        label="Age"
        value={age.toString()}
        keyboardType="number-pad"
        onChange={v => setAge(Number(v))}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Main');
        }}
        style={{
          backgroundColor: '#f5e1e9',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderRadius: 10,
        }}>
        <Text style={{color: '#b52b62'}}>Go to profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Input = ({label, value, onChange, ...rest}: any) => (
  <View style={{marginBottom: 18}}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});
