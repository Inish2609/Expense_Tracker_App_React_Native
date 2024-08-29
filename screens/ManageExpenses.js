import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../component/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../component/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverLay from "../component/UI/LoadingOverLay";
import ErrorOverLay from "../component/UI/ErrorOverLay";

export default function ManageExpenses(props) {
  const editedExpenseId = props.route.params?.expenseId;
  const isEdited = !!editedExpenseId;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState();

  const expenseCtx = useContext(ExpenseContext);

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEdited ? "Edit Expense" : "Add Expense",
    });
  }, [props.navigation, isEdited]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      props.navigation.goBack();
    } catch (error) {
      setError("Could Not Delete -- Try Again Later");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    props.navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEdited) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      props.navigation.goBack();
    } catch (error) {
      setError("Could NOt Save Data -- Try Again Later");
      setIsSubmitting(false);
    }
  }

  if(error && !isSubmitting){
    return <ErrorOverLay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverLay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submittLabel={isEdited ? "Update" : "Add"}
        selectedExpense={selectedExpense}
      />
      {isEdited && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
