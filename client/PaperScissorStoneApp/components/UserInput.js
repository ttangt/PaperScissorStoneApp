import {Text, TextInput, View} from "react-native";

const UserInput = ({name, value, setValue, secureTextEntry = false}) => {
    return (

        <View style={{ marginHorizontal: 24}}>
            <Text style={{ fontSize: 14, fontStyle: "italic" }}>{name}</Text>
            <TextInput
                style={{
                    borderBottomWidth: 0.5,
                    height: 48,
                    width: 300,
                    borderBottomColor: "#8e93a1",
                    marginBottom: 30,
                }}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => setValue(text)}>
            </TextInput>
        </View>
    );
};

export default UserInput;