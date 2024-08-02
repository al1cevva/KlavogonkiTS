import {AbstractPage} from "./AbstractPage";
import {Locator, Page} from "@playwright/test";

export class MenuPage extends AbstractPage{
    readonly quickStart: Locator;

    constructor(page: Page) {
        super(page);
        this.quickStart = page.getByText('Быстрый старт');
    }

    async goto(url: string){
        await this.page.goto(url);
    }
}