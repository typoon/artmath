function my_include(path) {
    var s = document.createElement('script');
    s.src = path;
    document.body.appendChild(s);
}
