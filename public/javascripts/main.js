(function() {

    function status(response) {
        if(response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    function json(response) {
        return response.json()
    }

    // get
    fetch('/users')
        .then(status)
        .then(json)
        .then(function(data) {
            console.log('data received', data);
            //alert(JSON.stringify(data));
        })
        .catch(function(error) {
            console.log('request failed', error);
        })


    // post
    fetch('/users/1/', {
        method : 'post',
        /*
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body : 'name=basil&age=39',
        */
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            name : "Basil",
            age : 39
        }, null, 2),
        credentials : 'include'
    }).then(json)
        .then(function(data) {
            console.log('post response', data)
        })
        .catch(function(error) {
            console.log('post failed', error);
        });


})();