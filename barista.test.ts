import { describe, expect, it } from "vitest";
import { Coffee } from "./barista.ts";
import { Ingredient } from "./barista.ts";
import { Barista } from "./barista.ts";

describe("Coffee", () => {
    it("crée un café avec un nom et un prix", () => {
        const coffee = new Coffee("Cappuccino", 4);

        expect(coffee.name).toBe("Cappuccino");
        expect(coffee.price).toBe(4);
    });

    it("ajoute un ingrédient à la recette", () => {
        const coffee = new Coffee("Cappuccino", 4);
        coffee.addIngredient("sucre", 10);

        expect(coffee.ingredients).toStrictEqual([{ name: "sucre", quantity: 10 }]);
    });
});

describe("Ingredient", () => {
    it("ajoute une quantité au stock", () => {
        const sucre = new Ingredient("sucre", 30);
        sucre.addQuantity(10);

        expect(sucre.quantity).toBeGreaterThan(30);
        expect(sucre.quantity).toStrictEqual(40);
    });

    it("retire une quantité du stock", () => {
        const miel = new Ingredient("miel", 50);
        miel.removeQuantity(40);

        expect(miel.quantity).toBeLessThan(50);
        expect(miel.quantity).toStrictEqual(10);

    });

    it("refuse de retirer une quantité supérieure au stock", () => {
        const milk = new Ingredient("milk", 20);
        milk.removeQuantity(30);

        expect(milk.removeQuantity).toBeFalsy;
        expect(milk.quantity).toStrictEqual(20);
    });
});

describe("Barista", () => {
    it("ajoute un café à sa liste de cafés", () => {
        const barista = new Barista("Baristagnes");
        const coffee = new Coffee("café latte", 20);
        barista.coffees.push(coffee);

        expect(barista.coffees).toEqual([{ name: "café latte", price: 20, "ingredients": [] }]);
    });

    it("retourne undefined lorsqu'un café n'existe pas", () => {
        const baristo = new Barista("Baristoliv");
        expect(baristo.getCoffee("café latte")).toBe(undefined);
    });

    it("peut préparer un café lorsque tous les ingrédients sont disponibles", () => {
        const coffee = new Coffee("Cappuccino", 4);
        const baristo = new Barista("Baristoliv");
        const milk = new Ingredient("milk", 40);
        const café = new Ingredient("café", 100);
        const lait = new Ingredient("milk", 3);
        const kawa = new Ingredient("café", 5);
        baristo.ingredients.push(milk);
        baristo.ingredients.push(café);
        coffee.ingredients.push(lait);
        coffee.ingredients.push(kawa);

        expect(baristo.canMakeCoffee(coffee)).toBeTruthy;
    });

    it("ne peut pas préparer un café lorsqu'un ingrédient est manquant", () => {
        const coffee = new Coffee("Cappuccino", 4);
        const baristo = new Barista("Baristoliv");
        const milk = new Ingredient("milk", 40);
        const café = new Ingredient("café", 100);
        const lait = new Ingredient("milk", 3);
        const kawa = new Ingredient("café", 5);
        const sucre = new Ingredient("sugar", 1);
        baristo.ingredients.push(milk);
        baristo.ingredients.push(café);
        coffee.ingredients.push(lait);
        coffee.ingredients.push(kawa);
        coffee.ingredients.push(sucre);

        expect(baristo.canMakeCoffee(coffee)).toBeFalsy;
    });

    it("ne peut pas préparer un café lorsque la quantité est insuffisante", () => {
        const coffee = new Coffee("Cappuccino", 4);
        const baristo = new Barista("Baristoliv");
        const milk = new Ingredient("milk", 40);
        const café = new Ingredient("café", 100);
        const lait = new Ingredient("milk", 3);
        const kawa = new Ingredient("café", 5);
        const sucre = new Ingredient("sugar", 2);
        const sugar = new Ingredient("sugar", 1);
        baristo.ingredients.push(milk);
        baristo.ingredients.push(café);
        baristo.ingredients.push(sugar);
        coffee.ingredients.push(lait);
        coffee.ingredients.push(kawa);
        coffee.ingredients.push(sucre);

        expect(baristo.canMakeCoffee(coffee)).toBeFalsy;

    });

    it("consomme les ingrédients lorsqu'il prépare un café", () => {
        const coffee = new Coffee("Cappuccino", 4);
        const baristo = new Barista("Baristoliv");
        const milk = new Ingredient("milk", 40);
        const café = new Ingredient("café", 100);
        const lait = new Ingredient("milk", 3);
        const kawa = new Ingredient("café", 5);
        baristo.ingredients.push(milk);
        baristo.ingredients.push(café);
        coffee.ingredients.push(lait);
        coffee.ingredients.push(kawa);

        baristo.makeCoffee(coffee);

        expect(milk.quantity).toBeLessThan(40);
        expect(café.quantity).toBeLessThan(100);
    });

    it("ne consomme rien lorsqu'il ne peut pas préparer le café", () => {
        const coffee = new Coffee("Cappuccino", 4);
        const baristo = new Barista("Baristoliv");
        const milk = new Ingredient("milk", 40);
        const café = new Ingredient("café", 100);
        const lait = new Ingredient("milk", 3);
        const kawa = new Ingredient("café", 5);
        const sucre = new Ingredient("sugar", 2);
        const sugar = new Ingredient("sugar", 1);
        baristo.ingredients.push(milk);
        baristo.ingredients.push(café);
        baristo.ingredients.push(sugar);
        coffee.ingredients.push(lait);
        coffee.ingredients.push(kawa);
        coffee.ingredients.push(sucre);

        baristo.makeCoffee(coffee);

        expect(milk.quantity).toEqual(40);
        expect(café.quantity).toEqual(100);
        expect(sugar.quantity).toEqual(1);
    });

    it("retourne le prix lorsqu'un café est commandé", () => {
        const cafeLatte = new Coffee("Latte", 4);
        const baristo = new Barista("Baristoliv");
        const milk = new Ingredient("milk", 40);
        const café = new Ingredient("café", 100);
        const lait = new Ingredient("milk", 3);
        const kawa = new Ingredient("café", 5);
        baristo.ingredients.push(milk);
        baristo.ingredients.push(café);
        cafeLatte.ingredients.push(lait);
        cafeLatte.ingredients.push(kawa);

        baristo.addCoffee(cafeLatte);

        expect(baristo.orderCoffee("Latte")).toStrictEqual(4);

    });
});