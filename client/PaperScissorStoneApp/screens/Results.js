import { SafeAreaView, ScrollView, Text, View } from "react-native";
import SubmitButton from "../components/SubmitButton";

import {Row, Rows, Table} from 'react-native-table-component';

const Results = ({route, navigation}) => {
    const results = route.params;
    let results_array = []
    const tableHead = ["ID", "Result"];
    for (const [key, value] of Object.entries(results)) {
        const result_row = [key, value];
        results_array.push(result_row);
    }

    const handleGoBackSubmit = async() => {
        try {
            navigation.navigate("Dashboard");
        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <SafeAreaView style={{flex:1, marginTop:30}}>
            <View style={{height: '90%'}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center"}}>
                    <View style={{flex:1, paddingHorizontal:20}}>
                        <Text style={{"textAlign": "center", marginBottom: 20, fontSize: 24}}>Results</Text>
                        <Table borderStyle={{borderWidth: 1}} style={{marginBottom:30}}>
                            <Row data={tableHead}></Row>
                            <Rows data={results_array}></Rows>
                        </Table>
                    </View>
                </ScrollView>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", height:'20%'}}>
                    <SubmitButton name="Go Back" handleSubmit={handleGoBackSubmit}/>
            </View>
        
        </SafeAreaView>
    )
}

export default Results;