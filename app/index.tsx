import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { showToast } from '@services/helpers'

const index = () => {
    return (
        <SafeAreaView className='bg-light h-full'>
            <ScrollView contentContainerStyle={{ height: '100%'}}>
                <View className='w-full justify-start items-center h-full px-4'>
                    <View className='w-[300px] h-[270px] justify-center items-center' >
                        <Image
                            source={images.mtungi}
                            className='w-full h-full'
                            resizeMode='contain'
                        />
                    </View>
                    <View className='relative mt-5 w-full'>

                        <View className='border-sky-500 bg-primary border rounded-[20px] flex justify-center items-center p-4'>
                            <Text className='text-light text-[26px] font-bold-200 text-center'>
                                Gas Reservation System
                            </Text>
                        </View>

                    </View>
                    <View className='mt-[20px]'></View>

                    <View className='py-5 w-full'>
                        <TouchableOpacity 
                        className='border border-sky-500 rounded-[20px] mb-4'
                            onPress={() => showToast(`Loged in as Customer`)}
                         >
                            <Text className='text-center text-xl text-primary font-2xl p-4'>Login</Text>
                        </TouchableOpacity>
                        <Text className='text-center text-primary text-xl p-4'>-OR-</Text>
                        <TouchableOpacity
                         className='border text-xl border-sky-500 rounded-[20px]'
                            onPress={() => showToast(`signin in as Customer`)}
                         >
                            <Text className='text-center text-xl text-primary font-2xl p-4'>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            
        </SafeAreaView>
    )
}

export default index
