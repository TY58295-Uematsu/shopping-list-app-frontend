import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import Index from "@/app/index";
import ShoppingList from "@/app/shoppingList";
import {ShoppingItems} from "@/app/types";

export type RootStackParamList = {
    home: undefined; // Indexパラメータがなし
    ShoppingList: {
        id: number;
        shopName: string;
        allItems: ShoppingItems[]|undefined;
        onUpdateAllItems: (updatedItems: ShoppingItems[]|undefined) => void;
    };

}

export type IndexScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;
export type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'ShoppingList'>;

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootLayout() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={Index} options={{title: '買い物リスト'}}/>
            <Stack.Screen name="ShoppingList" component={ShoppingList}/>
            {/*<Stack.Screen name="ShoppingList2" component={ShoppingList}/>*/}
        </Stack.Navigator>
    );
}
