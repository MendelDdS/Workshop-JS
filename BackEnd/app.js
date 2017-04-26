var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost/virtusBack-end');

module.exports = app;

var schedule = require('node-schedule');

//TODO choose appropriate crawler execution schedule
var ruleNight = new schedule.RecurrenceRule();
ruleNight.hour = 0;

var ruleDay = new schedule.RecurrenceRule();
ruleDay.hour = 12;

var task1 = schedule.scheduleJob(ruleNight, function () {
    require('./controllers/userCrawler').crawl();
});

var task2 = schedule.scheduleJob(ruleDay, function () {
    require('./controllers/userCrawler').crawl();

})