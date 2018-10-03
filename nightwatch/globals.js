/* reporter */
var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
openBrowser: false,
reportsDirectory: __dirname + '/reports/'
});

/* variables */
module.exports = {
    reporter: reporter.fn,  
    gmail:{
       values:{
        user1Login: 'kcqa1a@gmail.com',
        user1Pass: '',
        user2Login: 'kcqa1b@gmail.com',
        user2Pass: '',
       }       
    },    
};