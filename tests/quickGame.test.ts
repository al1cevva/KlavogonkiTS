import {MenuPage} from "../pages/MenuPage";
import {QuickGamePage} from "../pages/QuickGamePage";
import {test, expect} from "@playwright/test"

test.beforeEach(async({page})=> {
    const menuPage = new MenuPage(page);
    await menuPage.goto('https://klavogonki.ru/');
    await menuPage.quickStart.click();
})

test('Quick game test', async({page})=> {
    test.setTimeout(2 * 30_000)
    const quickGame = new QuickGamePage(page);
    //Check for rules window
    await quickGame.closeRules();
    //Start game
    await quickGame.startGame();
    //Insert text
    await quickGame.insertText();
    //Check results
    await quickGame.getResult();
})