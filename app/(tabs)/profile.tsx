import { FlatList, Text, View,Image,TouchableOpacity } from 'react-native';
import React, {useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUser,logoutUser,showToast } from '@/services/helpers';
import { images } from '@/constants';
import { icons } from '@/constants';
import SearchInput from '@/components/SearchInput';
import LatestPosts from '@/components/LatestPosts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { Alert } from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: string;
}


const Profile = () => {
  const [user, setuser] = useState<User | null>(null);
  useEffect(()=>{
    const fetchUser = async()=>{
           const fetchedUser = await getUser();
           setuser(fetchedUser);
    };

    fetchUser();
  },[]);

  const logout = async () => {
    Alert.alert(
      '',
      'Are you sure you want to log out?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await logoutUser();
            setuser(null);
            showToast('Logged out successfully');
            router.push('/login');
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };


  
    return (
      <SafeAreaView className='bg-primary'>
        
            <View className="my-6 px-4 space-y-6">
              <View className='mt-1.5 flex flex-col justify-center items-center'>
                    <View className='my-3'>
                    <Image source={icons.user}  className='w-20 h-20' resizeMode='contain' tintColor={'white'} />
                    </View>
                    <View className='mt-3'>
                        <Text className="font-pmedium text-[20px] text-sky-100">
                        {user ? user.name : "loading..."}
                        </Text>
                    </View>

                    <View>
                        <View className=' w-[120px] justify-between'>
                        <TouchableOpacity className='flex bg-red-400  flex-row justify-center 
                        items-center border-2 border-red-400 w-full rounded-3xl'
                        onPress={logout}
                        >
                        <Ionicons name="log-in-outline" size={26}  color={'#F5E6E6'} />
                        <Text className="font-pmedium text-[14px] text-gray-200">Logout</Text>
                    </TouchableOpacity>
                        </View>
                    
                    </View>
              </View>
            </View>
         
      </SafeAreaView>
    );
}

export default Profile
