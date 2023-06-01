const loadtest = require('loadtest');

const options ={
    url: 'http://localhost:31/posts/test',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    body:{
        "topic":"ee",
        "data":"ee",
        "userID":"1"
    },
    
    maxRequests: 10,
    concurrency: 10,
};

console.log('Testing begun');

loadtest.loadTest(options, function(error, result){
    if (error) {
        return console.error('Error: %s', error);

    }
    console.log('Done Testing');
    console.log(result);

});