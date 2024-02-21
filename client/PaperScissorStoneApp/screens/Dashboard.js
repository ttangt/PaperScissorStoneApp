import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import axios from "axios";

import {SERVER_IP} from '@env';

import SubmitButton from "../components/SubmitButton";

const Dashboard = ({route, navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSignOutSubmit = async() => {
        try {
            const {axios_post} = await axios({
                    // url: "http://localhost:3000/user/signout",
                    url: "http://" + SERVER_IP + ":3000/user/signout",
                    method: "GET",
                    // data: { email, password },
                    // responseType: "json",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                // .then((res) => console.log(res.data));
                .then((res) => navigation.navigate("Login", res.data));
            
        } catch (error) {
            // console.log(error);
        }
    }

    const handleGameSubmit = async() => {
        try {
            navigation.navigate("Game");
            
        } catch (error) {
            // console.log(error);
        }
    }

    const handleResultsSubmit = async() => {
        try {
            const {axios_post} = await axios({
                    url: "http://" + SERVER_IP +":3000/game/view",
                    method: "POST",
                    data: {email},
                    // responseType: "json",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                // .then((res) => console.log(res.data));
                .then((res) => navigation.navigate("Results", res.data));
            
        } catch (error) {
            // console.log(error);
        }
    }

    const save = async() => {
        try {
            if (route.params.name !== null || route.params.email !== null) {
                await AsyncStorage.setItem("name", route.params.name);
                await AsyncStorage.setItem("email", route.params.email);
            }
        } catch (error) {
            // alert(error);
        }
    };

    const load = async() => {
        try {
            let name = await AsyncStorage.getItem("name");
            let email = await AsyncStorage.getItem("email");

            if (name !== null || email !== null) {
                setName(name);
                setEmail(email);
                // console.log("loaded!");
            }

            setName(name);
            setEmail(email);
        } catch (error) {
            // alert(error);
        }
    }

    useEffect(() => {
        save();
        load();
    });

    return (       
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{ fontSize: 28, marginBottom:30 }}>Hello <Text style={{ fontWeight: "bold" }}>{name}</Text></Text>

            <SubmitButton name="PLAY GAME" handleSubmit={handleGameSubmit} />
            <SubmitButton name="SHOW RESULTS" handleSubmit={handleResultsSubmit} />
            <SubmitButton name="SIGN OUT" handleSubmit={handleSignOutSubmit} />

        </ScrollView>
    )
}

export default Dashboard;