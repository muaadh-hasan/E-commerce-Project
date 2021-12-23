import { CartItem } from './cart-item';

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: number;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
    }

    displayInfo(){
        console.log("imageUrl --> " + this.imageUrl);
        console.log("lastName --> " + this.quantity);
        console.log("unitPrice --> " + this.unitPrice);
        console.log("productId --> " +this.productId);
    }
}
