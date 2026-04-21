import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'

test.describe('Consulta de Pedido', () => {

 
  
  test.beforeEach(async ({page}) => {
     // Arrange
     await page.goto('http://localhost:5173/')
     await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
 
     await page.getByRole('link', { name: 'Consultar Pedido' }).click()
     await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })
  
  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Teste Data
    const order = {
      number: 'VLO-PVBGL5',
      color: 'Lunar White',
      wheels: 'sport Wheels',
      customer: {
        name: 'LUCAS SILVA',
        email: 'lucasrezendelrs@gmail.com'
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByTestId('search-order-id').fill(order.number)
    await page.getByTestId('search-order-button').click()

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: APROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

  })
  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Teste Data
    const order = {
      number: 'VLO-LE2S4L',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'João',
        email: 'joaolrs@gmail.com'
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByTestId('search-order-id').fill(order.number)
    await page.getByTestId('search-order-button').click()

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: REPROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    // Teste Data
    const order = generateOrderCode()

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

})

