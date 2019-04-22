
require('dotenv').config()


require("chromedriver");
const { By } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
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
        let eyes;

        beforeAll( async () => {
            try {
                driver = new webdriver.Builder()
                    .withCapabilities(webdriver.Capabilities.chrome())
                    .build()
                    
                eyes = new Eyes();

                // obtain the batch name and ID from the environment variables
                const batchName =  process.env.APPLITOOLS_BATCH_NAME;
                const batchId   = process.env.APPLITOOLS_BATCH_ID;

                //  set the batch
                eyes.setBatch(batchName,batchId,0); 

                const apiKey = process.env.APPLITOOLS_API_KEY;
                eyes.setApiKey(apiKey);
                await eyes.open(driver, "Jest,Travis,React", "initial test" ); //driver, app name, test name
                await driver.get("file:///Users/nicklee/Documents/nickleehampshire/applitoolsCI/build/index.html")      


            } catch(err){
                // fail entire test?
                console.error(err);
            }
        })

        afterAll( async() => {
            await eyes.close(false);
            await driver.quit();
            await eyes.abortIfNotClosed();

        })

        it("look the same", async () => {
            const result = await eyes.checkWindow("first check").then(function(result){console.log('data:',result); return result});
    
            const isItTheSame = result.MatchResult._asExpected;
            expect(isItTheSame).toBeTruthy();
    
        })

      
    })
}

//UITest()

console.log(process.env.APPLITOOLS_API_KEY)