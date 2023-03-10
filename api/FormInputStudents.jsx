import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { URL_IP_ADDRESS } from '@env';

export default function FormInputStudents({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ]);

  const [idnumber, setIdnumber] = useState();
  const [fullname, setFullname] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [emailaddress, setEmailaddress] = useState();
  const [loading, setLoading] = useState(false)

  // State error
  const [errorIdNumber, setErrorIdNumber] = useState();
  const [errorFullname, setErrorFullname] = useState()
  const [errorGender, setErrorGender] = useState()
  const [errorAddress, setErrorAddress] = useState()
  const [errorPhone, setErrorPhone] = useState()
  const [errorEmailAddress, setErrorEmailAddress] = useState()
  // End State error

  const dropDownGender = (
    <DropDownPicker
      style={styles.textInput}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onSelectItem={item => setGender(item.value)}
    />
  );

  const saveData = async () => {
    setLoading(true);
    await fetch(URL_IP_ADDRESS + 'api/students', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idnumber: idnumber,
        fullname: fullname,
        gender: gender,
        address: address,
        phone: phone,
        emailaddress: emailaddress,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          ToastAndroid.show(json.messages, ToastAndroid.LONG);
          // navigation.push('ShowData');

          setIdnumber('');
          setFullname('');
          setAddress('');
          setPhone('');
          setEmailaddress('');
          setGender('');
          dropDownGender
        } else {
          setErrorIdNumber(json.idnumber);
          setErrorFullname(json.fullname);
          setErrorGender(json.gender);
          setErrorAddress(json.address)
          setErrorEmailAddress(json.emailaddress);
          setErrorPhone(json.phone)
        }
        console.log(json)
        setLoading(false);
      })
      .catch(err => console.log(err));
  };


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View
      styles={{
        flex: 1,
      }}>
      <ScrollView style={{ width: '100%' }}>
        <TextInput
          maxLength={7}
          style={styles.textInput}
          label="ID Students"
          keyboardType="number-pad"
          value={idnumber}
          onChangeText={value => setIdnumber(value)}
        />
        {(errorIdNumber) ? (<Text style={styles.teksError}>{errorIdNumber}</Text>) : ''}
        <TextInput
          style={styles.textInput}
          label="Fullname"
          value={fullname}
          onChangeText={value => setFullname(value)}
        />
        {(errorFullname) ? (<Text style={styles.teksError}>{errorFullname}</Text>) : ''}
        {dropDownGender}
        {(errorGender) ? (<Text style={styles.teksError}>{errorGender}</Text>) : ''}
        <TextInput
          style={styles.textInput}
          label="address"
          multiline={true}
          numberOfLines={4}
          value={address}
          onChangeText={value => setAddress(value)}
        />
        {(errorAddress) ? (<Text style={styles.teksError}>{errorAddress}</Text>) : ''}
        <TextInput
          style={styles.textInput}
          label="Phone Number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={value => setPhone(value)}
        />
        {(errorPhone) ? (<Text style={styles.teksError}>{errorPhone}</Text>) : ''}
        <TextInput
          style={styles.textInput}
          label="E-mail Address"
          keyboardType="email-address"
          value={emailaddress}
          onChangeText={value => setEmailaddress(value)}
        />
        {(errorEmailAddress) ? (<Text style={styles.teksError}>{errorEmailAddress}</Text>) : ''}
        <TouchableOpacity style={styles.button} onPress={() => saveData()}
        >
          {loading ? (<ActivityIndicator size={20} color="white" />) : (<Text style={styles.textButton}>Save</Text>)}

        </TouchableOpacity>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    width: 'auto',
  },
  teksError: {
    marginHorizontal: 10,
    color: 'red'
  },
  button: {
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 5,
    backgroundColor: '#FF7000',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
