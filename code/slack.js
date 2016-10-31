var request = require("request");
var cheerio = require("cheerio");
var Promise = require('q').Promise;
var Nightmare = require('nightmare');
var nightmare = Nightmare();

module.exports = {
    commands: {
        slumpvard: function () {
            console.log("Slumpvard command triggered");
            return Promise.resolve(
                nightmare
                    .goto('http://slumpvard.se')
                    .evaluate(function () {
                        var obj = {};
                        obj.imageName = $('.js-insultVard').text();
                        obj.imageUrl = $('.js-imageVard')
                            .css("background-image");
                        return obj;
                    }))
                .then(function (result) {

                    var myString = result.imageUrl;
                    var myRegexp = /url\("(http.*\.\w+)"\)/g;
                    var match = myRegexp.exec(myString);
                    var url = (match[1]);

                    return {
                        'attachments': [{
                            title: "slumpvard.se",
                            title_link: "http://slumpvard.se",
                            text: result.imageName + "vard",
                            image_url: url,
                            color: "#000",
                            fallback: result.imageName + "vard image"
                        }]
                    };
                }, function (err) {
                    console.error(err); // notice that `throw`ing in here doesn't work
                });
        }
    }
};

// regular scraping
// var imageName = "noname";
// var imageUrl = "https://placeholdit.imgix.net/~text?txtsize=33&txt=SLUMP&w=200&h=100";
//
// request("http://slumpvard.se", function(error, response, body) {
//     var $ = cheerio.load(body);
//
//     var vard;
//     $('.js-insultVard').filter(function() {
//         vard = $(this).text().trim();
//     });
//     console.log(vard);
//
//     // imageName = $('.js-insultVard').text() + "vard";
//     // console("name: " + imageName);
//     //
//     // $('.js-imageVard').each(function(i, element) {
//     // console.log($(this).prev());
//     // console.log($(this).attr());
//     // console.log($(this).css("background-image"));
//     //     imageUrl = $(this).css("background-image");
//     //     console.log(imageUrl);
//     // });
//     //
//     // //var bgImg = $('.js-imageVard').css("background-image");
//     // var imageUrl = bgImg.replace("url(", "").replace(")", "").replace("\'", "").replace("\"", "");
// });
