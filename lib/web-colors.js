'use strict';

module.exports = {

    hsl: function(color) {
        return getColor(color);
    },

    hue: function(color) {
        color = getColor(color);

        if (color) {
            color = parseInt(color.match(/[0-9]+/g)[0]);
        }
        return color;
    },

    saturation: function(color) {
        color = getColor(color);

        if (color) {
            color = parseInt(color.match(/[0-9]+/g)[1]);
        }
        return color;
    },

    lightness: function(color) {
        color = getColor(color);

        if (color) {
            color = parseInt(color.match(/[0-9]+/g)[2]);
        }
        return color;
    }
};

function getColor(color) {
    var colors = {
        aliceblue: 'hsl(208, 100%, 97%)',
        antiquewhite: 'hsl(34, 78%, 91%)',
        aqua: 'hsl(180, 100%, 50%)',
        aquamarine: 'hsl(160, 100%, 75%)',
        azure: 'hsl(180, 100%, 97%)',
        beige: 'hsl(60, 56%, 91%)',
        bisque: 'hsl(33, 100%, 88%)',
        black: 'hsl(0, 0%, 0%)',
        blanchedalmond: 'hsl(36, 100%, 90%)',
        blue: 'hsl(240, 100%, 50%)',
        blueviolet: 'hsl(271, 76%, 53%)',
        brown: 'hsl(0, 59%, 41%)',
        burlywood: 'hsl(34, 57%, 70%)',
        cadetblue: 'hsl(182, 25%, 50%)',
        chartreuse: 'hsl(90, 100%, 50%)',
        chocolate: 'hsl(25, 75%, 47%)',
        coral: 'hsl(16, 100%, 66%)',
        cornflowerblue: 'hsl(219, 79%, 66%)',
        cornsilk: 'hsl(48, 100%, 93%)',
        crimson: 'hsl(348, 83%, 58%)',
        cyan: 'hsl(180, 100%, 50%)',
        darkblue: 'hsl(240, 100%, 27%)',
        darkcyan: 'hsl(180, 100%, 27%)',
        darkgoldenrod: 'hsl(43, 89%, 38%)',
        darkgray: 'hsl(0, 0%, 66%)',
        darkgrey: 'hsl(0, 0%, 66%)',
        darkgreen: 'hsl(120, 100%, 20%)',
        darkkhaki: 'hsl(56, 38%, 58%)',
        darkmagenta: 'hsl(300, 100%, 27%)',
        darkolivegreen: 'hsl(82, 39%, 30%)',
        darkorange: 'hsl(33, 100%, 50%)',
        darkorchid: 'hsl(280, 61%, 50%)',
        darkred: 'hsl(0, 100%, 27%)',
        darksalmon: 'hsl(15, 72%, 70%)',
        darkseagreen: 'hsl(120, 25%, 65%)',
        darkslateblue: 'hsl(248, 39%, 39%)',
        darkslategray: 'hsl(180, 25%, 25%)',
        darkslategrey: 'hsl(180, 25%, 25%)',
        darkturquoise: 'hsl(181, 100%, 41%)',
        darkviolet: 'hsl(282, 100%, 41%)',
        deeppink: 'hsl(328, 100%, 54%)',
        deepskyblue: 'hsl(195, 100%, 50%)',
        dimgray: 'hsl(0, 0%, 41%)',
        dimgrey: 'hsl(0, 0%, 41%)',
        dodgerblue: 'hsl(210, 100%, 56%)',
        firebrick: 'hsl(0, 68%, 42%)',
        floralwhite: 'hsl(40, 100%, 97%)',
        forestgreen: 'hsl(120, 61%, 34%)',
        fuchsia: 'hsl(300, 100%, 50%)',
        gainsboro: 'hsl(0, 0%, 86%)',
        ghostwhite: 'hsl(240, 100%, 99%)',
        gold: 'hsl(51, 100%, 50%)',
        goldenrod: 'hsl(43, 74%, 49%)',
        gray: 'hsl(0, 0%, 50%)',
        green: 'hsl(120, 100%, 25%)',
        greenyellow: 'hsl(84, 100%, 59%)',
        grey: 'hsl(0, 0%, 50%)',
        honeydew: 'hsl(120, 100%, 97%)',
        hotpink: 'hsl(330, 100%, 71%)',
        indianred: 'hsl(0, 53%, 58%)',
        indigo: 'hsl(275, 100%, 25%)',
        ivory: 'hsl(60, 100%, 97%)',
        khaki: 'hsl(54, 77%, 75%)',
        lavender: 'hsl(240, 67%, 94%)',
        lavenderblush: 'hsl(340, 100%, 97%)',
        lawngreen: 'hsl(90, 100%, 49%)',
        lemonchiffon: 'hsl(54, 100%, 90%)',
        lightblue: 'hsl(195, 53%, 79%)',
        lightcoral: 'hsl(0, 79%, 72%)',
        lightcyan: 'hsl(180, 100%, 94%)',
        lightgoldenrodyellow: 'hsl(60, 80%, 90%)',
        lightgray: 'hsl(0, 0%, 83%)',
        lightgrey: 'hsl(0, 0%, 83%)',
        lightgreen: 'hsl(120, 73%, 75%)',
        lightpink: 'hsl(351, 100%, 86%)',
        lightsalmon: 'hsl(17, 100%, 74%)',
        lightseagreen: 'hsl(177, 70%, 41%)',
        lightskyblue: 'hsl(203, 92%, 75%)',
        lightslategray: 'hsl(210, 14%, 53%)',
        lightslategrey: 'hsl(210, 14%, 53%)',
        lightsteelblue: 'hsl(214, 41%, 78%)',
        lightyellow: 'hsl(60, 100%, 94%)',
        lime: 'hsl(120, 100%, 50%)',
        limegreen: 'hsl(120, 61%, 50%)',
        linen: 'hsl(30, 67%, 94%)',
        maroon: 'hsl(0, 100%, 25%)',
        mediumaquamarine: 'hsl(160, 51%, 60%)',
        mediumblue: 'hsl(240, 100%, 40%)',
        mediumorchid: 'hsl(288, 59%, 58%)',
        mediumpurple: 'hsl(260, 60%, 65%)',
        mediumseagreen: 'hsl(147, 50%, 47%)',
        mediumslateblue: 'hsl(249, 80%, 67%)',
        mediumspringgreen: 'hsl(157, 100%, 49%)',
        mediumturquoise: 'hsl(178, 60%, 55%)',
        mediumvioletred: 'hsl(322, 81%, 43%)',
        midnightblue: 'hsl(240, 64%, 27%)',
        mintcream: 'hsl(150, 100%, 98%)',
        mistyrose: 'hsl(6, 100%, 94%)',
        moccasin: 'hsl(38, 100%, 85%)',
        navajowhite: 'hsl(36, 100%, 84%)',
        navy: 'hsl(240, 100%, 25%)',
        oldlace: 'hsl(39, 85%, 95%)',
        olive: 'hsl(60, 100%, 25%)',
        olivedrab: 'hsl(80, 60%, 35%)',
        orange: 'hsl(39, 100%, 50%)',
        orangered: 'hsl(16, 100%, 50%)',
        orchid: 'hsl(302, 59%, 65%)',
        palegoldenrod: 'hsl(55, 67%, 80%)',
        palegreen: 'hsl(120, 93%, 79%)',
        paleturquoise: 'hsl(180, 65%, 81%)',
        palevioletred: 'hsl(340, 60%, 65%)',
        papayawhip: 'hsl(37, 100%, 92%)',
        peachpuff: 'hsl(28, 100%, 86%)',
        peru: 'hsl(30, 59%, 53%)',
        pink: 'hsl(350, 100%, 88%)',
        plum: 'hsl(300, 47%, 75%)',
        powderblue: 'hsl(187, 52%, 80%)',
        purple: 'hsl(300, 100%, 25%)',
        red: 'hsl(0, 100%, 50%)',
        rosybrown: 'hsl(0, 25%, 65%)',
        royalblue: 'hsl(225, 73%, 57%)',
        saddlebrown: 'hsl(25, 76%, 31%)',
        salmon: 'hsl(6, 93%, 71%)',
        sandybrown: 'hsl(28, 87%, 67%)',
        seagreen: 'hsl(146, 50%, 36%)',
        seashell: 'hsl(25, 100%, 97%)',
        sienna: 'hsl(19, 56%, 40%)',
        silver: 'hsl(0, 0%, 75%)',
        skyblue: 'hsl(197, 71%, 73%)',
        slateblue: 'hsl(248, 53%, 58%)',
        slategray: 'hsl(210, 13%, 50%)',
        slategrey: 'hsl(210, 13%, 50%)',
        snow: 'hsl(0, 100%, 99%)',
        springgreen: 'hsl(150, 100%, 50%)',
        steelblue: 'hsl(207, 44%, 49%)',
        tan: 'hsl(34, 44%, 69%)',
        teal: 'hsl(180, 100%, 25%)',
        thistle: 'hsl(300, 24%, 80%)',
        tomato: 'hsl(9, 100%, 64%)',
        turquoise: 'hsl(174, 72%, 56%)',
        violet: 'hsl(300, 76%, 72%)',
        wheat: 'hsl(39, 77%, 83%)',
        white: 'hsl(0, 100%, 100%)',
        whitesmoke: 'hsl(0, 0%, 96%)',
        yellow: 'hsl(60, 100%, 50%)',
        yellowgreen: 'hsl(80, 61%, 50%)'
    };

    if(color in colors) {
        return colors[color];
    }
    return null;
}
