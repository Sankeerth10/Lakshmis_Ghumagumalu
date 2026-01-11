export type MenuItemType = {
    name: string;
    price: number;
    fullPrice?: number;
    isVeg: boolean;
};

export type MenuCategory = {
    id: string;
    name: string;
    items: MenuItemType[];
};

export type MenuSection = {
    id: string;
    title: string;
    categories: MenuCategory[];
};

export const menuData: MenuSection[] = [
    {
        id: "fast-food",
        title: "Fast Food",
        categories: [
            {
                id: "fast-food-nonveg",
                name: "Non-Veg",
                items: [
                    { name: "Chicken Spring Rolls (3pcs)", price: 100, isVeg: false },
                    { name: "Crispy Chicken Fries", price: 100, isVeg: false },
                    { name: "Chicken Pop Corn (10pcs)", price: 100, isVeg: false },
                    { name: "Chicken Nuggets (6 pcs)", price: 120, isVeg: false },
                    { name: "Chicken Breaded (2 pcs)", price: 150, isVeg: false },
                    { name: "Chicken Fry Momos (8pcs)", price: 130, isVeg: false },
                    { name: "Chicken Schezwan Fry Momos (8pcs)", price: 150, isVeg: false },
                ],
            },
            {
                id: "fast-food-veg",
                name: "Veg",
                items: [
                    { name: "Veg Spring Rolls (3pcs)", price: 80, isVeg: true },
                    { name: "Cheesy Corn Triangle", price: 100, isVeg: true },
                    { name: "Potato Mini Kives", price: 100, isVeg: true },
                    { name: "Mix Veg Momos (8 pcs)", price: 120, isVeg: true },
                    { name: "French Fries Salted", price: 90, isVeg: true },
                    { name: "French Fries Masala", price: 100, isVeg: true },
                ],
            },
        ],
    },
    {
        id: "rice",
        title: "Rice",
        categories: [
            {
                id: "rice-veg",
                name: "Veg",
                items: [
                    { name: "Veg Fried Rice", price: 70, fullPrice: 130, isVeg: true },
                    { name: "Veg Schezwan Rice", price: 80, fullPrice: 150, isVeg: true },
                    { name: "Veg Manchurian Rice", price: 80, fullPrice: 150, isVeg: true },
                    { name: "Paneer Fried Rice", price: 100, fullPrice: 180, isVeg: true },
                    { name: "Paneer Schezwan Rice", price: 110, fullPrice: 200, isVeg: true },
                    { name: "Kaju Rice", price: 80, fullPrice: 150, isVeg: true },
                    { name: "Jeera Rice", price: 80, fullPrice: 150, isVeg: true },
                ],
            },
            {
                id: "rice-nonveg",
                name: "Non-Veg",
                items: [
                    { name: "Egg Fried Rice", price: 80, fullPrice: 150, isVeg: false },
                    { name: "Double Egg Fried Rice", price: 90, fullPrice: 160, isVeg: false },
                    { name: "Egg Schezwan Rice", price: 90, fullPrice: 160, isVeg: false },
                    { name: "Chicken Fried Rice", price: 100, fullPrice: 180, isVeg: false },
                    { name: "Double Egg Chicken Rice", price: 110, fullPrice: 200, isVeg: false },
                    { name: "Chicken Schezwan Rice", price: 110, fullPrice: 200, isVeg: false },
                ],
            },
        ],
    },
    {
        id: "noodles",
        title: "Noodles",
        categories: [
            {
                id: "noodles-veg",
                name: "Veg",
                items: [
                    { name: "Veg Noodles", price: 70, fullPrice: 130, isVeg: true },
                    { name: "Veg Schezwan Noodles", price: 80, fullPrice: 150, isVeg: true },
                    { name: "Veg Manchurian Noodles", price: 80, fullPrice: 150, isVeg: true },
                    { name: "Paneer Noodles", price: 100, fullPrice: 180, isVeg: true },
                    { name: "Paneer Schezwan Noodles", price: 110, fullPrice: 200, isVeg: true },
                ],
            },
            {
                id: "noodles-nonveg",
                name: "Non-Veg",
                items: [
                    { name: "Egg Noodles", price: 80, fullPrice: 150, isVeg: false },
                    { name: "Double Egg Noodles", price: 90, fullPrice: 160, isVeg: false },
                    { name: "Egg Schezwan Noodles", price: 90, fullPrice: 160, isVeg: false },
                    { name: "Chicken Noodles", price: 100, fullPrice: 180, isVeg: false },
                    { name: "Double Egg Chicken Noodles", price: 110, fullPrice: 200, isVeg: false },
                    { name: "Chicken Schezwan Noodles", price: 110, fullPrice: 200, isVeg: false },
                ],
            },
        ],
    },
    {
        id: "starters",
        title: "Starters",
        categories: [
            {
                id: "starters-veg",
                name: "Veg",
                items: [
                    { name: "Veg Manchurian", price: 80, fullPrice: 150, isVeg: true },
                    { name: "Veg 65", price: 80, fullPrice: 150, isVeg: true },
                    { name: "Chilli Paneer", price: 120, fullPrice: 200, isVeg: true },
                    { name: "Paneer 65", price: 120, fullPrice: 200, isVeg: true },
                ],
            },
            {
                id: "starters-nonveg",
                name: "Non-Veg",
                items: [
                    { name: "Chicken 65", price: 140, fullPrice: 240, isVeg: false },
                    { name: "Chicken Manchurian", price: 140, fullPrice: 240, isVeg: false },
                    { name: "Chilly Chicken", price: 140, fullPrice: 240, isVeg: false },
                    { name: "Pepper Chicken", price: 140, fullPrice: 240, isVeg: false },
                    { name: "Garlic Chicken", price: 140, fullPrice: 240, isVeg: false },
                    { name: "Ginger Chicken", price: 140, fullPrice: 240, isVeg: false },
                    { name: "Egg With Chicken Manchurian", price: 160, fullPrice: 260, isVeg: false },
                ],
            },
        ],
    },
    {
        id: "milkshakes",
        title: "Milkshakes",
        categories: [
            {
                id: "milkshakes-all",
                name: "",
                items: [
                    { name: "Oreo Milkshake", price: 90, isVeg: true },
                    { name: "Banana Milkshake", price: 90, isVeg: true },
                    { name: "Vanilla Milkshake", price: 90, isVeg: true },
                    { name: "Chocolate Milkshake", price: 90, isVeg: true },
                    { name: "Strawberry Milkshake", price: 90, isVeg: true },
                    { name: "Mango Milkshake", price: 90, isVeg: true },
                    { name: "Dates Milkshake", price: 100, isVeg: true },
                    { name: "Oreo Nutella Milkshake", price: 100, isVeg: true },
                    { name: "Belgium Chocolate Milkshake", price: 100, isVeg: true },
                    { name: "Banana Oreo Milkshake", price: 100, isVeg: true },
                    { name: "Butterscotch Milkshake", price: 110, isVeg: true },
                    { name: "Kit Kat Milkshake", price: 110, isVeg: true },
                    { name: "Nutella Milkshake", price: 110, isVeg: true },
                    { name: "Black Current Milkshake", price: 110, isVeg: true },
                    { name: "Pista Milkshake", price: 120, isVeg: true },
                    { name: "Dry Fruit Milkshake", price: 120, isVeg: true },
                ],
            },
        ],
    },
];
