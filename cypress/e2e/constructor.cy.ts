describe('test add ingredient to constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('добавляем булочку в конструктор', () => {
    cy.addBunToConstructor();
  });

  it('добавляем ингредиент в конструктор', () => {
    cy.addIngredientToConstructor('main', 'Биокотлета из марсианской Магнолии');
    cy.addIngredientToConstructor('sauce', 'Соус Spicy-X');
  });
});

describe('тестируем работу модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('тестовый открытый режим', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });

  it('тестируем режим закрытия при нажатии на кнопку', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.closeModal();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('тестируем режим закрытия при щелчке по оверлею', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.closeModalByOverlay();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('тестируем создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user-post.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order-post.json' }).as(
      'createOrder'
    );
    window.localStorage.setItem('refreshToken', 'test-refreshToken');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('тестируем весь процесс заказа бургера', () => {
    cy.createOrder();

    cy.contains('идентификатор заказа').should('exist');
    cy.get('#modals').contains('1234').should('exist');

    cy.closeModal();
    cy.contains('идентификатор заказа').should('not.exist');

    cy.get('[data-cy=constructor-buns-category]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=constructor-mains-category]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor-mains-category]')
      .contains('Соус Spicy-X')
      .should('not.exist');
  });
});
