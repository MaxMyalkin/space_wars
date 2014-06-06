define(['classy',
        'game/audio',
        'game/objects/resource',
        'game/arrays',
        'preload',
        'soundjs'
    ],
    function(Class,
        Sound,
        Resource,
        ResourceArray,
        Loader,
        SoundJS
    ) {
        var resources = Class.$extend({
            __init__: function() {
                var bangSound = this.DJCheckTheSoundTitle(["/sounds/boom.ogg", "/sounds/boom.mp3", "/sounds/boom.wav"]);
                var attackSound = this.DJCheckTheSoundTitle(["/sounds/attack.ogg", "/sounds/attack.mp3", "/sounds/attack.wav"]);
                var reloadSound = this.DJCheckTheSoundTitle(["/sounds/reload.ogg", "/sounds/reload.mp3", "/sounds/reload.wav"]);
                var bonusSound = this.DJCheckTheSoundTitle(["/sounds/bonus.ogg", "/sounds/bonus.mp3", "/sounds/bonus.wav"]);
                var filesToLoad = [{
                    id: "smallAsteroid",
                    src: "/images/asteroid/smallAsteroid.png"
                }, {
                    id: "mediumAsteroid",
                    src: "/images/asteroid/mediumAsteroid.png"
                }, {
                    id: "bigAsteroid",
                    src: "/images/asteroid/bigAsteroid.png"
                }, {
                    id: "smallDamaged",
                    src: "/images/asteroid/smallDamaged.png"
                }, {
                    id: "mediumDamaged",
                    src: "/images/asteroid/mediumDamaged.png"
                }, {
                    id: "bigDamaged",
                    src: "/images/asteroid/bigDamaged.png"
                }, {
                    id: "firstDirect",
                    src: "/images/ship/first/direct.png"
                }, {
                    id: "firstLeft",
                    src: "/images/ship/first/left.png"
                }, {
                    id: "firstRight",
                    src: "/images/ship/first/right.png"
                }, {
                    id: "secondDirect",
                    src: "/images/ship/second/direct.png"
                }, {
                    id: "secondLeft",
                    src: "/images/ship/second/left.png"
                }, {
                    id: "secondRight",
                    src: "/images/ship/second/right.png"
                }, {
                    id: "firstTypeShip",
                    src: "/images/ship/first/info.png"
                }, {
                    id: "secondTypeShip",
                    src: "/images/ship/second/info.png"
                }, {
                    id: "bullet",
                    src: "/images/bullet/bullet.png"
                }, {
                    id: "secondTypeBonus",
                    src: "/images/bullet/secondbonus.png"
                }, {
                    id: "firstTypeBonus",
                    src: "/images/bullet/firstbonus.png"
                }, {
                    id: "secondAndThirdBulletArray",
                    src: "/images/bullet/rocket.png"
                }, {
                    id: "firstBulletArray",
                    src: "/images/bullet/rocket2.png"
                }, {
                    id: "bang1",
                    src: "/images/bang/bang1.png"
                }, {
                    id: "bang2",
                    src: "/images/bang/bang2.png"
                }, {
                    id: "bang3",
                    src: "/images/bang/bang3.png"
                }, {
                    id: "bangSound",
                    src: bangSound
                }, {
                    id: "attackSound",
                    src: attackSound
                }, {
                    id: "reloadSound",
                    src: "/sounds/reload.mp3"
                }, {
                    id: "bonusSound",
                    src: "/sounds/bonus.mp3"
                }];
                this.loaded = false;

                this.error = false;
                this.array = [];
                //radius, src , isAnimation , dx , dy , speed , width , height , singleAnimation , frames

                this.queue = new Loader.LoadQueue();
                this.queue.installPlugin(SoundJS.Sound);
                this.queue.on("complete", this.handleComplete, this);
                this.queue.on("progress", function(event) {
                    $('.loader').val(Math.floor(event.loaded * 100));
                    $('#loadingPercent').html(Math.floor(event.loaded * 100) + '%');

                }, this);
                this.queue.on("error", function(event) {
                    $('#gameOver').hide();
                    $('#loadingForm').hide();
                    $('#game').show();
                    $('#gameDiv').hide();
                    $('#errorForm').show();
                    $('#error').html("Can't load " + event.item.type + " " + event.item.id + "." + event.item.ext);

                    this.queue.reset();
                }, this);

                this.queue.loadManifest(filesToLoad);
            },

            //Анимированные ресурсы
            get: function(resource) {
                return this.arrays.getCurrent(resource);
            },

            handleComplete: function() {
                //this.attackSound = this.queue.getResult("attackSound");//this.DJCheckTheSound(["/sounds/attack.ogg", "/sounds/attack.mp3", "/sounds/attack.wav"]);
                //this.bangSound = this.queue.getResult("bangSound"); //this.DJCheckTheSound(["/sounds/attack.ogg", "/sounds/attack.mp3", "/sounds/attack.wav"]);
                $('#loadingForm').hide();
                this.smallAsteroid = new Resource(23, this.queue.getResult("smallAsteroid"), false, 0, 2);
                this.bigAsteroid = new Resource(47, this.queue.getResult("bigAsteroid"), false, 0, 0);
                this.mediumAsteroid = new Resource(40, this.queue.getResult("mediumAsteroid"), false, 0, 0);
                this.bigAsteroidDamaged = new Resource(47, this.queue.getResult("bigDamaged"), false, 0, 0);
                this.mediumAsteroidDamaged = new Resource(40, this.queue.getResult("mediumDamaged"), false, 0, 0);
                this.smallAsteroidDamaged = new Resource(23, this.queue.getResult("smallDamaged"), false, 0, 2);


                this.enemy = new Resource(40, this.queue.getResult("mediumDamaged"), false, 0, 0);
                this.enemyRocket = new Resource(23, this.queue.getResult("smallAsteroid"), false, 0, 2);

                this.player = [
                    [
                        new Resource(47, this.queue.getResult("firstDirect"), true, 0, 20, 0.3, 95, 100, false, [0, 1, 2, 3], true),
                        new Resource(47, this.queue.getResult("firstLeft"), true, 0, 20, 0.3, 95, 100, false, [0, 1, 2, 3], true),
                        new Resource(47, this.queue.getResult("firstRight"), true, 0, 20, 0.3, 95, 100, false, [0, 1, 2, 3], true)
                    ],
                    [
                        new Resource(73, this.queue.getResult("secondDirect"), true, 0, 20, 0.3, 146, 174, false, [0, 1, 2, 3, 4, 3, 2, 1], true),
                        new Resource(73, this.queue.getResult("secondLeft"), true, 0, 20, 0.3, 146, 174, false, [0, 1, 2, 3, 4, 3, 2, 1], true),
                        new Resource(73, this.queue.getResult("secondRight"), true, 0, 20, 0.3, 146, 174, false, [0, 1, 2, 3, 4, 3, 2, 1], true)
                    ]
                ];

                this.firstTypeBonus = new Resource(20, this.queue.getResult("firstTypeBonus"), false, 10, -5);
                this.secondTypeBonus = new Resource(20, this.queue.getResult("secondTypeBonus"), false, 10, 0);
                this.bullet = new Resource(20, this.queue.getResult("bullet"), false, 10, 0);

                this.firstTypeShip = new Resource(20, this.queue.getResult("firstTypeShip"), false, 10, -5);
                this.secondTypeShip = new Resource(20, this.queue.getResult("secondTypeShip"), false, 10, 0);

                //OGG, MP3, WAV

                this.arrays = ResourceArray;

                this.arrays.set("firstTypeBullet", 12, this.queue.getResult("firstBulletArray"), true, 0, -2, 0.3, 20, 50, false, [4, 5, 6, 7], false, 5);
                this.arrays.set("secondTypeBullet", 12, this.queue.getResult("secondAndThirdBulletArray"), true, -2, 0, 0.3, 20, 50, false, [0, 1, 2, 3], false, 5);
                this.arrays.set("thirdTypeBullet", 12, this.queue.getResult("secondAndThirdBulletArray"), true, -2, 0, 0.3, 20, 50, false, [4, 5, 6, 7], false, 5);

                this.arrays.set("firstTypeBang", 46, this.queue.getResult("bang1"), true, 0, 0, 0.5, 96, 94, true, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], true, 5);
                this.arrays.set("secondTypeBang", 32, this.queue.getResult("bang2"), true, 0, 0, 0.4, 81, 62, true, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true, 5);
                this.arrays.set("thirdTypeBang", 50, this.queue.getResult("bang3"), true, 0, 0, 0.4, 93, 100, true, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], true, 5);
                this.loaded = true;
                $('#loadingFrom').hide();
                $.event.trigger({
                    type: "createGame",
                    resource: this
                });

            },

            DJCheckTheSoundTitle: function(soundsArray) {
                var audio = new Audio();
                var types = ['audio/ogg', 'audio/mp3', 'audio/wav'];
                for (var i = 0; i < types.length; i++) {
                    if (audio.canPlayType(types[i]) == "probably") return soundsArray[i];
                }
                for (var i = 0; i < types.length; i++) {
                    if (audio.canPlayType(types[i]) == "maybe") return soundsArray[i];
                }
                return soundsArray[0];

            }
        });



        return resources;

    });