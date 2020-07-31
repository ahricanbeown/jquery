;
(function(e, undefined) {
    //自定义构造函数
    let jQuery = function(el) {
            return new jQuery.init(el)
        }
        //静态方法
    jQuery.init = function(el) {
        let els = document.querySelectorAll(el)
        els.forEach((item, index) => {
            //this指向实例对象：例如obj1
            this[index] = item
        })
        this.length = els.length
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
    //原型方法
    jQuery.init.prototype = {
            css: function(cssAttr, cssValue) {
                if (arguments.length == 2) {
                    for (var i = 0; i < this.length; i++) {
                        this[i].style[cssAttr] = cssValue;
                    }
                } else if (arguments.length == 1) {
                    //(元素，样式名)
                    return getStyle(this[0], attr);
                }
                return this;
            },
            attr: function(attrName, attrValue) {
                if (arguments.length == 2) {
                    for (var i = 0; i < this.length; i++) {
                        this[i].setAttribute(attrName, attrValue);
                    }
                } else if (arguments.length == 1) {
                    return this[0].getAttribute(attrName);
                }
                return this;
            },
            //function+callback
            get: function(url, params, callback) {
                const xhr = new XMLHttpRequest
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            callback(JSON.parse(xhr.responseText))
                        } else {
                            alert(xhr.status)
                        }
                    }
                }
                xhr.open('get', `${url}?${params}`)
                xhr.send(null)
            },
            //function+promise
            axios: function(url, params) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                resolve(JSON.parse(xhr.responseText))
                            } else {
                                reject(xhr.status)
                            }
                        }
                    }
                    xhr.open('get', `${url}?${params}`)
                    xhr.send(null)
                })
            },
            addClass: function(classname) {
                var addClass = classname.split(' ');
                var oldClass = [];
                var newClass = null;
                for (var i = 0; i < this.length; i++) {
                    oldClass = this[i].className.split(' ');
                    for (var j = 0; j < addClass.length; j++) {
                        if (!(inArray(addClass[j], oldClass))) {
                            oldClass.push(addClass[j])
                        }
                    }
                    newClass = oldClass.join(' ');
                    this[i].className = newClass;
                }

                function inArray(obj, arr) {
                    for (var i = 0; i < arr.length; i++) {
                        if (obj == arr[i]) {
                            return true
                        }
                    }
                    return false
                }
                return this;
            },
            removeClass: function(classname) {
                var addClass = classname.split(' ');
                var oldClass = [];
                var newClass = null;
                var indexClass = null;
                for (var i = 0; i < this.length; i++) {
                    oldClass = this[i].className.split(' ');
                    for (var j = 0; j < addClass.length; j++) {
                        if (inArray(addClass[j], oldClass)) {
                            indexClass = oldClass.indexOf(addClass[j])
                            oldClass.splice(indexClass, 1)
                        }
                    }
                    newClass = oldClass.join(' ');
                    this[i].className = newClass;
                }

                function inArray(obj, arr) {
                    for (var i = 0; i < arr.length; i++) {
                        if (obj == arr[i]) {
                            return true
                        }
                    }
                    return false
                }
                return this;
            }
        }
        //将jQuery这个函数暴露到全局对象window上，供外部使用
    window.jQuery = window.$ = jQuery
})(window)