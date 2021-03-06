define(function(){
    var validate = {
        isNull: function(data){
            return typeof data === 'undefined' || data == undefined;
        },
        isMobile: function(phone){
            return /^((\(\d{3}\))|(\d{3}\-))?1(3|4|5|7|8)\d{9}$/.test(phone.toString().trim());
        },
        isEmptyStr: function(val){
            return $.type(val) !== 'string' || !val.trim().length;
        },
        isValidPassword: function(password){
            return !this.isEmptyStr(password) && password.trim().length >= 6;
        },
        isEqual: function(a, b){
            return a === b || a == b;
        },
        /**
         * 身份证号, 驾驶证号
         * @param idcard
         * @returns {*}
         */
        isIdCard: function(idcard) {
            var Errors = new Array(true, false, false, false, false); //请输入正确的身份证号码2012-9-19
            var area = {
                11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
                21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
                33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
                41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
                46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南",
                54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
                65: "xinjiang", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
            };
            var Y, JYM;
            var S, M;
            var idcard_array = [];
            idcard_array = idcard.split("");
            if (area[parseInt(idcard.substr(0, 2))] === null) return Errors[4];
            switch (idcard.length) {
                case 18:
                    if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
                        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
                    } else {
                        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
                    }
                    if (ereg.test(idcard)) {
                        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";
                        JYM = "10X98765432";
                        M = JYM.substr(Y, 1);
                        if (M.toUpperCase() == idcard_array[17].toUpperCase())
                            return Errors[0];
                        else
                            return Errors[3];
                    } else
                        return Errors[2];
                    break;
                default:
                    return Errors[1];
            }
        },

        /**
         * html element
         *
         * @param el
         * @returns {*|boolean|Function|Node}
         */
        isHtmlElement: function(el){
            return el && el.nodeType === 1;
        },

        /**
         * is $ dom
         * @param $el
         * @returns {*|*|boolean|Function|Node}
         */
        isZeptoDom: function($el){
            $el = $($el);

            return $el.length && this.isHtmlElement($el[0]);
        },

        /**
         * dom 元素是否显示
         * @param el
         * @returns {boolean}
         */
        isElVisible: function(el){
            el = $(el);

            return !!(el.width() || el.height()) && el.css("display") !== "none"
        },

        isElHidden: function(el){
            return !this.isElVisible(el);
        },

        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            // from jquery
            return !this.isArray(obj) && (obj - parseFloat( obj ) + 1) >= 0;
        }
    };

    ['Function', 'String', 'Object', 'Array', 'Number'].forEach(function (item) {
        validate['is' + item] = function (data) {
            return $.type(data) === item.toLowerCase();
        }
    });

    return validate;
});