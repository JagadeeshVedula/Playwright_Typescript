import {Page,Locator} from "@playwright/test";
import { basePage } from "./basePage";

export class loginPage extends basePage{
    private readonly username : Locator;
    private readonly password : Locator;
    private readonly submit : Locator;
    private readonly contactList: Locator;

    constructor(page : Page){
        super(page)
        this.username = page.locator("#email");
        this.password = page.locator("#password");
        this.submit = page.locator("#submit");
        this.contactList = page.locator("//h1[text()='Contact List']")
    }

    async login_to_the_Application(url:string,username:string,password:string):Promise<void>{
        await this.navigate(url)
        await this.wait_for_element(this.username)
        await this.fill(this.username,username)
        await this.fill(this.password,password)
        await this.click(this.submit)
        await this.wait_for_element(this.contactList)
    }
}