import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {userStore} from '../mobX/UserStoree';

const UserDetails = observer(({navigation}: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Details</Text>

      <Field
        label="First Name"
        value={userStore.firstName}
        onChange={v => userStore.setFirstName(v)}
      />
      <Field
        label="Last Name"
        value={userStore.lastName}
        onChange={v => userStore.setLastName(v)}
      />
      <Field
        label="Phone"
        value={userStore.phone}
        onChange={v => userStore.setPhone(v)}
        keyboardType="number-pad"
      />
      <Field
        label="City"
        value={userStore.city}
        onChange={v => userStore.setCity(v)}
      />
      <Field
        label="State"
        value={userStore.state}
        onChange={v => userStore.setState(v)}
      />
      <Field
        label="Age"
        value={userStore.age.toString()}
        onChange={v => userStore.setAge(Number(v))}
        keyboardType="number-pad"
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
});

const Field = ({label, value, onChange, ...rest}) => (
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
  container: {padding: 20},
  title: {fontSize: 22, fontWeight: '700', marginBottom: 20},
  label: {fontSize: 14, marginBottom: 6},
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default UserDetails;
