import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, ActivityIndicator, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '@/services/routes';
import { Link, router } from 'expo-router';
import { getToken, saveToken, getUser } from '@services/helpers';

const LoginScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const handleRegister = async () => {
        setLoading(true);
        setEmailError('');
        setPhoneError('');
        setNameError('');
        setPasswordError('');
        try {
            const response = await login(email, password);
            const { user, access_token } = response;
            await saveToken(access_token, user);
            setLoading(false);
            if (user.user_type == 'supplier') {
                // Navigate to supplier Dashboard
            } else {
                // navigate to client Dashboard
            }
        } catch (error: any) {
            setLoading(false);
            if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                if (errors.email) {
                    setEmailError(errors.email[0]);
                }
                if (errors.password) {
                    setPasswordError(errors.password[0]);
                }
            } else if ((error.response && error.response.data.message) || (error.response && error.response.data.error)) {
                showToast(error.response.data.message ?? error.response.data.error);
            }
            console.error(error.response?.data?.message || error.response?.data?.error);
        }
    };

    return (
        <View style={styles.container}>
            <View >
                <View style={styles.davinciFlex}>
                    <Image
                        source={require('@assets/images/mtungi.png')}
                        style={{ width: 150, height: 150 }}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <View >
                <Text style={{ fontSize: 22, color: "#0284c7", textAlign: "center", marginBottom: 10 }}>
                    Gas Reservation Management System
                </Text>
            </View>
            <TextInput
                placeholder="Name"
                style={[styles.input, nameError ? styles.errorInput : null]}
                value={name}
                onChangeText={setName}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            <TextInput
                placeholder="Email"
                style={[styles.input, emailError ? styles.errorInput : null]}
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
                placeholder="Phone"
                style={[styles.input, phoneError ? styles.errorInput : null]}
                value={phone}
                onChangeText={setPhone}
            />
            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

            <TextInput
                placeholder="Password"
                value={password}
                style={[styles.input, passwordError ? styles.errorInput : null]}
                onChangeText={setPassword}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={() => { handleRegister }}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#0284c7" />}
            <View style={styles.orContainer}>
                <Text>-OR-</Text>
            </View>

            <TouchableOpacity style={styles.buttonOutline} onPress={() => router.push('/')}>
                <Text style={styles.buttonOutlineText}>Login</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth: 1,
        borderColor: '#0284c7',
        borderRadius: 20,
        color: '#082f49',
        marginBottom: 16,
        padding: 8,
    },
    button: {
        backgroundColor: '#0284c7',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#0284c7',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonLight: {
        backgroundColor: '#0ea5e9',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0284c7',
        fontSize: 16,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    buttonContainer: {
        marginBottom: 16,
    },
    orContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    davinciFlex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default LoginScreen;
