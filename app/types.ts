export type Users={
    id:number;
    userName:string;
    mail:string;
    rootShop:number;
}

export type Shops = {
    id:number;
    shopName:string;
}

export type ShoppingItems = {
    id:number;
    item:string;
    buy:boolean;
    shopId:Shops;
    user:Users;
}