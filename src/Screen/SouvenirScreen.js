import React from "react";
import { StyleSheet, FlatList } from "react-native";
import SouvenirComponent from "../components/SouvenirComponent";


export default class SouvenirScreen extends React.Component {
    //Khoi tao
    constructor(props){
        super(props);
        this.state = {
            products: [
                {
                    id: 1,
                    images: [
                        {
                            url:''
                        }
                    ],
                    name: 'abc',
                    price: '50000'
                },
                {
                    id:2,
                    images: [
                        {
                            url:''
                        }
                    ],
                    name: 'bcd',
                    price: '40000'
                }
            ]
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.products}
                renderItem={({ item }) =>
                    <SouvenirComponent product={item} />
                }
                keyExtrator={(item) => '${item.id}'} />
        );
    }
}

const styles = StyleSheet.create({
    
})