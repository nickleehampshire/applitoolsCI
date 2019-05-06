require('dotenv').config()
require("chromedriver");
const { By } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Eyes, Target, ConsoleLogHandler } = require("@applitools/eyes-selenium");

jest.setTimeout(40000)

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
                const chrome_options  = new chrome.Options()
                chrome_options.addArguments('--headless')
                chrome_options.addArguments('--no-sandbox')
                // chrome_options.addArguments('--disable-dev-shm-usage')

                driver = new webdriver.Builder()
                    .withCapabilities(webdriver.Capabilities.chrome())
                    .setChromeOptions(chrome_options)
                    .build()
                eyesInstance = new Eyes();
                const apiKey = process.env.APPLITOOLS_API_KEY;
                const batchName = null;
                const batchID = process.env.APPLITOOLS_BATCH_ID;

                eyesInstance.setApiKey(apiKey);


                eyesInstance.setBatch(null, batchID );
                await eyesInstance.open(driver, "Jest,Travis,React", "React App with button (testname)" ); //driver, app name, test name
                await driver.get("http://localhost:9000/")
                //await driver.get("file:///Users/nicklee/Documents/nickleehampshire/applitoolsCI/build/index.html")      

            } catch(err){
                // fail entire test?
                console.error(err);
            }
        })

        afterAll( async() => {
            await eyesInstance.close(false);
            await driver.quit();
            await eyesInstance.abortIfNotClosed();


        })

        it("look the same", async () => {
            const result = await eyesInstance.checkWindow("first check").then(function(result){console.log('data:',result); return result});
            const isItTheSame = result._asExpected;
            expect(isItTheSame).toBeTruthy();

        })

        it("should be last test", () => {
            var val = true;
            expect(val).toBe(true)
        })
      
    })
}

UITest()

console.log(process.env.APPLITOOLS_API_KEY)