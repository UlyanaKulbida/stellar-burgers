/// <reference types="cypress" />

// Добавляет булку "Краторная булка N-200i" в конструктор.
Cypress.Commands.add('addBunToConstructor', () => {
  cy.get('[data-cy=bun-category]').contains('Добавить').click();
  cy.get('[data-cy=constructor-bun-top]')
    .contains('Краторная булка N-200i')
    .should('exist');
  cy.get('[data-cy=constructor-bun-bottom]')
    .contains('Краторная булка N-200i')
    .should('exist');
});

// Добавляет ингредиент в конструктор по типу и названию.
Cypress.Commands.add('addIngredientToConstructor', (type, name) => {
  cy.get(`[data-cy=${type}-category]`).contains('Добавить').click();
  cy.get('[data-cy=constructor-mains-category]').contains(name).should('exist');
});

// Открывает модалку (детали ингредиента) по названию ингредиента.
Cypress.Commands.add('openIngredientModal', (ingredientName) => {
  cy.contains(ingredientName).click();
  cy.contains('Детали ингредиента').should('exist');
});

// Закрывает активное модальное окно нажатием на кнопку «закрыть».
Cypress.Commands.add('closeModal', () => {
  cy.get('#modals button[data-cy=close-button]').click();
});

// Закрывает активное модальное окно кликом по оверлею.
Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('[data-cy=overlay]').click('left', { force: true });
});

/* Полностью создаёт заказ (полный цикл):
 1. Добавляет булку
 2. Добавляет основной ингредиент и соус
 3. Нажимает «Оформить заказ»
 4. Дожидается завершения запроса создания заказа (@createOrder) */

Cypress.Commands.add('createOrder', () => {
  cy.addBunToConstructor();
  cy.addIngredientToConstructor('main', 'Биокотлета из марсианской Магнолии');
  cy.addIngredientToConstructor('sauce', 'Соус Spicy-X');
  cy.contains('Оформить заказ').click();
  cy.wait('@createOrder', { timeout: 10000 });
});
