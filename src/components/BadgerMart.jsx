import { Text, View, Button } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'
import { useEffect, useState } from "react";

export default function BadgerMart(props) {

    // Overall used the lecture code examples to help guide me 
    // State variables and other globally used variables
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    // Used the cart like a dictionary
    // Used this source to guide myself: https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/
    // Got some help from Office Hours for this part
    const [cart, setCart] = useState({});
    const [totalAmount, setTotalAmount] = useState(0)
    let totalCost = 0

    // Fetch data from API as specified by HW instructions
    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/hw7/items", {
            headers: {
                "X-CS571-ID": "bid_847d09ed085dacaedc451fd225893d7a6d17095344e4ca85c2843d44093da7cb"
            }
        })
        .then(res => res.json())
        .then(data => setItems(data))
    }, []);

    // function to move forward a page
    function goForward() {
        setPage(page => page + 1)
    }

    // function to move back a page
    function goBack() {
        setPage(page => page - 1)
    }

    // function to add to the overall cart total and each individual item total
    // I used this resource to help me figure how useState and objects work together: https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
    // I also used this resource to figure out how to access the object properties inside the settter function: https://stackoverflow.com/questions/70583261/accessing-javascript-object-property-dynamically-during-usestate-update
    // I used ChatGPT to get the initial idea and then completed the implementation with these sources to reach this approach
    function addToCart(itemName) {
        setTotalAmount(total => total + 1)
        // Got the information for the in operator from this source: https://www.geeksforgeeks.org/javascript-in-operator/
        if (itemName in cart) {
            setCart(prevCart => ({
                ...prevCart,
                [itemName]: prevCart[itemName] + 1
            }))
        }
        else {
            setCart(prevCart => ({
                ...prevCart,
                [itemName]: 1
            }))
        }
    }

    // Decreases total amount of items in cart and from each individual item total
    // Inverse of the logic from add 
    // Used all of the same resources from the add function here as well
    function removeFromCart(itemName) {
        setTotalAmount(total => total - 1)
        setCart(prevCart => ({
            ...prevCart,
            [itemName]: prevCart[itemName] - 1
        }))
    }

    // This for loop is used to figure out the total cost of all the items in the user's cart
    for (let i = 0; i < items.length; i++) {
        if (items[i].name in cart) {
            totalCost += items[i].price * cart[items[i].name]
        }
    }

    // This function will alert the user of their cart's contents and cost. It will then reset the cart, return to the first page, and reset the total
    function placeOrder() {
        alert("Order Confirmed! Your order contains " + totalAmount.toString() + " items and costs $" + totalCost.toFixed(2).toString() + "!")
        setCart({})
        setPage(1)
        setTotalAmount(0)
    }

    // Used similiar logic from previous homeworks and lecture code examples for this section
    // Used slicing and maping from previous HW
    // Used this source to figure out how to disable buttons: https://reactnative.dev/docs/button
    return <View>
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
        <Button title="Previous" onPress = {goBack} disabled = {page === 1}/>
        <Button title="Next" onPress = {goForward} disabled = {page === items.length}/>
        {items.slice(((page) - 1) * 1, page * 1).map(item => (
            <BadgerSaleItem
                {...item}
                key = {item.name} 
                itemAmount = {cart[item.name] ? cart[item.name] : 0}
                addToCart = {addToCart}
                removeFromCart = {removeFromCart}
                totalAmount = {totalAmount}
                totalCost = {totalCost}
                placeOrder = {placeOrder}
            />
        ))}
    </View>
}
