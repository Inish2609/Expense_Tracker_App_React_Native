import { Text, View, StyleSheet } from "react-native";
import ExpensesOutput from "../component/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expense-context";

export default function AllExpenses() {
  const expenseCtx = useContext(ExpenseContext);

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={expenseCtx.expenses}
        periodTime="Total"
        fallBackText="No Expenses are registered"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
