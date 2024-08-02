import {Page} from "@playwright/test";

export abstract class AbstractPage {
    protected page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    abstract  goto(url: string): Promise<void>;
}