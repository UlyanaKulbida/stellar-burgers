import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      addBunToConstructor(): Chainable<void>;
      addIngredientToConstructor(type: string, name: string): Chainable<void>;
      openIngredientModal(ingredientName: string): Chainable<void>;
      closeModal(): Chainable<void>;
      closeModalByOverlay(): Chainable<void>;
      createOrder(): Chainable<void>;
    }
  }
}
