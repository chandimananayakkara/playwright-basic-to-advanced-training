import {test, expect} from '@playwright/test'

test.describe('Alerts and Iframes checking', ()=>{

    test('Alerts checking', async ({page})=>{
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts')

        page.on('dialog', async dialog=>{
            console.log(dialog.message)
            await dialog.accept()
        })


        const alertButton = page.getByText('Click for JS Alert')
        // const confirmButton = page.getByText('Click for JS Confirm')
        // const promptButton = page.getByText('Click for JS Prompt')

        await alertButton.click()

        const resultMessage = page.locator('#result')
        await expect(resultMessage).toHaveText('You successfully clicked an alert')
    })

    test('Iframes checking', async ({page})=>{
        await page.goto('https://practice-automation.com/iframes/')

        const iFrame = page.frameLocator('#iframe-1')
        // const docNavLink = iFrame.getByRole('link', {name:'Docs'})
        const searchIcon = iFrame.getByText('Search')

        // await docNavLink.click()
        await searchIcon.click()

        await expect(iFrame.locator('#docsearch-input')).toBeVisible()
        const searchBar = iFrame.locator('#docsearch-input')
        await searchBar.fill('Keyboard')
        await searchBar.press('Enter')

        await expect(iFrame.getByRole('heading', {name:'Keyboard'})).toBeVisible()

       })
})