import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm(props) {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: props.selectedExpense
        ? props.selectedExpense.amount.toString()
        : "",
      isValid: true,
    },
    date: {
      value: props.selectedExpense
        ? props.selectedExpense.date.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: props.selectedExpense ? props.selectedExpense.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((currentValue) => {
      return {
        ...currentValue,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      setInputValue((currentValue) => {
        return {
          amount: { value: currentValue.amount.value, isValid: amountIsValid },
          date: { value: currentValue.date.value, isValid: dateIsValid },
          description: {
            value: currentValue.description.value,
            isValid: descIsValid,
          },
        };
      });
      return;
    }
    props.onSubmit(expenseData);
  }

  const formIsValid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>YOUR EXPENSE</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputValue.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputValue.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValue.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: "sentences",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description.value,
        }}
      />
      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid Input Values - please check your entered data
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={props.onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {props.submittLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
