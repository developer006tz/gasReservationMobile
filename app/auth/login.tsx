import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { login } from "@/services/routes";
import { router } from "expo-router";
import { getToken, saveToken, getUser } from "@services/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { showToast } from "@services/helpers";
import FullButton from "@/components/FullButton";
import { images } from "@/constants";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    try {
      const response = await login(email, password);
      const { user, access_token } = response;
      await saveToken(access_token, user);
      const token = await getToken();
      setLoading(false);
      if (user.user_type == "supplier") {
        router.push("/screen/supplier_dashboard");
      } else {
        showToast(`${user.name} Loged in as Customer`);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.body && error.body.errors) {
        const errors = error.body.errors;
        if (errors.email) {
          setEmailError(errors.email[0]);
        }
        if (errors.password) {
          setPasswordError(errors.password[0]);
        }
      }
      if (error.body && (error.body.message || error.body.error)) {
        showToast(error.body.message || error.body.error);
      } else {
        showToast(`An unexpected error occurred: ${error.message}`);
      }
      console.log(error); //TODO Only for debugging, i will remove in production
    }
  };

  return (
    <SafeAreaView className="bg-light h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center min-h-[85vh] px-4">
          <View className="w-[200px] h-[170px] mx-auto justify-center items-center">
            <Image
              source={images.mtungi}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: "#0284c7",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Log In
            </Text>
          </View>
          <TextInput
            placeholder="Email"
            className={`${
              emailError ? " border-red-500 " : " mb-3 border-sky-500"
            } border  w-full rounded-3xl min-h-[50px] p-3`}
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? (
            <Text className="text-red-500 text-left mb-3">{emailError}</Text>
          ) : null}

          <TextInput
            placeholder="Password"
            value={password}
            className={`${
              passwordError ? "border border-red-500" : ""
            } border border-sky-500 w-full rounded-3xl min-h-[50px] p-3`}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError ? (
            <Text className="text-red-500">{passwordError}</Text>
          ) : null}
          <FullButton
            title="Login"
            handlePress={() => handleLogin()}
            containerStyles="w-full mt-4 bg-sky-500"
            textStyles="text-light"
          />
          {loading && <ActivityIndicator size="large" color="#0284c7" />}
          <View className="text-center mx-auto">
            <Text>-OR-</Text>
          </View>

          <FullButton
            title="Register"
            handlePress={() => router.push("/auth/register")}
            containerStyles="w-full mt-2"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;
