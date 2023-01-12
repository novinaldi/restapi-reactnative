import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Domain from './Domain';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { URL_IP_ADDRESS } from '@env';

export default function ShowData({ navigation }) {
  const [msg, setMsg] = useState();
  const [datastudents, setDatastudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const getDataStudents = () => {
    fetch(URL_IP_ADDRESS + 'api/students', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          // setMsg(json.messages);
          setDatastudents(json.data);
          setLoading(false);
        }
      })
      .catch(e => console.log(e));
  };

  // useEffect(() => {
  //   setLoading(true);
  //   getDataStudents();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // alert('Enter');
      setLoading(true);
      getDataStudents();
      // return () => alert('exit');
    }, [])
  )


  let buttonAdd = (
    <TouchableOpacity style={{
      backgroundColor: '#C147E9',
      height: 50,
      width: 50,
      borderRadius: 50 / 2,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 30,
      bottom: 30,

    }}
      onPress={() => navigation.navigate("FormInputStudents", {
        title: 'Add New Student !'
      })}
    >
      <Icon name="plus" size={20} color="white" />
    </TouchableOpacity>
  );
  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#810CA8"
        animated={true}
      />
      <ActivityIndicator size="large" color="blue" />
      {buttonAdd}
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#810CA8"
        animated={true}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              getDataStudents();
              setRefresh(false);
            }}
          />
        }
        data={datastudents}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('DetailStudents', {
            title: 'Detail Students',
            idnumber: item.idnumber,
            id: item.id
          })}>
            <Image
              style={styles.img}
              source={
                item.photo == '' ? `${require('./img/avatar.png')}` :
                  { uri: 'http://10.235.203.213:8000/' + item.photo }
              }
              resizeMode="stretch"
            />
            <View style={styles.teks}>
              <Text style={styles.teksID}>{item.idnumber}</Text>
              <Text style={styles.teksName}>{item.fullname}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {buttonAdd}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  img: {
    margin: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  teks: {
    flex: 1,
  },
  teksID: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  teksName: {
    fontSize: 14,
    color: '#3498db',
  },
});
