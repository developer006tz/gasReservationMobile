import React from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";

interface InputWithErrorProps extends TextInputProps {
    error?: string;
    containerStyles?: string;
    inputStyles?: string;
    errorStyles?: string;
}

const InputWithError: React.FC<InputWithErrorProps> = ({
       error,
       containerStyles,
       inputStyles,
       errorStyles,
       ...props
   }) => {
    return (
        <View className={`mb-4 ${containerStyles}`}>
            <TextInput
                className={`border w-full rounded-3xl min-h-[50px] p-3 ${inputStyles} ${
                    error ? "border-red-500" : "border-sky-500"
                }`}
                {...props}
            />
            {error ? (
                <Text className={`text-red-500 text-left mt-2 ${errorStyles}`}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
};

export default InputWithError;
