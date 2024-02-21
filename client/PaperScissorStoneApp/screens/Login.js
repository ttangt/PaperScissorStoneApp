import {Text, View, ScrollView} from "react-native";
import { useState } from "react";

import {SERVER_IP} from '@env';

import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";

const Login = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false);

    const handleSubmit = async() => {
        if (!email || !password) {
            alert("All fields are require");
            return;
        }

        console.log("SIGN IN REQUEST => ", name, email, password);

        try {
            const {axios_post} = await axios({
                    // url: "http://localhost:3000/user/login",
                    url: "http://" + SERVER_IP + ":3000/user/login",
                    method: "POST",
                    data: { email, password },
                    // responseType: "json",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((res) => {
                    navigation.navigate("Dashboard", res.data);
                    setName("");
                    setEmail("");
                    setPassword("");
                })
                .catch((error) => console.log(error))
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom:30 }}>Log In</Text>

            <UserInput name="EMAIL" value={email} setValue={setEmail} />
            <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} />

            <SubmitButton name="LOG IN" handleSubmit={handleSubmit} />

            <Text style={{ fontSize: 16, marginBottom: 30}}>No Account? <Text 
                onPress={() => navigation.navigate("Signup")}
                style= {{ color: "red", fontWeight: "bold"}}>Create An Account
                </Text>
            </Text>

            {/* <Text>{JSON.stringify({ name, email, password })}</Text> */}
        </ScrollView>
    );
};

export default Login;