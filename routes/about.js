var express = require('express');
var router = express.Router();

var path = require('path');
var app = express();

app.use(express.static('public'));



router.get('/', function(req,res){
  res.render('about',{
    hourly: '150',
    day: '800',
    tatRules: '18+ and we do not accept parental consent.',
    pierceRules: 'We only pierce ages 18+. Prices vary by piercing, call shop for details',
    walkIns: 'We accept walk-ins 7 days a week. First come, first served, stop by or call to get an idea of our availability that day.',
    deposits: 'Deposits are required for all appointments. No appointments or quotes will be given over the phone or internet unless you are from out of state. In that case we can take deposit payments via credit card over the phone. Appointments made 3 days or more in advance will receive a phone call to confirm appointment. If we do not hear from you to confirm within 48 hours, your appointment will be put on hold until you contact us to reschedule. Any cancellation or no-show without 48 hours notice will result in forfeiture of deposit.'
  });
});

module.exports = router;