var values = require('./values');

module.exports = {
    commands: {
        slumpvard: function () {
            console.log("Slumpvard command triggered");
            // there are 22 unlabeled images, used for vards without specific image
            var numRndImg = 22;
            var rndIndex = Math.floor(Math.random() * values.vards.length) + 1;
            var vard = values.vards[rndIndex];
            var vardImg = vard.image
                ? vard.name.toLowerCase().replace(/å/g, "a").replace(/ä/g, "a").replace(/ö/g, "o")
                : "slump/slump_" + (Math.floor(Math.random() * numRndImg) + 1);
            return {
                'response_type': 'in_channel',
                'attachments': [{
                    title: "slumpvard.se",
                    title_link: "http://slumpvard.se",
                    text: vard.name + "vard",
                    image_url: "http://slumpvard.se/img/" + vardImg + ".jpg",
                    color: "#000",
                    fallback: "Image of " + vard.name + "vard"
                }]
            };
        }
    }
};
