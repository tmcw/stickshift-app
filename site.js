var Stickshift = require('stickshift/stickshift.js');

var database = {
    mysql: require('./databases/mysql.js'),
    pg: require('./databases/pg.js')
};

function showForm(id) {
    var form = id + '-form', tab = id + '-tab';
    var forms = document.body.querySelectorAll('form');
    var tabs = document.body.querySelectorAll('.tabs a');
    var i;
    for (i = 0; i < tabs.length; i++) {
        if (tabs[i].id === tab) {
            tabs[i].classList.add('active');
        } else {
            tabs[i].classList.remove('active');
        }
    }
    for (i = 0; i < forms.length; i++) {
        forms[i].style.display = (forms[i].id === form) ? 'block' : 'none';
    }
}

showForm('mysql');

function $(id) {
    return document.getElementById(id);
}

function closeConfigPage() {
    $('setup').parentNode.removeChild($('setup'));
}

function showError(err) {
    $('error').style.display = 'block';
    $('error').innerHTML = err.toString();
}

$('mysql-connect').onclick = function(e) {
    e.preventDefault();
    var config = {
        user: $('mysql-username').value,
        password: $('mysql-password').value,
        database: $('mysql-database').value,
        host: $('mysql-host').value
    };
    database.mysql(config, function(err, client) {
        if (err) { return showError(err); }
        closeConfigPage();
        Stickshift(document.getElementById('page'), {
          mapboxToken: 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ',
          endpoint: client.query
        });
    });
};

$('pg-connect').onclick = function(e) {
    e.preventDefault();
    var config = $('pg-connectionstring').value;
    database.pg(config, function(err, client) {
        if (err) { return showError(err); }
        closeConfigPage();
        Stickshift(document.getElementById('page'), {
          mapboxToken: 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ',
          endpoint: client.query
        });
    });
};
