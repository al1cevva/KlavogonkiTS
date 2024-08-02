import {AbstractPage} from "./AbstractPage";
import {Locator, Page} from "@playwright/test";
import {lettersMap} from "../utils/lettersMap";

export class QuickGamePage extends AbstractPage{
    readonly startGameBtn: Locator;
    readonly closeRulesBtn: Locator;
    readonly highlightedText: Locator;
    readonly afterFocus: Locator;
    readonly textInput: Locator;
    readonly speedResult: Locator;

    constructor(page: Page) {
        super(page);
        this.startGameBtn = page.getByText('Начать игру');
        this.closeRulesBtn = page.locator('//*[@id="howtoplay"]//*[@value="Закрыть"]');

        this.highlightedText = page.locator('//*[@id="typefocus"]');
        this.afterFocus = page.locator('//*[@id="afterfocus"]');
        this.textInput = page.locator('//*[@id="typeplayblock"]//input[@type="text"]');

        this.speedResult = page.locator('//div[@class="player you ng-scope"]//div[@class="stats"]/div[2]/span[1]');
    }

    async goto(url: string){
        await this.page.goto(url);
    }

    async closeRules() {
        await this.closeRulesBtn.click();
    }

    async startGame(){
        if(await this.startGameBtn.isVisible()){
            await this.startGameBtn.click();
        }
    }

    async insertText(){
        do{
            const highlight = await this.highlightedText.innerText({timeout: 40_000});
            const aftertext = await this.afterFocus.innerText();
            const preparedText = highlight
                .split('')
                .map(letter => lettersMap[letter] ?? letter)
                .join('');
            await this.textInput.pressSequentially(preparedText);
            if(aftertext == '.'){
                await this.textInput.press('.');
                break;
            }
            await this.textInput.press('Space');
        } while(await this.highlightedText.isVisible());
    }

    async getResult() {
        const res = await this.speedResult.textContent();
        console.log(res);
    }
}