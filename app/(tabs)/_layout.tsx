import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '@/constants';
import { ImageSourcePropType } from 'react-native';

type TabIconType = {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabIconType) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-psemibold' :
             'font-pregular'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#0284c7',
                    tabBarInactiveTintColor: '#71717a',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 84,
                        borderTopWidth: 1,
                        borderTopColor: '#f4f4f5'
                    }
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />

                        )
                    }}
                />

                <Tabs.Screen
                    name='orders'
                    options={{
                        title: 'Orders',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="Orders"
                                focused={focused}
                            />

                        )
                    }}
                />

                <Tabs.Screen
                    name='posts'
                    options={{
                        title: 'Posts',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.upload}
                                color={color}
                                name="Posts"
                                focused={focused}
                            />

                        )
                    }}
                />

                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />

                        )
                    }}
                />
            </Tabs>

        </>
    )
}

export default TabsLayout