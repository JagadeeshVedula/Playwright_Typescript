import {test as base,expect} from "@playwright/test";
import { loginPage } from "../pages";

type customFixtures={
    login : loginPage;
}


export const test = base.extend<customFixtures>({

    login : async({page},use, testInfo)=>{

        const login = new loginPage(page);
        login.setTestInfo(testInfo);
        await use(login);

    }

})
export {expect};