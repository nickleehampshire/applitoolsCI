
require('dotenv').config()

require("chromedriver");
const { By } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Eyes, Target, ConsoleLogHandler } = require("@applitools/eyes-selenium");

jest.setTimeout(20000)

function multiply(a,b){
    return a*b;
}

test('multiplies 2 * 2 to equal 4', () => {
    expect(multiply(2,2)).toBe(4)
})

async function UITest(){
    describe("Application should", () => {
        let driver;
        let eyesInstance;

        beforeAll( async () => {
            try {

                // const chrome_options  = new chrome.Options()
                // chrome_options.addArguments('--headless')
                // chrome_options.addArguments('--no-sandbox')
                // chrome_options.addArguments('--disable-dev-shm-usage')
                driver = new webdriver.Builder()
                    .withCapabilities(webdriver.Capabilities.chrome())
                    .build()
                eyesInstance = new Eyes();
                const apiKey = process.env.APPLITOOLS_API_KEY;

                eyesInstance.setApiKey(apiKey);
                await eyesInstance.open(driver, "Jest,Travis,React", "initial test" ); //driver, app name, test name
                await driver.get("file:///Users/nicklee/Documents/nickleehampshire/applitoolsCI/build/index.html")      


            } catch(err){
                // fail entire test?
                console.error(err);
            }
        })

        afterAll( async() => {
            await eyesInstance.close(false);
            await driver.quit();
            //await eyesInstance.abortIfNotClosed();

        })

        it("look the same", async () => {
            const result = await eyesInstance.checkWindow("first check").then(function(result){console.log('data:',result); return result});  //returns { _asExpected: false, _windowId: undefined }
            expect(result._asExpected).toBe(true);
        })

        it("should be last test", () => {
            var val = true;
            expect(val).toBe(true)
        })
      
    })
}

UITest()

console.log(process.env.APPLITOOLS_API_KEY)