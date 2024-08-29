import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function ErrorOverLay(props){
    return(
        <View style={styles.container}>
            <Text>An Error Has Been Occured</Text>
            <Text>{props.message}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    }
})