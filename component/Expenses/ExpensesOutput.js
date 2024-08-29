import { StyleSheet, View, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

// const DUMMY_DATA = [
//   {
//     id: 1,
//     title: "Shoe",
//     amount: 500,
//     date: new Date("2024-11-26"),
//     description : "Hello this is shoe"
//   },
// ];

export default function ExpensesOutput(props) {
  let content = <Text style={styles.infoText}>{props.fallBackText}</Text>;

  if (props.expenses.length > 0) {
    content = <ExpensesList expenses={props.expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={props.expenses}
        periodTime={props.periodTime}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 35,
  },
});
