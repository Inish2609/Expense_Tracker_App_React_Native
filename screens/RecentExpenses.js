import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../component/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expense-context";
import { get7days } from "../util/data";
import { getExpenses } from "../util/http";
import LoadingOverLay from "../component/UI/LoadingOverLay";
import ErrorOverLay from "../component/UI/ErrorOverLay";
export default function RecentExpenses() {
  const expenseCtx = useContext(ExpenseContext);

  // const [fetchedExpense,setFetchedExpense] = useState([])

  const [isFetching,setIsFetching] = useState(true)
  const [error,setError] = useState()

  useEffect(()=>{
    async function getExp() {
      setIsFetching(true)
      try{
        const expenses = await getExpenses()
        setIsFetching(false)
        // setFetchedExpense(expenses)
        expenseCtx.setExpenses(expenses)
      }
      catch(error){
        setError("Could Not Fetch Data -- Try Again later")
      }
    }
    getExp()
  },[])

  if(error && isFetching){
    return <ErrorOverLay message={error} />
  }


  if(isFetching){
    return <LoadingOverLay />
  }

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const before7days = get7days(today, 7);
    return expense.date > before7days;
  });

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        periodTime="Last"
        fallBackText="No Expenses are registered for last 7 days"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
