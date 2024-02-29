var sum_to_n_a = function(n) {
    var num = 1;
    var result = 1;
    while (num <= n) {
        num += 1;
        result += num;
    }
    return result;
};

var sum_to_n_b = function(n) {
    if (n <= 1) {
        return n;
    } else {
        return n + sum_to_n_b(n - 1);
    }
};

var sum_to_n_c = function(n) {
    const arr = new Array();
    for (var i = 1; i <= n; i++) {
        arr.push(i);
        i++;
    }
    const initialValue = 0;
    const sum = arr.reduce((x, y) => x + y, initialValue);
    return sum;
};