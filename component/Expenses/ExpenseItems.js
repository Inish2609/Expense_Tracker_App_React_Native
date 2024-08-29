import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import getFormattedDate from "../../util/data";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItems(props) {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", { expenseId: props.id });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.decription]}>
            {props.description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(props.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{props.amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 4,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  decription: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    // paddingVertical:4,
    // paddingHorizontal:12,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
