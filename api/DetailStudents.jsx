import { ToastAndroid, Image, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import Domain from './Domain';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

export default function DetailStudents({ route, navigation }) {
    const [loading, setLoading] = useState(false);

    const [id, setId] = useState()
    const [idnumber, setIdnumber] = useState()
    const [fullname, setFullname] = useState()
    const [photo, setPhoto] = useState()
    const [gender, setGender] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [emailaddress, setEmailaddress] = useState()

    const getDetailDataStudents = () => {
        // Sesuaikan ip address
        fetch('http://10.235.204.137:8000/api/students/' + route.params.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                setFullname(json.data.fullname)
                setId(json.data.id)
                setIdnumber(json.data.idnumber)
                setPhoto(json.data.photo)
                setGender(json.data.gender)
                setEmailaddress(json.data.emailaddress)
                setPhone(json.data.phone)
                setAddress(json.data.address)

                setLoading(false)
            })
            .catch(e => console.log(e));
    };

    const deletedData = async () => {
        setLoading(true);
        await fetch('http://10.235.204.137:8000/api/students/' + route.params.id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    ToastAndroid.show(json.messages, ToastAndroid.LONG);
                    navigation.goBack();
                }
            })
            .catch(err => console.log(err));
    };

    deleted = () => {
        Alert.alert('Delete Students !', 'Are you sure deleted data ?', [
            {
                text: 'Ok',
                onPress: () => deletedData(),
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ]);
    }
    // useEffect(() => {
    //     setLoading(true)
    //     getDetailDataStudents();
    // }, [])

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true)
                getDetailDataStudents()
            },
            []
        )
    )

    return loading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size={25} color="blue" />
        </View>
    )
        :
        (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" color="white" size={20} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={styles.img}
                            source={photo == '' ? `${require('./img/avatar.png')}` :
                                { uri: 'http://10.235.203.213:8000/' + photo }
                            }
                            resizeMode="stretch"
                        />
                        <Text style={styles.textFullname}>{fullname}</Text>
                        <Text style={styles.textIdnumber}>{idnumber}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.contentData}>
                        <Text style={{ color: '#ADA2FF' }}>Gender</Text>
                        <View style={{
                            flexDirection: 'row', marginTop: 5,

                        }}>
                            <Icon5 name="venus-mars" color="#460C68" size={20} />
                            <Text style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 10 }}>{gender == 'M' ? 'Laki-Laki' : 'Perempuan'}</Text>
                        </View>
                    </View>
                    <View style={styles.contentData}>
                        <Text style={{ color: '#ADA2FF' }}>Address</Text>
                        <View style={{
                            flexDirection: 'row', marginTop: 5,

                        }}>
                            <Icon5 name="map-marked-alt" color="#460C68" size={20} />
                            <Text style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 10 }}>
                                {address}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.contentData}>
                        <Text style={{ color: '#ADA2FF' }}>Phone Number</Text>
                        <View style={{
                            flexDirection: 'row', marginTop: 5,

                        }}>
                            <Icon5 name="phone-square" color="#460C68" size={20} />
                            <Text style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 10 }}>
                                {phone}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.contentData}>
                        <Text style={{ color: '#ADA2FF' }}>Email Address</Text>
                        <View style={{
                            flexDirection: 'row', marginTop: 5,

                        }}>
                            <Icon5 name="envelope-square" color="#460C68" size={20} />
                            <Text style={{ paddingLeft: 10, fontWeight: 'bold', marginBottom: 10 }}>
                                {emailaddress}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.contentButton}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('FormEditStudents', {
                                id: route.params.id,
                                title: "Edit Data Students"
                            })}
                        >
                            <Icon5 name='edit' color="#367E18" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => deleted()}
                        >
                            <Icon5 name='trash' color="#CC3636" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1 / 2,
        backgroundColor: '#810CA8',
        elevation: 5
    },
    textFullname: {
        color: '#FFE5F1',
        fontWeight: 'bold',
        fontSize: 30
    },
    textIdnumber: {
        color: '#FFFFFF',
        fontSize: 20
    },
    img: {
        margin: 15,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderWidth: 2,
        borderColor: 'grey',
        elevation: 5
    },
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentData: {
        marginTop: 25,
        marginHorizontal: 25,
        borderBottomWidth: 1, borderColor: '#7F167F'

    },
    contentButton: {
        marginTop: 25,
        marginHorizontal: 25,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})
