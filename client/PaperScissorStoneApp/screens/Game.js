import { Image, Pressable, Text, View } from "react-native";
import SubmitButton from "../components/SubmitButton";

import {SERVER_IP} from '@env';

import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Game = ({route, navigation}) => {

    const choices = ["paper", "scissor", "stone"];
    // const [player_choice, set_player_choice] = useState("paper");
    // const [opponent_choice, set_opponent_choice] = useState("paper");
    // const [opponent_img, set_opponent_img] = useState("");
    const [result, setResult] = useState("");

    const player_imgs = [require("../assets/paper.png"), require("../assets/scissor.png"), require("../assets/stone.png")];
    const opponent_imgs = [
        require("../assets/opponent.png"), 
        require("../assets/paper_opponent.png"),
        require("../assets/scissor_opponent.png"),
        require("../assets/stone_opponent.png")]
    const [opponent_imgs_indice, set_opponent_imgs_indice ] = useState(0);

    const handleGoBackSubmit = async() => {
        try {
            navigation.navigate("Dashboard");
        } catch (error) {
            // console.log(error);
        }
    }

    const handleJudgeSubmit = async(choice) => {
        try {
            let email = await AsyncStorage.getItem("email");

            const player_choice = choice;
            const opponent_choice = choices[Math.floor(Math.random() * choices.length)];

            const {axios_post} = await axios({
                    // url: "http://localhost:3000/game/judge",
                    url: "http://" + SERVER_IP + ":3000/game/judge",
                    method: "POST",
                    data: { email, player_choice, opponent_choice },
                    responseType: "json",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                    })
                    .then((res) => {
                        const opponent_choice_res = res.data.opponent_choice;
                        const opponent_match_indx = choices.findIndex(x => x == opponent_choice_res) + 1;
                        set_opponent_imgs_indice(opponent_match_indx);
                        setResult(res.data.result);  
                    })
            // navigation.navigate("Dashboard");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 24, marginBottom: 30}}>Opponent</Text>

            {/* <Image source={{uri: "../assets/" + opponent_img + "opponent.png"}} style={{height: 150, width: 150}} /> */}
            <Image source={opponent_imgs[opponent_imgs_indice]} style={{height: 150, width: 150}} />

            <Text style={{fontSize: 24, marginBottom: 30, color: "blue"}}>{result}</Text>

            <Text style={{fontSize: 24, marginBottom: 30}}>Player</Text>

            <View style={{flexDirection: "row", marginBottom: 30}}>

                <Pressable onPress={() => handleJudgeSubmit(choices[0])}>
                    {/* <Image source={{uri: "../assets/" + choices[0] + ".png"}} style={{height: 120, width: 120}} /> */}
                    <Image source={player_imgs[0]} style={{height: 120, width: 120}} />
                </Pressable>
                
                <Pressable onPress={() => handleJudgeSubmit(choices[1])}>
                    <Image source={player_imgs[1]} style={{height: 120, width: 120}} />
                </Pressable>

                <Pressable onPress={() => handleJudgeSubmit(choices[2])}>
                    <Image source={player_imgs[2]} style={{height: 120, width: 120}} />
                </Pressable>

            </View>

            <SubmitButton name="Go Back" handleSubmit={handleGoBackSubmit} />
        </View>
    )
}

export default Game;