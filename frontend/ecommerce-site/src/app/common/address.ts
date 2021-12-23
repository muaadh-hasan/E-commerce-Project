export class Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;


    displayInfo(){
        console.log("street --> " + this.street);
        console.log("city --> " + this.city);
        console.log("state --> " + this.state);
        console.log("country --> " +this.country);
        console.log("zipCode --> " +this.zipCode);
    }


}
