var checkName = () => {
    var x = document.getElementById('name').value;
    var y = ""
    if (y.length != x.length) return false;
    for (var i = 0; i <= x.length; i++) {
        if (x[i] != y[i]) {
            return false;
        }
    }
    return true;
}

var checkPass = () => {
    var x = document.getElementById('password').value;
    var y = ""
    if (y.length != x.length) return false;
    for (var i = 0; i <= x.length; i++) {
        if (x[i] != y[i]) {
            return false;
        }
    }
    return true;
}

var checkInf = () => {

    if (checkName() & checkPass()) {
        return true;
    }

    return false;
}



    
