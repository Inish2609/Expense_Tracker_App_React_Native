import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input(props){

    const inputStyles = [styles.input]

    if(props.textInputConfig && props.textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }

    if(props.invalid){
        inputStyles.push(styles.errorInput)
    }

    return(
        <View style={[styles.inputContainer,props.style]}>
            <Text style={[styles.label,props.invalid && styles.errorLabel]} >{props.label}</Text>
            <TextInput style={inputStyles} {...props.textInputConfig}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:8,
        marginHorizontal:4,
    },
    label:{
        fontSize:12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        color:GlobalStyles.colors.primary700,
        padding:6,
        borderRadius:6,
        fontSize:18,
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top'
    },
    errorLabel:{
        color:GlobalStyles.colors.error500
    },
    errorInput:{
        backgroundColor:GlobalStyles.colors.error50
    }
})