# Barista System - Initiation aux Tests Unitaires

### Description du projet

Ce projet est une application de gestion de café développée en **TypeScript**. 
Il sert de projet pratique pour **s'initier au développement de tests unitaires** avec **Vitest**.

L'application permet de simuler la gestion d'un salon de café avec les fonctionnalités suivantes :
- Gestion des recettes de café et de leurs ingrédients (`Coffee`).
- Gestion des stocks d'ingrédients et de leurs quantités (`Ingredient`).
- Prise de commandes, vérification et consommation des stocks par le barista (`Barista`).

---

### Objectifs pédagogiques

- **Initiation aux tests unitaires** : Apprendre à rédiger des tests clairs, isolés et pertinents pour vérifier le bon comportement des classes métier.
- **Pratique du TDD** : Valider les règles de gestion (disponibilité des stocks, déduction des ingrédients lors d'une commande, retours d'erreurs).
- **Prise en main de Vitest** : Utiliser les assertions courantes (`expect`, `toBe`, `toEqual`, `toStrictEqual`, etc.).

---

### Technologies utilisées

- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Framework de test** : [Vitest](https://vitest.dev/)
- **Environnement d'exécution** : Node.js

---

### Installation et exécution
#### 1. Prérequis
Assurez-vous d'avoir Node.js installé sur votre machine.

#### 2. Installation des dépendances
npm install

#### 3. Exécution des tests unitaires
Pour lancer la suite de tests avec Vitest :
npx vitest

#### 4. Exécution du fichier principal
Pour exécuter la démonstration contenue dans barista.ts :
npx tsx barista.ts
