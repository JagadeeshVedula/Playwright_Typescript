import { chromium, defineConfig,devices } from "@playwright/test"
import { on } from "node:cluster"

export default defineConfig({
    testDir : "./tests",
    testMatch : "**/*.spec.ts",
    timeout : 6000,
    retries : 0,
    use : {
        baseURL : "https://thinking-tester-contact-list.herokuapp.com/",
        headless : false,
        screenshot : "on",
        video : "on",
        trace : "on",
        viewport : {width: 1920, height: 1080}

    },
    projects: [{
        name: "chromium",
        use: {
            ...devices["Desktop Chrome"]
        }
    },
    {

        name: "firefox",
        use: {
            ...devices["Desktop Firefox"]
        }
    }
        
    ]


})