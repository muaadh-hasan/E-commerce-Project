export class Order {
    totalQuantity: number;
    totalPrice: number;

    displayInfo(){
        console.log("totalQuantity --> " + this.totalQuantity);
        console.log("totalPrice --> " + this.totalPrice);
    }
}
