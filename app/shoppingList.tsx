import {ListScreenProps} from "@/app/_layout";
import {Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {useEffect, useState} from "react";
import {ShoppingItems} from "@/app/types";
import {SafeAreaView} from "react-native-safe-area-context";

const ShoppingList = ({navigation, route}: ListScreenProps) => {
    const {id, shopName, allItems, onUpdateAllItems} = route.params;
    const [itemText, onChangeItemText] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [editObj, setEditObj] = useState<{ id: number, item: string }>();
    const [itemList, setItemList] = useState<ShoppingItems[]>();

    useEffect(() => {
        if (shopName) {
            navigation.setOptions({ title: shopName });
        }
    }, [navigation, shopName]);

    useEffect(() => {
        if (allItems) {
            const filterList = allItems.filter((item) => item.shopId.id === id).sort((a,b)=>a.id-b.id)
            setItemList(filterList)
        }
    }, [id, allItems]);


    const handleSubmit = () => {
        if (isEdit) {
            try {
                fetch(`http://localhost:8080/lists/items/${editObj?.id}`, {
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        item: itemText
                    })
                }).then(res => {
                    console.log(res)
                    //itemListを更新
                    if (itemList && editObj) {
                        const changeItem = itemList.find(item => item.id === editObj.id);
                        if (changeItem) {
                            const updatedItemList = itemList.map(item =>
                                item.id === editObj.id ? { ...item, item: itemText } : item
                            );
                            updatedItemList.sort((a, b) => a.id - b.id);
                            setItemList(updatedItemList);

                        const updatedAllItems = allItems?.map(item =>
                            item.id === editObj?.id ? { ...item, item: itemText } : item
                        );
                        onUpdateAllItems(updatedAllItems);
                    }}}
                )


            } catch {
                console.error('error')
            }
            setIsEdit(false);
            onChangeItemText('')
            setEditObj(undefined)
        } else {
            try {
                fetch('http://localhost:8080/lists/items', {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        item: itemText,
                        buy: false,
                        shopId: id,
                        userId: 1
                    })
                }).then(res => console.log(res))
            } catch {
                console.error('error')
            }
        }
    }
    const handleEdit = (id: number, item: string) => {
        console.log(id)
        setIsEdit(true);
        setEditObj({id: id, item: item});
        onChangeItemText(item);
    }
    const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/lists/items/${id}`, {
            method: "DELETE"
        }).then(res => {
            console.log('delete')
            const updatedAllItems = allItems?.filter(item => item.id !== id);
            onUpdateAllItems(updatedAllItems);
            setItemList(prevList => prevList?.filter(item => item.id !== id));
        })
    }

    const renderItem = ({item}: ListRenderItemInfo<ShoppingItems>) => {
        return (
            <View style={styles.items}>
                <Text style={styles.itemText}>{item.item}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                        handleEdit(item.id, item.item)
                    }}>
                        <Icon name="edit" color="4f4444"> </Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handleDelete(item.id)
                    }}>
                        <Icon name="delete" color="#555555"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 ,alignItems:"center"}}>
            <View style={styles.itemList}>
                <FlatList data={itemList} renderItem={renderItem}/>
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="買うものを入力"
                    onChangeText={onChangeItemText}
                    value={itemText}
                />
                <TouchableOpacity>
                    <Button
                        title={isEdit ? "変更" : "追加"}
                        onPress={handleSubmit}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default ShoppingList

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "#87cefa",
        borderRadius: 6,
        width: "90%"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        width:"90%"
    },
    items: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        width: "90%",
        marginLeft: 20,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 2,
        shadowColor: "#333",
    },
    itemText: {
        maxWidth: "80%",
        marginLeft:20
    },
    buttonContainer: {
        flexDirection: "row",
        marginRight:10,
    },
    shopView: {
        // flex:1,
        // flexDirection: 'row',
        // flexWrap: "wrap",
        justifyContent: "center",
        // width: "100%",
        alignContent: "center",

    },
    shopList: {
        width: "40%",
        padding: 5,
    },
    itemList: {
        height: "80%",
        width: "100%",
        // alignItems:"center",
        alignContent: "center",
        margin: "auto",
        marginTop: 20

    },
    button:{
        marginRight:15
    }
});