import { Page, Locator, expect,TestInfo } from "@playwright/test";
import { fail } from "node:assert";
import { promises as fs } from "fs";
import test from "node:test";

export class basePage{
    private readonly page:Page;
    private testInfo:TestInfo | undefined
    // private fileContent: string = 'Hello, World!\nThis is some data entered into the file.';
    constructor(page:Page, testInfo?: TestInfo){
        this.page = page;
        this.testInfo = testInfo
    }

    setTestInfo(testInfo: TestInfo): void {
        this.testInfo = testInfo;
    }



async writeDataToFile(outputFilePath:string,fileContent:string): Promise<void> {
  try {
    await fs.appendFile(outputFilePath, fileContent + '\n', 'utf8'); // Append to the file on a new line
    console.log(`Text successfully written to ${outputFilePath}`);
  } catch (error) {
    console.error('An error occurred while writing to the file:', error);
  }
}

async navigate(baseURL:string):Promise<void>{
    try {
        if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`navigating to the url : ${baseURL}`)
        }
        console.log(`navigating to the url : ${baseURL}`)
        await this.page.goto(baseURL, {waitUntil:'domcontentloaded'});
        console.log(`navigated to the url : ${baseURL}`)}
    catch {
        const testname = this.testInfo?.title || "unknown"
        console.log(testname)
        if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`${baseURL} not loaded properly`)
        }
        console.log(`${baseURL} not loaded properly`)
        fail("url not launched")
    }
}

async click(locator:Locator):Promise<void>{
    try{
    if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`clicking element : ${locator}`)
        }
    console.log(`clicking element : ${locator}`)
    await locator.click();
    console.log(`clicked element : ${locator}`)}
    catch{
        if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`unable to click ${locator}`)
        }
        console.log(`unable to click ${locator}`)
        fail("locator not found")
    }
}
async fill(locator:Locator,text:string):Promise<void>{
    try {
    if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`element ${locator} filled with ${text}`)
        }
    console.log(`waiting for element ${locator}`)
    await locator.fill(text);
    console.log(`element ${locator} filled with ${text}`)
    }
    catch {
        if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`unable to find ${locator}`)
        }
        console.log(`unable to find ${locator}`)
        fail("locator not found")
    }
}

async wait_for_element(locator:Locator):Promise<void>{
    try {
    if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`waiting for element : ${locator}`)
        }
    console.log(`waiting for element : ${locator}`)
    await locator.waitFor({state:"visible"})
    if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`element found : ${locator}`)
        }
    console.log(`element found : ${locator}`)
    }
    catch {
        if (this.testInfo) {
            const testname = this.testInfo.title
            await this.writeDataToFile(`./test-results/${testname}.log`,`unable to find ${locator}`)
        }
        console.log(`unable to find ${locator}`)
    }
}

}