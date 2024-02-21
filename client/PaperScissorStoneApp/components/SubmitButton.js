import { Text, TouchableOpacity } from "react-native";

const SubmitButton = ({name, handleSubmit}) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#ff9900",
                height: 50,
                width: 150,
                marginBottom: 20,
                justifyContent: "center",
                marginHorizontal: 15,
                borderRadius: 48,
            }}
            onPress={handleSubmit}
        >

            <Text style={{textAlign: "center", fontWeight: "bold"}}>
                {name}
            </Text>

        </TouchableOpacity>
    );
};

export default SubmitButton;