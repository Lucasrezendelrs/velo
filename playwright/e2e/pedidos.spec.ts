import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {

  // Teste Data
  const order = 'VLO-PVBGL5'

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByTestId('search-order-id').fill(order)
  await page.getByTestId('search-order-button').click()

  // Assert
  
  // Usando x-pach
  //const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-PVBGL5"]')
  //await expect(orderCode).toBeVisible({timeout: 10_000})

  const containerPedido = page.getByRole('paragraph')
    .filter({hasText: /^Pedido$/}) // /^Pedido$ Expressão regular que vai melhorar o critério de filtragem, buscando somente o tento que começa e termina com Pedido
    .locator('..') //Sobe para o elemento pai (a div que agrupa ambos)

  await expect(containerPedido).toContainText(order, {timeout: 15_000})  

  await expect(page.getByText('APROVADO')).toBeVisible()

})

test('deve exibir mensagem quando o pedido não é encontrado', async ({page})=> {

  // Teste Data
  const order = 'VLO-ABC123'

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByTestId('search-order-id').fill(order)
  await page.getByTestId('search-order-button').click()

  //await expect(page.locator('#root')).toContainText('Pedido não encontrado');
  //await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');

  //const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
  //await expect(title).toBeVisible()

  //const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
  //await expect(message).toBeVisible()

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `)

})