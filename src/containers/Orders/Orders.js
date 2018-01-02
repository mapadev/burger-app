import React, { Component } from "react";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios
            .get("/orders.json")
            .then(res => {
                let fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
                console.log(this.state.orders);
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let orders = <Spinner />;

        if (this.state.loading === false) {
            orders = this.state.orders.map(order => (
                <Order
                    key={order.id}
                    orderId={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ));
        }

        return <div>{orders}</div>;
    }
}

export default withErrorHandler(Orders, axios);