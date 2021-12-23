import { Address } from './address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './order-item';

export class Purchase {
    customer: Customer;
    address: Address;
    order: Order;
    orderItems: OrderItem[];

    displayInfo(){
        console.log("Customer --> " 
        + this.customer.firstName + " ," + 
          this.customer.lastName + " ," + 
          this.customer.email + " ," +
          this.customer.password  +" ," +
          this.customer.role );
        // console.log("Address --> " + this.address.displayInfo());
        // console.log("Order --> " + this.order.displayInfo());
        // for (let i=0; i < this.orderItems.length; i++) {
        //     console.log("OrderItems --> " + this.orderItems[i].displayInfo());
        // }
    }

}
