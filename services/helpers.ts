import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native'

export const clearToken = async () => {
    try {
        await AsyncStorage.removeItem('token')
    } catch (error) {
        console.error('Error clearing token', error);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;

    } catch (error) {
        console.error('Error getting token', error);
        return null;

    }
}

export const saveToken = async (token: string, user: object) => {
    try {
        await AsyncStorage.setItem('token', token);
        const userString = JSON.stringify(user);
        await AsyncStorage.setItem('user', userString);
    } catch (error) {
        console.error('Error saving auth token or user data:', error);
    }
}

export const getUser = async () => {
    try {
        const userString = await AsyncStorage.getItem('user');
        if (userString !== null) {
            return JSON.parse(userString);
        }
        return null;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
}

export const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
}

