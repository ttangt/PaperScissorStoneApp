import {Text, View, ScrollView} from "react-native";
import { useState } from "react";

import {SERVER_IP} from '@env';

import UserInput from "../components/UserInput";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";

const Signup = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async() => {
        if (!name || !email || !password) {
            alert("All fields are require");
            return;
        }

        console.log("SIGNUP REQUEST => ", name, email, password);

        try {
            const {axios_post} = await axios({
                    // url: "http://localhost:3000/user/signup",
                    url: "http://" + SERVER_IP + ":3000/user/signup",
                    method: "POST",
                    data: { name, email, password },
                    // responseType: "json",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                // .then((res) => console.log(res.data));
                .then((res) => navigation.navigate("Dashboard", res.data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom:30 }}>Create an Account</Text>
        
            <UserInput name="NAME" value={name} setValue={setName} />
            <UserInput name="EMAIL" value={email} setValue={setEmail} />
            <UserInput name="PASSWORD" value={password} setValue={setPassword} secureTextEntry={true} />

            <SubmitButton name="SIGN UP" handleSubmit={handleSubmit} />

            <Text style={{ fontSize: 16, marginBottom:30}}>Already Joined? <Text 
                    onPress={() => navigation.navigate("Login")}
                    style= {{ color: "red", fontWeight: "bold"}}
                    >Log In
                </Text>
            </Text>

            {/* <Text>{JSON.stringify({ name, email, password })}</Text> */}
        </ScrollView>
    );
};

export default Signup;