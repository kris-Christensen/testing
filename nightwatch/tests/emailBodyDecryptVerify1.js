module.exports = {

	"Email Body Decrypt Verification" : function (browser)
	{
        var globals = browser.globals;
        var emailSubject = 'virtru test email 1018-2';       
        var emailBody = 'This is the email body for an automated test.';


		function login() {
            browser
            .useCss()
            .url('http://mail.google.com')
            
            //Entering User Info
            .waitForElementVisible('#headingText', 5000)
            .assert.containsText('#headingText', 'Sign in', 'See Sign in')
            .pause(1000)
            .setValue ('#identifierId', globals.gmail.values.user2Login)
            .click ('#identifierNext')
            .pause(500)

            //Entering User Password
            .waitForElementVisible('#headingText', 5000)
            .assert.containsText ('#headingText', 'Welcome', 'See Welcome')
            .pause(5000)
            .setValue ('input[type=password]', globals.gmail.values.user2Pass)
            .click ('#passwordNext')
            .pause(5000)
            ;
        }
        
        function findEmail() {
            browser
            .useCss()
                     
            //Verify that we logged in and proceeded to next screen
            .waitForElementVisible('div[role=main]', 5000)
            .assert.elementPresent('div[role=tabpanel]', 'See email rows')
            .pause(1000)

            //Verify email present
            .assert.containsText('div[role=tabpanel]', emailSubject, 'See the test email!')
            .pause(1000)

            //Click on correct email
            .useXpath()
            .click('.//div/div/div/span[contains(.,"' + emailSubject + '")]')
            .pause(1000)
            ;
        }
        
        function unlockEmail() {
            browser
            .useXpath()
                     
            //Verify email present
            .assert.containsText('.//div/h2[contains(.,"' + emailSubject + '")]', emailSubject, 'See the test email again!')
            .pause(1000)

            //Click on correct email
            .useXpath()
            .click('.//a[contains(.,"Unlock Message")]')
            .pause(2000) 
            ;
        }

        
        function switchW(){
            browser

            //switch windows
            .windowHandles(function(result){
                var origWindow = result.value[0];
                var popupWindow = result.value[1];
                browser.switchWindow(popupWindow)
                .pause(1000);
            });
        }

        function proceedVirtru() {
            browser      
            .useCss()
            //Verify and click
            .assert.urlContains('secure.virtru.com')
            .waitForElementVisible('div[id=content]', 15000, 'Nearly there!')
            .useXpath()
            .click('.//a[contains(.,"kcqa1b@gmail.com")]')

            //Verify you advanced to page
            .useCss()
            .assert.elementPresent ('div[class*=login-auth-choice-view]', 'On options page')
            .click('a span[class=oauth-provider-google]')
            .pause(5000)
            ;
        }

        function readEmail() {
            browser      
            .useCss()
            //View opened email and compare
            .waitForElementPresent('#email-layout', 5000, 'See opened email')           
            .waitForElementVisible('#tdf-body', 15000, 'See body')
            .assert.containsText('#tdf-body', emailBody, 'See the email body text')
            ;
        }

        function tearDown(){
            browser
            .closeWindow()
            .closeWindow()
            .end();
        }

        login();
        findEmail();
        unlockEmail();
        switchW();
        proceedVirtru();
        readEmail();
        tearDown();
	}
};
