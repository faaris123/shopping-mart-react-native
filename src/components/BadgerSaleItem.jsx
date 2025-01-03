import { Text, View, Image, Button } from "react-native";

export default function BadgerSaleItem(props) {

    // Used lecture code examples and previous homeworks to figure out all of the parent to child transferring
    // Got idea to use toFixed form Office Hours and HW rubric
    // Used this source to figure out how to disable buttons: https://reactnative.dev/docs/button
    // Used this source to figure out how to center the image
    return <View>
        <Image style = {{width: 250, height: 250, alignSelf: 'center'}} source = {{uri: props.imgSrc}}/>
        <Text>{props.name}</Text>
        <Text>${(props.price).toFixed(2)} Each</Text>
        <Text>You can order up to {props.upperLimit} units!</Text> 
        <Button title = "+" onPress = {() => props.addToCart(props.name)} disabled = {props.itemAmount === props.upperLimit} />
        <Text>{props.itemAmount}</Text>
        <Button title = "-" onPress = {() => props.removeFromCart(props.name)} disabled = {(props.itemAmount === 0) || (props.totalAmount === 0)} />
        <Text>You have {props.totalAmount} item(s) costing ${props.totalCost.toFixed(2)} in your cart!</Text>
        <Button title = "Place Order" onPress = {props.placeOrder} disabled = {props.totalAmount === 0}/>
    </View>
}
