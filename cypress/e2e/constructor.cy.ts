describe('test add ingredient to constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('добавляем булочку в конструктор', () => {
    cy.get('[data-cy=bun-category]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun-bottom')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('добавляем ингредиент в конструктор', () => {
    cy.get('[data-cy=main-category]').contains('Добавить').click();
    cy.get('[data-cy=sauce-category]').contains('Добавить').click();
    cy.get('[data-cy=constructor-mains-category')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-mains-category')
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('тестируем работу модели', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('тестовый открытый режим', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });

  it('тестируем режим закрытия при нажатии на кнопку', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[data-cy=close-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('тестируем режим закрытия при щелчке по оверлею', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=overlay]').click('left', { force: true });
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
    cy.get('[data-cy=bun-category]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun-bottom')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=main-category]').contains('Добавить').click();
    cy.get('[data-cy=sauce-category]').contains('Добавить').click();
    cy.get('[data-cy=constructor-mains-category')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-mains-category')
      .contains('Соус Spicy-X')
      .should('exist');
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder', { timeout: 10000 });

    cy.contains('идентификатор заказа').should('exist');
    cy.get('#modals').contains('1234').should('exist');

    cy.get('#modals button[data-cy=close-button]').click();
    cy.contains('идентификатор заказа').should('not.exist');

    cy.get('[data-cy=constructor-buns-category')
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=constructor-mains-category')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor-mains-category')
      .contains('Соус Spicy-X')
      .should('not.exist');
  });
});
