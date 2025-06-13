import {View, Button, StyleSheet, FlatList, ListRenderItemInfo, Text, TouchableHighlight} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCallback, useEffect, useState} from "react";
import {ShoppingItems, Shops, Users} from "@/app/types";
import type {IndexScreenProps} from "@/app/_layout"; // 型をインポート


export default function Index({navigation}: IndexScreenProps) {
    const [user, setUser] = useState<Users>()
    const [allItems, setAllItems] = useState<ShoppingItems[]>()

    useEffect(() => {
        fetch('https://shopping-list-app-backend.onrender.com/users/1')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            });
    }, []);

    useEffect(() => {
        if (user?.id) {
            console.log(user.id)
            fetch(`https://shopping-list-app-backend.onrender.com/lists/all/${user.id}`)
                .then(res => res.json())
                .then((data: ShoppingItems[]) => {
                    setAllItems(data)
                    console.log("data", data)
                });
        }
    }, [user]);

    const handleUpdateAllItems = useCallback((updatedItems: ShoppingItems[] | undefined) => {
        setAllItems(updatedItems);
    }, []);

    const handleNavigation =(id:number, shopName:string)=>{
        navigation.navigate('ShoppingList', {
            id: id,
            shopName: shopName,
            allItems: allItems,
            onUpdateAllItems: handleUpdateAllItems
        })
    }

    const shopArray: Shops[] = [
        {id: 1, shopName: "スーパー"},
        {id: 2, shopName: "ドラッグストア"},
        {id: 3, shopName: "100均"},
        {id: 4, shopName: "雑貨"}
    ]

    return (
        <SafeAreaView style={{ flex: 1 ,alignItems:"center"}}>
            <Text style={{paddingTop:50, height:100, }}>お店を選んでください。</Text>
            <View style={styles.shopView}>
                {/*<TouchableHighlight>*/}
                <Text
                    style={{...styles.navArea, backgroundColor:"#ffffff"}}
                    onPress={()=>handleNavigation(shopArray[0].id,shopArray[0].shopName)}
                >
                    {shopArray[0].shopName}
                </Text>
                {/*</TouchableHighlight>*/}
                <Text
                    style={{...styles.navArea, backgroundColor:"#ffffff"}}
                    onPress={()=>handleNavigation(shopArray[1].id,shopArray[1].shopName)}
                >
                    {shopArray[1].shopName}
                </Text>
                <Text
                    style={{...styles.navArea, backgroundColor:"#ffffff"}}
                    onPress={()=>handleNavigation(shopArray[2].id,shopArray[2].shopName)}
                >
                    {shopArray[2].shopName}
                </Text>
                <Text
                    style={{...styles.navArea, backgroundColor:"#ffffff"}}
                    onPress={()=>handleNavigation(shopArray[3].id,shopArray[3].shopName)}
                >
                    {shopArray[3].shopName}
                </Text>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    shopView: {
        flex:1,
        flexDirection: 'column',
        justifyContent: "space-around",
        width: "80%",
        alignContent: "center",
        alignItems:"center",
        // marginTop:100,
        marginBottom:200

    },
    shopList: {
        width: "40%",
        padding: 5,
    },

    navArea:{
        borderStyle:"solid",
        borderColor:"#123456",
        borderRadius:6,
        margin:10,
        width: "80%",
        height:70,
        padding: 5,
        textAlign:"center",
        paddingTop:25,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 2,
        shadowColor: "#333",


    }
});