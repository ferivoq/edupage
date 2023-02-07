import { Link } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export function HomeScreen(){
    let [schoolId, setSchoolId] = useState("");

    return <View>
        <TextInput onChangeText={setSchoolId} value={schoolId}></TextInput>
        <Link to={`/${schoolId}/`}>test</Link>
    </View>
}