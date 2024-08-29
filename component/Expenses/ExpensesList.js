import { FlatList, View } from "react-native";
import ExpenseItems from "./ExpenseItems";

export default function ExpensesList(props) {
  return (
    <View>
      <FlatList
        data={props.expenses}
        renderItem={(itemData) => {
          return (
            <View>
              <ExpenseItems
                id={itemData.item.id}
                description={itemData.item.description}
                amount={itemData.item.amount}
                date={itemData.item.date}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
