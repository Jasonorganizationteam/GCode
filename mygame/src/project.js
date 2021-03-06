require = function t(e, i, n) {
    debugger
    function a(s, o) {
        if (!i[s]) {
            if (!e[s]) {
                var r = "function" == typeof require && require;
                if (!o && r)
                    return r(s, !0);
                if (c)
                    return c(s, !0);
                var h = new Error("Cannot find module '" + s + "'");
                throw h.code = "MODULE_NOT_FOUND",
                    h
            }
            var l = i[s] = {
                exports: {}
            };
            e[s][0].call(l.exports, function(t) {
                var i = e[s][1][t];
                return a(i || t)
            }, l, l.exports, t, e, i, n)
        }
        return i[s].exports
    }
    for (var c = "function" == typeof require && require, s = 0; s < n.length; s++)
        a(n[s]);
    return a
}({
    AccessManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d2381iQH3BCYJ8d+eSa1Jj+", "AccessManager");
            cc.Class({
                extends: cc.Component,
                properties: {
                    game: cc.Node,
                    eventName: "blackglass"
                },
                init: function(t) {
                    this.game = t;
                        this.node.on("touchstart", function(t) {
                            console.log("emit black:" + this.eventName),
                            this.game.dadMng.dadInstance && this.game.dadMng.dadInstance.emit(this.eventName),
                            this.game.momMng.dadInstance && this.game.momMng.dadInstance.emit(this.eventName),
                            this.game.kidMng.dadInstance && this.game.kidMng.dadInstance.emit(this.eventName)
                        }, this)
                },
                start: function() {}
            });
            cc._RF.pop()
    }
        , {}],
    AdultManager: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        cc._RF.push(e, "d9c829djd5OAL0DNFQMgvoq", "AdultManager");
        var a = n(t("util"))
            , c = n(t("Main"));
        cc.Class({
            extends: cc.Component,
            properties: {
                instance: cc.Node,
                tab: cc.Node,
                container: cc.Node,
                checker: cc.Node,
                main: c.default,
                offset_json: null
            },
            onEnable: function() {
                null != this.checker && (this.checker = this.checker.getComponent("OffsetChecker"),
                    this.checker.manager = this)
            },
            onDisable: function() {},
            init: function(t) {
                if (this.main = t,
                        this.initPartTab(),
                        this.initPartNew("hair", {
                            padding: 0,
                            min_scale: .7
                        }),
                    "Male" == this.node.name && this.initPartNew("beard", {
                        padding: 10
                    }),
                        this.initPartNew("face", {
                            padding: 10
                        }),
                        this.initPartNew("body_up", {
                            padding: 0,
                            is_resize: !0,
                            min_scale: .7
                        }),
                        this.initPartNew("body_low", {
                            padding: 0,
                            is_resize: !0,
                            min_scale: .7
                        }),
                    null != this.checker && (this.checker = this.checker.getComponent("OffsetChecker"),
                        this.checker.init(this)),
                    null != this.instance && (this.instance = this.instance.getComponent("Instance"),
                        this.instance.init(this)),
                    null != this.instance && null != this.checker) {
                    var e = this.instance.getOffset(this.checker.type.string);
                    this.checker.setOffset(e)
                }
                this.node.getChildByName("switch").on("touchend", function(t) {
                    t.stopPropagation()
                })
            },
            initPartTab: function() {
                var t = this;
                this.tab = a.default.getChildByPath(this.node, "switch/types"),
                    this.container = a.default.getChildByPath(this.node, "switch/container"),
                    this.tab.children.map(function(e) {
                        e.on("toggle", function(t) {
                            if (null != this.checker && null != this.main.selected_instance) {
                                var i = this.main.selected_instance.getOffset(e.name);
                                this.checker.setRoute(this.node.name),
                                    this.checker.setType(e.name),
                                    this.checker.setSprite(this.main.selected_instance.getSprite(e.name).name),
                                    this.checker.setOffset(i)
                            }
                            this.container.children.map(function(t) {
                                t.name == e.name ? t.active = !0 : t.active = !1
                            }),
                                this.tab.children.map(function(t) {
                                    t.name == e.name ? (t.color = new cc.Color(246,246,246,255),
                                        t.getChildByName("sprite").active = !1,
                                        t.getChildByName("inv").active = !0) : (t.color = new cc.Color(238,238,238,255),
                                        t.getChildByName("sprite").active = !0,
                                        t.getChildByName("inv").active = !1)
                                })
                        }, t)
                    })
            },
            initPartNew: function(t, e) {
                var i = this
                    , n = a.default.getChildByPath(this.node, "switch/container/" + t + "/view/content")
                    , c = "PNG/" + this.node.name + "/" + t
                    , s = a.default.getChildByPath(this.node, "switch/container/" + t + "/loading");
                s.getChildByName("Label").getComponent(cc.Label).string = "?????????",
                    cc.loader.loadResDir(c, cc.SpriteFrame, function(a, c) {
                        if (a)
                            return s.getChildByName("Label").getComponent(cc.Label).string = "????????????????????????",
                                s.once("touchstart", function(n) {
                                    i.initPartNew(t, e)
                                }, i),
                                void console.log(a.message || a);
                        s.active = !1,
                            c.sort(function(t, e) {
                                var i, n, a = t.name, c = e.name;
                                return /^a/.test(a) ? (a = a.substring(1),
                                    i = parseInt(a.split(".")[0]) + 100) : i = parseInt(a.split(".")[0]),
                                    /^a/.test(c) ? (c = c.substring(1),
                                        n = parseInt(c.split(".")[0]) + 100) : n = parseInt(c.split(".")[0]),
                                i - n
                            }),
                            c.reverse(),
                            c.map(function(a) {
                                var c = i.createSpriteNode(a, n, e);
                                c.on("touchend", i.setInstanceSprite(t, c).bind(i), i)
                            })
                    })
            },
            setInstanceSprite: function(t, e) {
                var i = this;
                return function(n) {
                    if (null != i.main.selected_instance && i.main.selected_instance.manager == i) {
                        var a = i.main.selected_instance.getComponent("Instance");
                        if (n.target == e) {
                            var c, s = e.children[0].getComponent(cc.Sprite), o = i.main.offset_json["PNG/" + i.node.name + "/" + t];
                            if (o && o.hasOwnProperty(e.name) && (c = o[e.name]),
                                /face|beard/.test(t) && a.getSprite(t) == s.spriteFrame)
                                return void a.togglePart(t);
                            c ? a.SetPart(t, s.spriteFrame, c) : a.SetPart(t, s.spriteFrame),
                                i.checker.updateJson(),
                                i.checker.setSprite(s.spriteFrame.name),
                                i.checker.setRoute(a.manager.node.name),
                                i.checker.setType(t),
                                i.checker.setOffset(a.getOffset(t))
                        }
                    }
                }
            },
            createSpriteNode: function(t, e, i) {
                var n = new cc.Node("sprite")
                    , a = n.addComponent(cc.Sprite);
                a.spriteFrame = t;
                var c, s = new cc.Node(t.name), o = (i.ratio,
                    i.min_scale), r = i.padding, h = i.is_resize;
                c = (cc.view.getVisibleSize().width - 475) / 3;
                var l = .9;
                s.width = c,
                    s.height = c * l,
                    c -= r = r || 0;
                var d = t.getOriginalSize();
                if (h) {
                    a.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                        l = d.height / d.width;
                    var u;
                    if (d.width > d.height ? (n.width = c,
                            n.height = c * l,
                            u = l) : (n.width = c / l,
                            n.height = c,
                            u = 1 / l),
                        u > o) {
                        var m = o / u;
                        n.width = n.width * m,
                            n.height = n.height * m
                    }
                }
                return s.addChild(n),
                    e.addChild(s),
                    s
            },
            initHair: function() {
                var t = this
                    , e = a.default.getChildByPath(this.node, "switch/container/hair/view/content");
                console.log(this.main.offset_json),
                    cc.loader.loadResDir("PNG/Female/Hair", cc.SpriteFrame, function(i, n) {
                        i ? console.log(i.message || i) : n.map(function(i) {
                            var n = new cc.Node(i.name)
                                , a = new cc.Node("sprite");
                            a.addComponent(cc.Sprite).spriteFrame = i,
                                a.parent = n,
                                e.addChild(n),
                                console.log(n),
                                console.log(i),
                                console.log("Result should be a sprite frame: " + (i instanceof cc.SpriteFrame));
                            var c, s = e.getComponent("cc.Layout");
                            console.log(e.width),
                                console.log(cc.view.getVisibleSize()),
                                console.log(cc.view.getVisibleSizeInPixel());
                            var o = cc.view.getVisibleSize().width;
                            s && (c = (o - 515) / 3);
                            n.width = c,
                                n.height = 1 * c,
                                n.on("touchend", function(t) {
                                    if (null != this.main.selected_instance && this.main.selected_instance.manager == this) {
                                        var e = this.main.selected_instance;
                                        if (console.log("TOUCH"),
                                                console.log(n),
                                            t.target == n) {
                                            var a = n.getComponent(cc.Sprite);
                                            null == a && (a = n.children[0].getComponent(cc.Sprite));
                                            var c = this.main.offset_json["PNG/Female/hair"];
                                            console.log(this.main.offset_json),
                                            c && c.hasOwnProperty(n.name) && (s = c[n.name]),
                                                console.log(s),
                                                s ? e.getComponent("Instance").SetPart("hair", a.spriteFrame, s) : e.getComponent("Instance").SetPart("hair", a.spriteFrame);
                                            var s = e.getOffset("hair");
                                            this.checker.setRoute(e.manager.node.name),
                                                this.checker.setSprite(i.name),
                                                this.checker.setOffset(e.getOffset(part))
                                        }
                                    }
                                }, t)
                        })
                    })
            },
            initPart: function(t) {
                var e = this
                    , i = a.default.getChildByPath(this.node, "switch/container/" + t);
                null != i && (null != i.getChildByName("view") && (i = a.default.getChildByPath(i, "view/content")),
                    i.children.map(function(i) {
                        i.on("touchend", function(e) {
                            if (null != this.main.selected_instance && this.main.selected_instance.manager == this) {
                                var n = this.main.selected_instance;
                                if (e.target == i) {
                                    var a = i.getComponent(cc.Sprite);
                                    null == a && (a = i.children[0].getComponent(cc.Sprite));
                                    var c = a.getComponent("PartAttr");
                                    null != c ? n.getComponent("Instance").SetPart(t, a.spriteFrame, c.offset) : n.getComponent("Instance").SetPart(t, a.spriteFrame);
                                    var s = n.getOffset(t);
                                    this.checker.setOffset(s)
                                }
                            }
                        }, e)
                    }))
            }
        }),
            cc._RF.pop()
    }
        , {
            Main: "Main",
            util: "util"
        }],
    AdultPanel: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        cc._RF.push(e, "b9ac7BViZ5PfoTaSXuWameU", "AdultPanel");
        var a = n(t("util"))
            , c = n(t("Main"));
        n(t("var"));
        cc.Class({
            extends: cc.Component,
            properties: {
                selector: cc.Node,
                male: cc.Node,
                _male: null,
                female: cc.Node,
                _female: null,
                malePrefab: cc.Prefab,
                femalePrefab: cc.Prefab,
                main: c.default
            },
            onEnable: function() {
                this.female.active = !1,
                    this.male.active = !1
            },
            init: function(t) {
                var e = this;
                this.main = t,
                    this.selector = this.node.getChildByName("Selector"),
                    this.male = this.node.getChildByName("Male"),
                    this.female = this.node.getChildByName("Female"),
                    this._female = this.female.getComponent("AdultManager"),
                    this._male = this.male.getComponent("AdultManager"),
                    this.selector.getChildByName("Female").on("touchend", function(t) {
                        e.female.active = !0,
                            e.male.active = !1;
                        var i = cc.instantiate(e.femalePrefab);
                        cc.find("Canvas/STAGE/GROUND").addChild(i),
                            i.setLocalZOrder(100),
                            i.x = a.default.getRandomInt(-30, 30),
                            i.y = a.default.getRandomInt(-30, 30) + 250,
                            i.scale = 1,
                            e._female.instance = i.getComponent("Instance"),
                            i.getComponent("Instance").init(e._female)
                    }, this),
                    this.selector.getChildByName("Male").on("touchend", function(t) {
                        e.female.active = !1,
                            e.male.active = !0;
                        var i = cc.instantiate(e.malePrefab);
                        cc.find("Canvas/STAGE/GROUND").addChild(i),
                            i.setLocalZOrder(100),
                            i.x = a.default.getRandomInt(-30, 30),
                            i.y = a.default.getRandomInt(-30, 30) + 250,
                            i.scale = 1;
                        var n = e.male.getComponent("AdultManager");
                        n.instance = i.getComponent("Instance"),
                            i.getComponent("Instance").init(n)
                    }, this)
            }
        }),
            cc._RF.pop()
    }
        , {
            Main: "Main",
            util: "util",
            var: "var"
        }],
    BGManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d2930H4QgFOubwru+AvAGfF", "BGManager"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    bgStage: cc.Node,
                    game: cc.Node,
                    active: ""
                },
                init: function(t) {
                    var e = this;
                    this.game = t,
                        this.node.children.map(function(t) {
                            t.getChildByName("tick") ? t.on("touchstart", function(e) {
                                for (i = 0; i < this.node.children.length; i++)
                                    if (this.node.children[i].name == t.name && this.node.children[i].getChildByName("tick").active)
                                        return;
                                for (i = 0; i < this.bgStage.children.length; i++)
                                    this.bgStage.children[i].name == t.name ? this.MoveIn(this.bgStage.children[i], i) : this.MoveOut(this.bgStage.children[i], i);
                                for (var i = 0; i < this.node.children.length; i++)
                                    this.node.children[i].name == t.name ? this.node.children[i].getChildByName("tick").active = !0 : this.node.children[i].getChildByName("tick").active = !1
                            }, e) : t.on("touchstart", function(t) {
                                t.stopPropagation()
                            }, e)
                        })
                },
                MoveIn: function(t, e) {
                    t.x = 1400;
                    var i = cc.moveTo(.3, cc.p(0, t.y));
                    t.stopAllActions(),
                        t.runAction(i)
                },
                MoveOut: function(t, e) {
                    t.x = 0;
                    var i = cc.moveTo(.3, cc.p(1400, t.y));
                    t.stopAllActions(),
                        t.runAction(cc.sequence(cc.delayTime(.2), i))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Frog: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        cc._RF.push(e, "031d7s/BuxFNJSfXoA3XMVR", "Frog");
        var a = n(t("var"))
            , c = n(t("util"));
        cc.Class({
            extends: cc.Component,
            properties: {
                main: cc.Node,
                delay: 0,
                jumpAudio: {
                    default: null,
                    url: cc.AudioClip
                }
            },
            onLoad: function() {
                this.main = cc.find("Canvas").getComponent("Main"),
                    this.main.addInstance(),
                    this.main.frogs.push(this),
                    this.node.on("touchstart", this.onTouchStart, this),
                    this.node.setLocalZOrder(1),
                    this.node.x = c.default.getRandomInt(-240, 240),
                    this.node.y = c.default.getRandomInt(-150, 80) - 150,
                    this.node.scale = a.default.SCALE_FACTOR
            },
            onTouchStart: function() {
                var t = c.default.getRandomInt(1, 2);
                this.multiJump(t)
            },
            multiJump: function(t) {
                var e;
                e = c.default.getRandomInt(0, 1) ? -1 : 1,
                this.node.x > 1200 && (e = 1),
                this.node.x < -1200 && (e = -1);
                for (var i = 0; i < t; ++i)
                    this.jump(e)
            },
            jump: function(t) {
                var e = c.default.getRandomInt(-15, 65)
                    , i = c.default.getRandomInt(-30, 40)
                    , n = cc.jumpBy(.19, cc.p(-(120 + e) * t, i), .7 * (100 + e) + 40, 1).easing(cc.easeCubicActionOut());
                this.node.scaleX = t * a.default.SCALE_FACTOR;
                var s = cc.scaleTo(.06, t * a.default.SCALE_FACTOR, .85 * a.default.SCALE_FACTOR)
                    , o = cc.scaleTo(.1, t * a.default.SCALE_FACTOR, 1.15 * a.default.SCALE_FACTOR)
                    , r = cc.scaleTo(.04, t * a.default.SCALE_FACTOR, 1 * a.default.SCALE_FACTOR);
                return this.node.runAction(cc.sequence(cc.delayTime(this.delay + .06), s, o, n, r, cc.callFunc(this.reset, this))),
                    this.delay += .5,
                    this
            },
            reset: function() {
                this.delay = 0
            },
            playJumpSound: function() {
                cc.audioEngine.playEffect(this.jumpAudio, !1)
            },
            onDestroy: function() {
                this.main.removeInstance();
                var t = this.main.frogs.indexOf(this);
                -1 != t && this.main.frogs.splice(t, 1)
            }
        }),
            cc._RF.pop()
    }
        , {
            util: "util",
            var: "var"
        }],
    Game: [function(t, e, i) {
        "use strict";
        function n(t, e) {
            e || (e = window.location.href),
                t = t.replace(/[\[\]]/g, "\\$&");
            var i = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
            return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
        }
        cc._RF.push(e, "5b170kw/r9Gup40GNMJc3wg", "Game"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    momMng: cc.Node,
                    kidMng: cc.Node,
                    catMng: cc.Node,
                    dogMng: cc.Node,
                    bgMng: cc.Node,
                    stage: cc.Node,
                    accMng: cc.Node,
                    hatMng: cc.Node,
                    panel: cc.Node,
                    share: cc.Node,
                    sharePanel: cc.Node,
                    isFreeze: !1,
                    light: cc.Node,
                    character_count: 0,
                    background: cc.Node,
                    foreground: cc.Node
                },
                onLoad: function() {
                    this.momMng = this.momMng.getComponent("PersonManager"),
                        this.momMng.init(this),
                        this.kidMng = this.kidMng.getComponent("PersonManager"),
                        this.kidMng.init(this, .9),
                        this.catMng = this.catMng.getComponent("PersonManager"),
                        this.catMng.init(this),
                        this.dogMng = this.dogMng.getComponent("PersonManager"),
                        this.dogMng.init(this),
                        this.bgMng = this.bgMng.getComponent("BGManager"),
                        this.bgMng.init(this),
                        this.panel.getComponent("TabPanel").init(this),
                        this.share.on("touchstart", this.SetUpShare, this)
                },
                SetUpShare: function() {
                    if (this.panel.active) {
                        var t = /micromessenger/i.test(navigator.userAgent)
                            , e = /2018w/i.test(window.location.pathname);
                        this.panel.active = !1,
                            this.sharePanel.active = !0,
                            this.light.opacity = 100;
                        var i = cc.fadeOut(.1)
                            , a = cc.fadeIn(.1);
                        this.light.runAction(cc.sequence(i, a, i)),
                            this.stage.runAction(cc.sequence(cc.delayTime(.8), cc.scaleTo(.3, .97)));
                        for (var c, s = 0; s < this.background.children.length; s++)
                            this.background.children[s].x <= 100 && (c = this.background.children[s].name);
                        for (var o = cc.sequence(cc.delayTime(.9), cc.spawn(cc.fadeIn(.2), cc.scaleTo(.2, .6))), s = 0; s < this.foreground.children.length; s++)
                            this.foreground.children[s].name == c ? (this.foreground.children[s].active = !0,
                                this.foreground.children[s].opacity = 0,
                                this.foreground.children[s].runAction(o)) : this.foreground.children[s].active = !1;
                        var r = this.sharePanel.getChildByName("wechat")
                            , h = this.sharePanel.getChildByName("web")
                            , l = this.sharePanel.getChildByName("webqr");
                        r.opacity = 0,
                            h.opacity = 0,
                            l.opacity = 0,
                            this.sharePanel.runAction(cc.sequence(cc.delayTime(1.4), cc.callFunc(function(i) {
                                if (t)
                                    if (e) {
                                        var n = cc.fadeIn(.8);
                                        this.ds.runAction(n)
                                    } else {
                                        var a = cc.fadeIn(.8);
                                        this.qr.runAction(a)
                                    }
                                else {
                                    var c = cc.fadeIn(.8);
                                    this.lb.runAction(c)
                                }
                            }, {
                                qr: r,
                                lb: h,
                                ds: l
                            }), cc.delayTime(1.9), cc.callFunc(function() {
                                var e = document.getElementById("GameCanvas")
                                    , i = document.getElementById("share")
                                    , a = document.getElementById("Cocos2dGameContainer");
                                i.src = e.toDataURL("image/png"),
                                    i.classList.remove("hide"),
                                    i.style.height = a.style.height,
                                    i.style.width = a.style.width,
                                    i.style.padding = a.style.padding,
                                    i.style.margin = a.style.margin,
                                    setTimeout(function() {
                                        a.style.display = "none"
                                    }, 100);
                                var c = document.getElementById("WebHint");
                                c && (t ? (this.SetHint("save"),
                                    this.ShowHint(c)) : (this.SetHint("snap"),
                                    this.ShowHint(c))),
                                    MtaH5.clickStat("photo", {
                                        mom: this.momMng.GetName(),
                                        kid: this.kidMng.GetName(),
                                        cat: this.catMng.GetName(),
                                        dog: this.dogMng.GetName()
                                    }),
                                    MtaH5.clickStat("qudao", {
                                        tag: n("ADTAG")
                                    })
                            }, this))),
                            this.isFreeze = !0,
                            this.clearRemoveTag(),
                            this.share.active = !1
                    } else
                        this.panel.active = !0,
                            this.sharePanel.active = !1,
                            this.stage.stopAllActions(),
                            this.stage.scale = 1,
                            this.isFreeze = !1
                },
                clearRemoveTag: function() {
                    this.stage.children.map(function(t) {
                        "Background" != t.name && (t.getChildByName("remove").active = !1)
                    })
                },
                start: function() {
                    !function() {
                        var t = document.createElement("script");
                        t.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4",
                            t.setAttribute("name", "MTAH5"),
                            t.setAttribute("sid", "500566997"),
                            t.setAttribute("cid", "500567097");
                        var e = document.getElementsByTagName("script")[0];
                        e.parentNode.insertBefore(t, e)
                    }();
                    var t = document.getElementById("WebHint");
                    t && (this.RegHint(t),
                        this.SetHint("select"),
                        this.ShowHint(t))
                },
                AddCount: function() {
                    this.character_count += 1,
                    1 == this.character_count && (this.share.active = !0,
                        this.share.opacity = 0,
                        this.share.stopAllActions(),
                        this.share.runAction(cc.fadeTo(.3, 230)))
                },
                DelCount: function() {
                    if (this.character_count -= 1,
                        0 == this.character_count) {
                        this.share.active = !0,
                            this.share.opacity = 230,
                            this.share.stopAllActions(),
                            this.share.runAction(cc.sequence(cc.fadeOut(.2), cc.delayTime(.2), cc.callFunc(function() {
                                this.share.active = !1
                            }, this)))
                    }
                },
                RegHint: function(t) {
                    t.addEventListener("touchstart", function() {
                        t.style.opacity = 0,
                            setTimeout(function() {
                                t.style.display = "none"
                            }, 300)
                    })
                },
                ShowHint: function(t) {
                    t.style.display = "flex",
                        t.style.opacity = 0,
                        setTimeout(function() {
                            t.style.opacity = 1,
                                setTimeout(function() {
                                    t.style.opacity = 0,
                                        setTimeout(function() {
                                            t.style.display = "none"
                                        }, 300)
                                }, 3e3)
                        }, 50)
                },
                SetHint: function(t) {
                    var e = document.getElementById("HintSnap")
                        , i = document.getElementById("HintSelect")
                        , n = document.getElementById("HintSave");
                    "snap" == t ? (e.style.display = "block",
                        i.style.display = "none",
                        n.style.display = "none") : "save" == t ? (e.style.display = "none",
                        i.style.display = "none",
                        n.style.display = "block") : (e.style.display = "none",
                        i.style.display = "block",
                        n.style.display = "none")
                }
            }),
            cc._RF.pop()
    }
        , {}],
    GridSize: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5fc11KxF+lFZJXZHax6hEhd", "GridSize"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    is_resized: !1,
                    url: ""
                },
                onEnable: function() {},
                onLoad: function() {}
            }),
            cc._RF.pop()
    }
        , {}],
    HelloWorld: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    label: {
                        default: null,
                        type: cc.Label
                    },
                    text: "Hello, World!"
                },
                onLoad: function() {
                    this.label.string = this.text
                },
                update: function(t) {}
            }),
            cc._RF.pop()
    }
        , {}],
    InstanceManager: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        cc._RF.push(e, "4d38aH+aAtPpYmhA5jjQGzD", "InstanceManager");
        var a = n(t("util"))
            , c = n(t("Main"));
        n(t("var"));
        cc.Class({
            extends: cc.Component,
            properties: {
                instance: cc.Node,
                container: cc.Node,
                prefab: cc.Prefab,
                main: c.default,
                is_resize: !1,
                ratio: 1,
                min_scale: -1,
                stage: "STAGE/GROUND",
                alt_stage: "STAGE/WALL",
                alt_stage_2: "STAGE/WINDOW",
                alt_item: "",
                alt_item_2: "",
                alt_component_1: "",
                alt_component_1_item: "",
                alt_component_2: "",
                alt_component_2_item: "",
                alt_prefab_item: "",
                alt_prefab: cc.Prefab,
                alt_prefab_2_item: "",
                alt_prefab_2: cc.Prefab,
                is_preloaded: !1
            },
            onEnable: function() {},
            onDisable: function() {},
            init: function(t) {
                this.main = t,
                null != this.instance && (this.instance = this.instance.getComponent("Instance"),
                    this.instance.init(this)),
                    this.initSprites({
                        is_resize: this.is_resize,
                        min_scale: -1 != this.min_scale ? this.min_scale : null,
                        ratio: this.ratio
                    })
            },
            initSprites: function(t) {
                var e = this
                    , i = "PNG/" + this.node.name
                    , n = a.default.getChildByPath(this.node, "view/content")
                    , c = this.node.getChildByName("loading");
                if (this.is_preloaded) {
                    c.active = !1;
                    var s = n.children;
                    s.sort(function(t, e) {
                        return parseInt(t.name.split(".")[0]) - parseInt(e.name.split(".")[0])
                    }),
                        s.reverse(),
                        s.map(function(i) {
                            var a = e.setSpriteNode(i, n, t);
                            a.on("touchend", e.setInstanceSprite(a).bind(e), e)
                        })
                } else
                    c.getChildByName("Label").getComponent(cc.Label).string = "?????????",
                        cc.loader.loadResDir(i, cc.SpriteFrame, function(i, a) {
                            if (i)
                                return c.getChildByName("Label").getComponent(cc.Label).string = "????????????????????????",
                                    void c.once("touchstart", function(i) {
                                        e.initSprites(t)
                                    }, e);
                            c.active = !1,
                                a.sort(function(t, e) {
                                    var i, n, a = t.name, c = e.name;
                                    return /^b/.test(a) ? (a = a.substring(1),
                                        i = parseInt(a.split(".")[0]) - 100) : i = parseInt(a.split(".")[0]),
                                        /^b/.test(c) ? (c = c.substring(1),
                                            n = parseInt(c.split(".")[0]) - 100) : n = parseInt(c.split(".")[0]),
                                    i - n
                                }),
                                a.reverse(),
                                a.map(function(i) {
                                    var a = e.createSpriteNode(i, n, t);
                                    a.on("touchend", e.setInstanceSprite(a).bind(e), e)
                                })
                        })
            },
            setSpriteNode: function(t, e, i) {
                if (0 != t.children.length)
                    return t;
                var n = t.getComponent(cc.Sprite).spriteFrame
                    , a = new cc.Node("sprite")
                    , c = a.addComponent(cc.Sprite);
                c.spriteFrame = n,
                    c.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                var s, o = new cc.Node(n.name), r = (i = i || {}).ratio, h = i.min_scale, l = i.padding, d = i.is_resize, u = cc.view.getVisibleSize().width, m = cc.view.getVisibleSize().height;
                s = (u - 275) / 3;
                var g = r || .9;
                m < u && (g = m / u),
                    o.width = s,
                    o.height = s * g,
                    s -= l = l || 0;
                var f = n.getOriginalSize()
                    , p = 1;
                if (d && (g = f.height / f.width,
                        f.width > f.height ? (a.width = s,
                            a.height = s * g,
                            p = g) : (a.width = s / g,
                            a.height = s,
                            p = 1 / g),
                    m < u && (a.width = .5 * a.width,
                        a.height = .5 * a.height)),
                    h && p > h) {
                    var y = h / p;
                    a.width = a.width * y,
                        a.height = a.height * y
                }
                return o.addChild(a),
                    e.addChild(o),
                    t.destroy(),
                    o
            },
            createSpriteNode: function(t, e, i) {
                var n = new cc.Node("sprite")
                    , a = n.addComponent(cc.Sprite);
                a.spriteFrame = t,
                    a.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                var c, s = new cc.Node(t.name), o = (i = i || {}).ratio, r = i.min_scale, h = i.padding, l = i.is_resize, d = cc.view.getVisibleSize().width, u = cc.view.getVisibleSize().height;
                c = (d - 275) / 3;
                var m = o || .9;
                u < d && (m = u / d),
                    s.width = c,
                    s.height = c * m,
                    c -= h = h || 0;
                var g = t.getOriginalSize()
                    , f = 1;
                if (l && (m = g.height / g.width,
                        g.width > g.height ? (n.width = c,
                            n.height = c * m,
                            f = m) : (n.width = c / m,
                            n.height = c,
                            f = 1 / m),
                    u < d && (n.width = .5 * n.width,
                        n.height = .5 * n.height)),
                    r && f > r) {
                    var p = r / f;
                    n.width = n.width * p,
                        n.height = n.height * p
                }
                return s.addChild(n),
                    e.addChild(s),
                    s
            },
            addItemToStage: function(t, e) {
                if (-1 != this.alt_item.split(",").indexOf(t.name))
                    (i = cc.find("Canvas/" + this.alt_stage)).addChild(e);
                else if (-1 != this.alt_item_2.split(",").indexOf(t.name))
                    (i = cc.find("Canvas/" + this.alt_stage_2)).addChild(e);
                else {
                    var i = cc.find("Canvas/" + this.stage);
                    i.addChild(e)
                }
            },
            setInstanceSprite: function(t) {
                var e = this;
                return function(i) {
                    if (i.target == t) {
                        var n, c = t.children[0].getComponent(cc.Sprite);
                        if (-1 != e.alt_prefab_item.split(",").indexOf(t.name))
                            console.log(t.name),
                                n = cc.instantiate(e.alt_prefab),
                                e.addItemToStage(t, n);
                        else if (-1 != e.alt_prefab_2_item.split(",").indexOf(t.name))
                            (n = cc.instantiate(e.alt_prefab_2)).getComponent("Turtle").init(e),
                                e.addItemToStage(t, n);
                        else {
                            n = cc.instantiate(e.prefab);
                            try {
                                -1 != e.alt_component_1_item.split(",").indexOf(t.name) && n.addComponent(e.alt_component_1)
                            } catch (i) {
                                console.log(i)
                            }
                            n.name = c.spriteFrame.name,
                                e.addItemToStage(t, n),
                                n.setLocalZOrder(100),
                                n.x = a.default.getRandomInt(-40, 40),
                                n.y = a.default.getRandomInt(-40, 40) + 150,
                                n.scale = 1,
                                n.getComponent("Instance").SetSprite(c.spriteFrame),
                                n.getComponent("Instance").init(e)
                        }
                    }
                }
            }
        }),
            cc._RF.pop()
    }
        , {
            Main: "Main",
            util: "util",
            var: "var"
        }],
    Instance: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function a(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i,
                t
        }
        cc._RF.push(e, "a4930gmgtpHDJz0Y14bG4dh", "Instance");
        var c, s = n(t("util")), o = n(t("var"));
        e.exports = cc.Class({
            extends: cc.Component,
            properties: (c = {
                offset: cc.Vec2,
                manager: cc.Node,
                remove: cc.Node,
                resize: cc.Node,
                _scale: 1,
                _rot_deg: 0,
                _prev_rot_deg: 0,
                _start_resize_pos: cc.Vec2,
                _start_rot_pos: cc.Vec2,
                main: cc.Node,
                frame: cc.Node,
                body: cc.Node,
                outline: cc.Node
            },
                a(c, "resize", cc.Node),
                a(c, "remove", cc.Node),
                a(c, "_postTouchStart", null),
                c),
            init: function(t) {
                this.manager = t,
                    this.frame = this.node.getChildByName("Frame"),
                    this.body = this.node.getChildByName("Body"),
                    this.outline = this.frame.getChildByName("outline"),
                    this.remove = this.frame.getChildByName("remove"),
                    this.resize = this.frame.getChildByName("resize"),
                    this.body.on("touchstart", this.onDragStart, this),
                    this.body.on("touchmove", this.onDragging, this),
                    this.body.on("touchend", this.onDragEnd, this),
                    this.remove.on("touchend", this.onRemove, this),
                    this.resize.on("touchstart", this.onResizeStart, this),
                    this.resize.on("touchmove", this.onResizeMove, this),
                    this.resize.on("touchcancel", this.onResizeEnd, this),
                    this.select(),
                    this._start_size = this.body.getContentSize()
            },
            onResizeStart: function(t) {
                this._start_resize_pos = cc.v2(this._start_size.width / 2, this._start_size.height / 2),
                    this._start_rot_pos = this.resize.position,
                    t.stopPropagation()
            },
            onResizeMove: function(t) {
                var e = this.node.convertTouchToNodeSpace(t.touch)
                    , i = cc.pMult(e, .5)
                    , n = this.calcScale(this._start_resize_pos, this._scale, i);
                this._scale = n,
                    this.body.scale = n;
                var a = this.body.width * n + 50
                    , c = this.body.height * n + 50;
                this.outline.width = this.frame.width = a,
                    this.outline.height = this.frame.height = c,
                    this.remove.x = -a / 2,
                    this.remove.y = -c / 2,
                    this.resize.x = a / 2,
                    this.resize.y = c / 2;
                var s = this.calcRotation(this._start_resize_pos, i);
                this.node.rotation = s + this._prev_rot_deg,
                    this._rot_deg = s + this._prev_rot_deg,
                    t.stopPropagation()
            },
            onResizeEnd: function(t) {
                this._prev_rot_deg = this._rot_deg,
                    t.stopPropagation()
            },
            onRemove: function(t) {
                this.manager.main.selected_instance == this && (this.manager.main.selected_instance = null),
                    this.node.destroy(),
                /[Mm]ale/.test(this.manager.node.name) && this.manager.main.deactiveAdult(),
                    t.stopPropagation()
            },
            select: function() {
                null != this.manager.main.selected_instance && this.manager.main.selected_instance.HideFrame(),
                    this.manager.main.selected_instance = this,
                    this.ShowFrame(),
                    this.updateFrameSize()
            },
            updateFrameSize: function() {
                if (/InstanceManager/.test(this.manager.name)) {
                    var t;
                    t = null != this.node.getComponent("Turtle") ? s.default.getChildByPath(this.node, "Body/shell") : s.default.getChildByPath(this.node, "Body/sprite"),
                        this.node.width = this.body.width = t.width + 0,
                        this.node.height = this.body.height = t.height + 0;
                    var e = this.body.width + 50
                        , i = this.body.height + 50;
                    this.outline.width = this.frame.width = e,
                        this.outline.height = this.frame.height = i,
                        this.remove.x = -e / 2,
                        this.remove.y = -i / 2,
                        this.resize.x = e / 2,
                        this.resize.y = i / 2
                } else
                    this.body.width = this.node.width,
                        this.body.height = this.node.height
            },
            calcScale: function(t, e, i) {
                var n = 1.3 * Math.sqrt(i.x * i.x + i.y * i.y) / Math.sqrt(t.x * t.x + t.y * t.y);
                return n >= 8 ? n = 8 : n <= .5 && (n = .5),
                    n
            },
            calcRotation: function(t, e) {
                var i = Math.atan2(t.x, t.y) * (180 / Math.PI)
                    , n = Math.atan2(e.x, e.y) * (180 / Math.PI) - i;
                return n >= o.default.MAX_ROTATE ? n = o.default.MAX_ROTATE : n <= o.default.MIN_ROTATE && (n = o.default.MIN_ROTATE),
                    n
            },
            onDragStart: function(t) {
                this.main.is_freeze || (this.node.setLocalZOrder(1e3),
                    this.node.stopAllActions(),
                    this.node.runAction(cc.scaleTo(.1, 1.07)),
                    this.offset = cc.pSub(this.node.parent.convertToWorldSpace(this.node.getPosition()), t.getLocation()),
                null != this.manager.main.selected_instance && this.manager.main.selected_instance.HideFrame(),
                    this.manager.main.selected_instance = this,
                    this.ShowFrame(),
                    this.manager.main.switchPanel(this.manager.node.name),
                    t.stopPropagation())
            },
            onDragging: function(t) {
                this.main.is_freeze || (this.node.x = t.getLocationX() + this.offset.x + 0,
                    this.node.y = t.getLocationY() + this.offset.y + 0,
                    t.stopPropagation())
            },
            onDragEnd: function(t) {
                this.main.is_freeze || (this.node.setLocalZOrder(1),
                    this.node.stopAllActions(),
                    this.node.runAction(cc.scaleTo(.1, 1)),
                    t.stopPropagation())
            },
            SetPart: function(t, e, i) {
                var n;
                (n = "body_up" == t || "body_low" == t ? s.default.getChildByPath(this.node, "Body/" + t) : s.default.getChildByPath(this.node, "Body/head/" + t)).getComponent(cc.Sprite).spriteFrame = e,
                    i ? (n.x = i.x,
                        n.y = i.y) : "hair" == t ? (n.x = 0,
                        n.y = 40) : "face" == t ? (n.x = 0,
                        n.y = 20) : "body_up" == t ? (n.x = 40,
                        n.y = -220) : "body_low" == t ? (n.x = 40,
                        n.y = -500) : (n.x = 0,
                        n.y = -30),
                n.active || (n.active = !0)
            },
            togglePart: function(t) {
                var e;
                (e = "body_up" == t || "body_low" == t ? s.default.getChildByPath(this.node, "Body/" + t) : s.default.getChildByPath(this.node, "Body/head/" + t)).active = !e.active
            },
            getOffset: function(t) {
                return ("body_up" == t || "body_low" == t ? s.default.getChildByPath(this.node, "Body/" + t) : s.default.getChildByPath(this.node, "Body/head/" + t)).position
            },
            setOffset: function(t, e) {
                ("body_up" == t || "body_low" == t ? s.default.getChildByPath(this.node, "Body/" + t) : s.default.getChildByPath(this.node, "Body/head/" + t)).position = e
            },
            SetSprite: function(t, e) {
                var i;
                (i = s.default.getChildByPath(this.node, "Body/sprite")).getComponent(cc.Sprite).spriteFrame = t,
                    e ? (i.x = e.x,
                        i.y = e.y) : (i.x = 0,
                        i.y = 0)
            },
            getSprite: function(t) {
                return ("body_up" == t || "body_low" == t ? s.default.getChildByPath(this.node, "Body/" + t) : s.default.getChildByPath(this.node, "Body/head/" + t)).getComponent(cc.Sprite).spriteFrame
            },
            HideFrame: function() {
                this.node.setLocalZOrder(1),
                    this.node.getChildByName("Frame").active = !1
            },
            ShowFrame: function() {
                this.node.getChildByName("Frame").active = !0
            },
            onLoad: function() {
                this.main = cc.find("Canvas").getComponent("Main"),
                    this.main.addInstance()
            },
            onDestroy: function() {
                this.main.removeInstance()
            }
        }),
            cc._RF.pop()
    }
        , {
            util: "util",
            var: "var"
        }],
    Main: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        cc._RF.push(e, "b17afiAcjhLVZiVHBk/pl9d", "Main");
        var a = n(t("var"))
            , c = n(t("util"));
        cc.Class({
            extends: cc.Component,
            properties: {
                tab: cc.Node,
                container: cc.Node,
                adultPanel: cc.Node,
                femaleMan: cc.Node,
                maleMan: cc.Node,
                kidMan: cc.Node,
                dogMan: cc.Node,
                catMan: cc.Node,
                furnitureMan: cc.Node,
                roomMan: cc.Node,
                stage: cc.Node,
                selected_instance: cc.Node,
                offset_json: null,
                loading_prefab: cc.Prefab,
                snow_man: cc.Node,
                instance_count: 0,
                share: cc.Node,
                panel: cc.Node,
                is_mini: !1,
                is_freeze: !1,
                logo: cc.Node,
                frogs: [],
                touch_count: 0,
                k_count: 0
            },
            onLoad: function() {
                var t = this;
                1 == c.default.getParameterByName("r") ? a.default.init({
                    r: !0
                }) : a.default.init(),
                    cc.director.setDisplayStats(!1),
                    cc.loader.loadRes("data/offset", function(e, i) {
                        e ? console.log(e.message || e) : (t.offset_json = i,
                            t.femaleMan = cc.find("Canvas/PANEL/CONTAINER/Adult/Female").getComponent("AdultManager"),
                            t.femaleMan.init(t),
                            t.maleMan = cc.find("Canvas/PANEL/CONTAINER/Adult/Male").getComponent("AdultManager"),
                            t.maleMan.init(t))
                    }),
                    this.kidMan = cc.find("Canvas/PANEL/CONTAINER/Kid").getComponent("InstanceManager"),
                    this.kidMan.init(this),
                    this.dogMan = cc.find("Canvas/PANEL/CONTAINER/Dog").getComponent("InstanceManager"),
                    this.dogMan.init(this),
                    this.catMan = cc.find("Canvas/PANEL/CONTAINER/Cat").getComponent("InstanceManager"),
                    this.catMan.init(this),
                    this.furnitureMan = cc.find("Canvas/PANEL/CONTAINER/Furniture").getComponent("InstanceManager"),
                    this.furnitureMan.init(this),
                    this.initTab(),
                    this.adultPanel = cc.find("Canvas/PANEL/CONTAINER/Adult").getComponent("AdultPanel"),
                    this.adultPanel.init(this),
                    this.stage = cc.find("Canvas/STAGE"),
                    this.stage.on("touchend", function(e) {
                        null != t.selected_instance && (t.selected_instance.HideFrame(),
                            t.selected_instance = null,
                            t.deactiveAdult())
                    }, this),
                    cc.find("Canvas/BOTTOM").on("touchend", function(e) {
                        null != t.selected_instance && (t.selected_instance.HideFrame(),
                            t.selected_instance = null,
                            t.deactiveAdult())
                    }, this),
                    this.roomMan = cc.find("Canvas/PANEL/CONTAINER/Room").getComponent("RoomManager"),
                    this.roomMan.init(this),
                    this.share = this.addComponent("share"),
                    this.share.init(this),
                1 == c.default.getParameterByName("debug") && this.initDebug(),
                1 == c.default.getParameterByName("ver") && this.initVersion(),
                    this.snow_man = this.addComponent("SnowManager"),
                    this.snow_man.init(this),
                    this.logo = cc.find("Canvas/BOTTOM/logo"),
                    this.logo.on("touchstart", this.addTouchCount, this)
            },
            start: function() {
                window.MtaH5 && (MtaH5.clickStat("start", {
                    qudao: c.default.getParameterByName("ADTAG"),
                    kol: c.default.getParameterByName("k"),
                    d: c.default.getParameterByName("d"),
                    isweixin: c.default.isWeixinBrowser
                }),
                    MtaH5.clickStat("fangwen", {
                        start: "true"
                    }))
            },
            initVersion: function() {
                var t = cc.find("Canvas/VERSION");
                t.active = !0,
                    t.getComponent(cc.Label).string = a.default.VERSION
            },
            initDebug: function() {
                var t = cc.find("Canvas/DEBUG");
                t.active = !0,
                    t.getChildByName("Label").getComponent(cc.Label).string = "DEBUG",
                    cc.find("Canvas/DEBUG").on("touchend", function(t) {
                        var e = cc.find("Canvas/STATS");
                        e.active = !e.active
                    }, this)
            },
            initTab: function() {
                var t = this;
                this.tab = cc.find("Canvas/PANEL/TAB"),
                    this.container = cc.find("Canvas/PANEL/CONTAINER"),
                    this.mini = this.tab.getChildByName("Mini"),
                    this.panel = cc.find("Canvas/PANEL"),
                    this.mini.on("touchstart", function(e) {
                        t.togglePanel()
                    }, this),
                    this.tab.children.map(function(e) {
                        "Mini" != e.name && (e.on("touchstart", function(t) {
                            if (this.is_mini) {
                                this.togglePanel();
                                var i = e.getComponent(cc.Toggle);
                                i.is_checked || i.check()
                            }
                        }, t),
                            e.on("toggle", function(t) {
                                this.container.children.map(function(t) {
                                    t.name == e.name ? t.active = !0 : t.active = !1
                                }),
                                    this.tab.children.map(function(t) {
                                        t.name == e.name ? t.color = new cc.Color(246,246,246,255) : t.color = new cc.Color(255,255,255,255)
                                    })
                            }, t),
                        "Adult" == e.name && e.on("touchstart", function(t) {
                            this.deactiveAdult()
                        }, t))
                    })
            },
            addTouchCount: function(t) {
                this.touch_count += 1,
                this.touch_count >= 20 && (this.logo.runAction(cc.jumpBy(.15, cc.p(0, 0), 50, 1)),
                    this.frogs.map(function(t) {
                        setTimeout(function() {
                            t.multiJump(c.default.getRandomInt(1, 8))
                        }, c.default.getRandomInt(100, 1e3))
                    }),
                    this.touch_count = 0,
                    this.k_count += 1,
                5 == this.k_count && (this.logo.runAction(cc.rotateBy(.2, 360)),
                    a.default.init({
                        r: !0
                    }),
                    this.k_count))
            },
            togglePanel: function() {
                var t = this.mini.getChildByName("sprite");
                this.is_mini ? (this.panel.y = 0,
                    this.share.share_btn.y = -150,
                    t.stopAllActions(),
                    t.runAction(cc.rotateTo(.1, 0)),
                    this.logo.stopAllActions(),
                    this.logo.runAction(cc.moveTo(.15, cc.v2(0, 30)))) : (this.panel.y = -600,
                    this.share.share_btn.y = -520,
                    t.stopAllActions(),
                    t.runAction(cc.rotateTo(.1, 180)),
                    this.logo.stopAllActions(),
                    this.logo.runAction(cc.moveTo(.15, cc.v2(0, 50)))),
                    this.is_mini = !this.is_mini
            },
            deactiveAdult: function() {
                this.adultPanel.female.active = !1,
                    this.adultPanel.male.active = !1
            },
            switchPanel: function(t) {
                var e = t;
                /[Mm]ale/.test(t) && (e = "Adult"),
                    this.tab.children.map(function(t) {
                        t.name == e && t.getComponent(cc.Toggle).check()
                    }),
                    /Female/.test(t) ? (this.adultPanel.female.active = !0,
                        this.adultPanel.male.active = !1) : /Male/.test(t) && (this.adultPanel.female.active = !1,
                            this.adultPanel.male.active = !0)
            },
            addInstance: function() {
                this.instance_count += 1,
                this.instance_count >= 2 && !this.share.share_btn.active && (this.share.share_btn.active = !0,
                    this.share.share_btn.opacity = 0,
                    this.share.share_btn.runAction(cc.fadeIn(.3)))
            },
            removeInstance: function() {
                this.instance_count -= 1,
                this.instance_count < 2 && (this.share.share_btn.active = !1)
            }
        }),
            cc._RF.pop()
    }
        , {
            util: "util",
            var: "var"
        }],
    OffsetChecker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "39df8n/IK9DeoA3nPRcMO7W", "OffsetChecker"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    control: cc.Node,
                    off_x: cc.Label,
                    off_y: cc.Label,
                    route: cc.Label,
                    type: cc.Label,
                    sprite: cc.Label,
                    manager: cc.Node,
                    offset: cc.Vec2,
                    editbox: cc.EditBox,
                    is_touching_up: !1,
                    is_touching_down: !1,
                    is_touching_left: !1,
                    is_touching_right: !1
                },
                init: function(t) {
                    var e = this;
                    this.manager = t;
                    var i = this.node.getChildByName("STATS");
                    this.route = i.getChildByName("route").getComponent(cc.Label),
                        this.type = i.getChildByName("type").getComponent(cc.Label),
                        this.sprite = i.getChildByName("sprite").getComponent(cc.Label),
                        this.off_x = i.getChildByName("offset_x").getComponent(cc.Label),
                        this.off_y = i.getChildByName("offset_y").getComponent(cc.Label),
                        this.control = this.node.getChildByName("CONTROL"),
                        this.editbox = this.node.getChildByName("editbox").getComponent(cc.EditBox),
                        ["up", "down", "left", "right"].map(function(t) {
                            e.control.getChildByName(t).on("touchstart", function(i) {
                                e["is_touching_" + t] = !0
                            }, e),
                                e.control.getChildByName(t).on("touchend", function(i) {
                                    e["is_touching_" + t] = !1
                                }, e)
                        }),
                        this.control.on("touchend", function(t) {
                            t.stopPropagation()
                        }),
                        this.node.getChildByName("gen").on("touchend", function(t) {
                            e.showJson()
                        })
                },
                update: function() {
                    this.is_touching_up && (this.offset.y += 1.5),
                    this.is_touching_down && (this.offset.y -= 1.5),
                    this.is_touching_left && (this.offset.x -= 1.5),
                    this.is_touching_right && (this.offset.x += 1.5),
                    (this.is_touching_up || this.is_touching_down || this.is_touching_left || this.is_touching_right) && this.updateOffset()
                },
                updateOffset: function() {
                    null != this.manager.main.selected_instance && (this.setOffset(this.offset),
                        this.manager.main.selected_instance.setOffset(this.type.string, this.offset))
                },
                setType: function(t) {
                    this.type.string = t
                },
                setRoute: function(t) {
                    this.route.string = t
                },
                setOffset: function(t) {
                    this.offset = t,
                        this.off_x.string = "off_x:" + t.x,
                        this.off_y.string = "off_y:" + t.y
                },
                setSprite: function(t) {
                    this.sprite.string = t
                },
                showJson: function() {
                    var t = this.updateJson();
                    this.editbox.string = JSON.stringify(t),
                        console.log(t)
                },
                updateJson: function() {
                    if (this.manager.main.offset_json || (this.manager.main.offset_json = {}),
                        "SPRITE" != this.sprite.string) {
                        var t = "PNG/" + this.route.string + "/" + this.type.string;
                        return this.manager.main.offset_json.hasOwnProperty(t) || (this.manager.main.offset_json[t] = {}),
                            this.manager.main.offset_json[t][this.sprite.string] = this.offset,
                            this.manager.main.offset_json
                    }
                }
            }),
            cc._RF.pop()
    }
        , {}],
    PartAttr: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1cba6bkNNxFK6U++r1VsZnr", "PartAttr"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    offset: cc.Vec2
                }
            }),
            cc._RF.pop()
    }
        , {}],
    PersonManager: [function(t, e, i) {
        "use strict";
        function n(t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        }
        function a(t, e) {
            for (var i, n = e.split("/"), a = t, c = 0; c < n.length; c++) {
                if (null == (i = a.getChildByName(n[c])))
                    return null;
                a = i
            }
            return a
        }
        cc._RF.push(e, "b96e1yeEXJOVbEd34KlKBdF", "PersonManager"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    game: cc.Node,
                    prefab: cc.Prefab,
                    skin: cc.Node,
                    hat: cc.Node,
                    eye: cc.Node,
                    neck: cc.Node,
                    util: cc.Node,
                    instance: {
                        default: null,
                        type: cc.Node
                    },
                    max_instance: 1,
                    instance_list: [],
                    scale: 1,
                    sharedMng: cc.Node
                },
                init: function(t, e) {
                    var i = this;
                    this.game = t,
                    e && (this.scale = e),
                        this.skin = this.node.getChildByName("skin"),
                    null == this.skin && (this.skin = this.node.getChildByName("view").getChildByName("skin")),
                        this.skin.children.map(function(t) {
                            var e = t.getChildByName("tick");
                            e ? (e.active = !1,
                                t.on("touchend", function(e) {
                                    var i = e.getStartLocation()
                                        , n = e.getLocation();
                                    cc.pDistance(i, n) < 20 && this.createCharacter(t.name)
                                }, i)) : t.on("touchend", function(t) {
                                t.stopPropagation()
                            }, i)
                        }),
                        this.hat = this.node.getChildByName("hat"),
                    null == this.hat && (this.hat = this.node.getChildByName("acc_scroll").getChildByName("acc_view").getChildByName("acc").getChildByName("hat")),
                        this.hat.children.map(function(t) {
                            t.on("touchend", function(e) {
                                var i = e.getStartLocation()
                                    , n = e.getLocation();
                                cc.pDistance(i, n) < 20 && this.SetHat(t.name)
                            }, i),
                                t.getChildByName("tick").active = !1
                        });
                    var n = a(this.node, "acc_scroll/acc_view/acc/bg");
                    n && n.on("touchstart", function(t) {
                        t.stopPropagation()
                    }, this),
                        this.eye = this.node.getChildByName("eye"),
                    null == this.eye && (this.eye = a(this.node, "acc_scroll/acc_view/acc/eye")),
                        this.eye.children.map(function(t) {
                            t.on("touchend", function(e) {
                                var i = e.getStartLocation()
                                    , n = e.getLocation();
                                cc.pDistance(i, n) < 20 && this.SetEye(t.name)
                            }, i),
                                t.getChildByName("tick").active = !1
                        }),
                        this.neck = this.node.getChildByName("neck"),
                    null == this.neck && (this.neck = a(this.node, "acc_scroll/acc_view/acc/neck")),
                    null != this.neck && this.neck.children.map(function(t) {
                        t.on("touchend", function(e) {
                            var i = e.getStartLocation()
                                , n = e.getLocation();
                            cc.pDistance(i, n) < 20 && this.SetNeck(t.name)
                        }, i),
                            t.getChildByName("tick").active = !1
                    })
                },
                removeCharacter: function(t) {
                    this.instance = null;
                    var e = this.instance_list.indexOf(t);
                    -1 != e && this.instance_list.splice(e, 1),
                        this.game.DelCount(),
                        this.UpdateTick()
                },
                createCharacter: function(t) {
                    if (1 == this.max_instance) {
                        e = null;
                        null == this.instance ? ((i = cc.instantiate(this.prefab)).x = n(-30, 30),
                            i.y = n(-30, 30) + 50,
                            i.scale = .7,
                            this.game.stage.addChild(i),
                            this.instance = i,
                            (e = i.getComponent("avatar")).init(this, this.scale),
                            this.game.AddCount()) : e = this.instance.getComponent("avatar"),
                            e.SetSkin(t)
                    } else {
                        var e = null;
                        if ((null != this.sharedMng ? this.instance_list.length + this.sharedMng.getComponent("PersonManager").instance_list.length : this.instance_list.length) < this.max_instance) {
                            var i = cc.instantiate(this.prefab);
                            i.x = n(-30, 30),
                                i.y = n(-30, 30) + 50,
                                i.scale = .7,
                                this.game.stage.addChild(i),
                                (e = i.getComponent("avatar")).init(this, this.scale),
                                this.instance_list.push(e),
                                this.instance = e,
                                this.game.AddCount()
                        } else
                            e = null == this.instance ? this.sharedMng.getComponent("PersonManager").instance.getComponent("avatar") : this.instance.getComponent("avatar");
                        e.SetSkin(t)
                    }
                    this.UpdateTick(),
                        MtaH5.clickStat("create")
                },
                UpdateTick: function() {
                    var t = this;
                    1 == this.max_instance ? null != this.instance && this.skin.children.map(function(e) {
                            "bg" != e.name && (e.name == t.instance.skinname ? e.getChildByName("tick").active = !0 : e.getChildByName("tick").active = !1)
                        }) : this.skin.children.map(function(e) {
                        "bg" != e.name && (e.getChildByName("tick").active = !1,
                            t.instance_list.map(function(t) {
                                e.name == t.skinname && (e.getChildByName("tick").active = !0)
                            }))
                    })
                },
                SetEye: function(t) {
                    if (null != this.instance) {
                        var e = this.instance.getComponent("avatar").SetEye(t);
                        this.eye.children.map(function(i) {
                            i.name == t ? i.getChildByName("tick").active = e : i.getChildByName("tick").active = !1
                        })
                    }
                },
                SetHat: function(t) {
                    if (null != this.instance) {
                        var e = this.instance.getComponent("avatar").SetHat(t);
                        this.hat.children.map(function(i) {
                            i.name == t ? i.getChildByName("tick").active = e : i.getChildByName("tick").active = !1
                        })
                    }
                },
                SetNeck: function(t) {
                    if (null != this.instance) {
                        var e = this.instance.getComponent("avatar").SetNeck(t);
                        this.neck.children.map(function(i) {
                            i.name == t ? i.getChildByName("tick").active = e : i.getChildByName("tick").active = !1
                        })
                    }
                },
                GetName: function() {
                    if (1 == this.max_instance)
                        return null != this.instance ? this.instance.getComponent("avatar").skinname : "";
                    for (var t = "", e = 0; e < this.instance_list.length; e++)
                        t += this.instance_list[e].skinname + ",";
                    return "" != t && (t = t.slice(0, -1)),
                        t
                }
            }),
            cc._RF.pop()
    }
        , {}],
    RoomManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3df85XvA0RERqUazbtPWkF/", "RoomManager");
        var n = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(t("Main"));
        cc.Class({
            extends: cc.Component,
            properties: {
                main: n.default,
                room: cc.Node,
                selector: cc.Node
            },
            init: function(t) {
                var e = this;
                this.main = t,
                    this.room = cc.find("Canvas/STAGE/ROOM"),
                    this.selector = this.node.getChildByName("Selector"),
                    this.selector.children.map(function(t) {
                        t.on("touchend", function(e) {
                            this.room.getComponent(cc.Sprite).spriteFrame = t.getComponent(cc.Sprite).spriteFrame
                        }, e)
                    })
            }
        }),
            cc._RF.pop()
    }
        , {
            Main: "Main"
        }],
    SaveLoad: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        cc._RF.push(e, "0b7aePvgWlIvoxf6s5qBpBD", "SaveLoad");
        n(t("var")),
            n(t("util"));
        cc.Class({
            extends: cc.Component,
            properties: {
                stage_data: null,
                stage: cc.Node
            },
            onLoad: function() {
                var t = this;
                this.stage = cc.find("Canvas/STAGE"),
                    cc.find("Canvas/RECOVER").on("touchstart", function() {
                        t.place()
                    }, this)
            },
            save: function() {},
            load: function() {},
            collect: function() {
                console.log("COLLECT");
                for (var t = this.getItemFromStage("GROUND"), e = 0; e < t.length; ++e)
                    console.log(t[e]);
                this.stage_data = t
            },
            place: function() {
                for (var t = 0; t < this.stage_data.length; ++t)
                    console.log(this.stage_data[t])
            },
            createItemAtStage: function() {},
            getItemFromStage: function(t) {
                return this.stage.getChildByName(t).children.map(function(t) {
                    return {
                        name: t.name,
                        type: t.getComponent("Instance").manager.node.name,
                        pos: t.position,
                        scale: t.getChildByName("Body").scale
                    }
                })
            }
        }),
            cc._RF.pop()
    }
        , {
            util: "util",
            var: "var"
        }],
    SnowManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fb978EIhJ5GpJ8dlz5uHUKK", "SnowManager"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    main: cc.Node,
                    snow_window: 0,
                    snow: cc.Node,
                    is_active: !1,
                    is_enabled: !0
                },
                init: function(t) {
                    this.main = t,
                        this.snow = cc.find("Canvas/SNOW").getComponent(cc.ParticleSystem),
                        this.is_active = !1,
                        this.is_enabled = cc._renderType == cc.game.RENDER_TYPE_WEBGL
                },
                addSnowWindow: function() {
                    this.snow_window += 1,
                    this.snow_window >= 1 && !this.is_active && this.is_enabled && (this.snow.resetSystem(),
                        this.is_active = !0)
                },
                removeSnowWindow: function() {
                    this.snow_window -= 1,
                    this.snow_window <= 0 && this.is_active && this.is_enabled && (this.snow.stopSystem(),
                        this.is_active = !1)
                }
            }),
            cc._RF.pop()
    }
        , {}],
    SnowWindow: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b95b7wmu9NBdoZsThpaXI8p", "SnowWindow"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    main: cc.Node
                },
                onLoad: function() {
                    this.main = cc.find("Canvas").getComponent("Main"),
                        this.main.snow_man.addSnowWindow()
                },
                onDestroy: function() {
                    this.main.snow_man.removeSnowWindow()
                }
            }),
            cc._RF.pop()
    }
        , {}],
    TabPanel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9e64c47aRVKfZuJx3DzmSOY", "TabPanel"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    game: cc.Node,
                    tab: cc.Node,
                    content: cc.Node
                },
                init: function(t) {
                    var e = this;
                    this.game = t,
                        this.tab = this.node.getChildByName("Tab"),
                        this.content = this.node.getChildByName("Content"),
                        this.tab.children.map(function(t) {
                            e.CheckTabActive(t, "Mom")
                        }),
                        this.tab.children.map(function(t) {
                            t.on("toggle", function(e) {
                                var i = this;
                                this.tab.children.map(function(e) {
                                    i.CheckTabActive(e, t.name)
                                }),
                                    this.content.children.map(function(e) {
                                        e.name == t.name ? e.active = !0 : e.active = !1
                                    })
                            }, e)
                        })
                },
                CheckTabActive: function(t, e) {
                    t.name == e ? (t.getChildByName("Label").color = new cc.Color(255,125,22,255),
                        t.getChildByName("Background").color = new cc.Color(247,246,245,255)) : (t.getChildByName("Label").color = new cc.Color(97,97,97,255),
                        t.getChildByName("Background").color = new cc.Color(255,255,255,255))
                }
            }),
            cc._RF.pop()
    }
        , {}],
    Turtle: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        cc._RF.push(e, "14492LgMHFKP7t4HXrAFZjv", "Turtle");
        n(t("var"));
        var a = n(t("util"))
            , c = n(t("Instance"));
        cc.Class({
            extends: c.default,
            properties: {
                anim: cc.Node,
                is_hide: !1,
                timer: null
            },
            onLoad: function() {
                c.default.prototype.onLoad.call(this),
                    this.anim = this.node.getChildByName("Body").getComponent(cc.Animation),
                    this.node.x = a.default.getRandomInt(-40, 40),
                    this.node.y = a.default.getRandomInt(-50, 50) + 150
            },
            onDragStart: function(t) {
                c.default.prototype.onDragStart.call(this, t),
                this.timer && clearTimeout(this.timer),
                this.is_hide || (this.is_hide = !0,
                    this.anim.play("hide"))
            },
            onDragEnd: function(t) {
                var e = this;
                c.default.prototype.onDragEnd.call(this, t),
                this.timer && clearTimeout(this.timer),
                    this.timer = setTimeout(function() {
                        e.anim.play("show"),
                            setTimeout(function() {
                                e.is_hide = !1
                            }, 1500)
                    }, 1e3 * a.default.getRandomInt(3, 15))
            },
            onDestroy: function() {
                c.default.prototype.onDestroy.call(this),
                this.timer && clearTimeout(this.timer)
            }
        }),
            cc._RF.pop()
    }
        , {
            Instance: "Instance",
            util: "util",
            var: "var"
        }],
    avatar: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "abb71Mrjh1Pg5VZUk3hMpSs", "avatar");
        cc.Class({
            extends: cc.Component,
            properties: {
                personManager: {
                    default: null,
                    type: cc.Node
                },
                remove: cc.Node,
                offset: cc.Vec2,
                skinname: "",
                scale: 1
            },
            init: function(t, e) {
                this.personManager = t,
                e && (this.scale = e),
                    this.remove = this.node.getChildByName("remove"),
                    this.remove.on("touchend", function(t) {
                        this.personManager.removeCharacter(this),
                            this.node.destroy()
                    }, this),
                    this.node.scale = .7 * this.scale,
                    this.node.on("touchstart", function(t) {
                        if (!this.personManager.game.isFreeze) {
                            this.node.setLocalZOrder(1);
                            var e = cc.scaleTo(.08, .749 * this.scale);
                            this.node.stopAllActions(),
                                this.node.runAction(e);
                            var i = cc.fadeOut(.3)
                                , n = cc.callFunc(function() {
                                this.remove.active = !1
                            }, this);
                            this.remove.stopAllActions(),
                                this.remove.active = !0,
                                this.remove.runAction(cc.sequence(cc.fadeTo(.2, 200), cc.delayTime(1), i, n)),
                                this.offset = cc.pSub(this.node.parent.convertToWorldSpace(this.node.getPosition()), t.getLocation()),
                                this.personManager.instance = this,
                                t.stopPropagation()
                        }
                    }, this),
                    this.node.on("touchmove", function(t) {
                        this.personManager.game.isFreeze || (this.node.x = t.getLocationX() + this.offset.x + 30,
                            this.node.y = t.getLocationY() + this.offset.y + 30,
                            t.stopPropagation())
                    }, this),
                    this.node.on("touchend", function(t) {
                        if (!this.personManager.game.isFreeze) {
                            this.node.setLocalZOrder(0);
                            var e = cc.scaleTo(.1, .8 * .7 * this.scale)
                                , i = cc.scaleTo(.1, .7 * this.scale);
                            cc.sequence(e, i);
                            this.node.runAction(i),
                                t.stopPropagation()
                        }
                    }, this),
                    this.node.on("touchcancle", function(t) {
                        if (!this.personManager.game.isFreeze) {
                            this.node.setLocalZOrder(0);
                            var e = cc.scaleTo(.1, .8 * .7 * this.scale)
                                , i = cc.scaleTo(.1, .7 * this.scale);
                            cc.sequence(e, i);
                            this.node.runAction(i);
                            var n = cc.fadeOut(.3)
                                , a = cc.callFunc(function() {
                                this.remove.active = !1
                            }, this);
                            this.remove.runAction(cc.sequence(cc.delayTime(1), n, a)),
                                t.stopPropagation()
                        }
                    }, this)
            },
            SetSkin: function(t) {
                var e = this.node.getChildByName("skin")
                    , i = e.getChildByName(t);
                null != i && 0 == i.active && (e.children.map(function(t) {
                    t.active = !1
                }),
                    i.active = !0,
                    this.skinname = t)
            },
            SetHat: function(t) {
                var e = this.node.getChildByName("hat")
                    , i = e.getChildByName(t);
                return null != i && (i.active ? (i.active = !1,
                        !1) : (e.children.map(function(t) {
                        t.active = !1
                    }),
                        i.active = !0,
                        !0))
            },
            SetEye: function(t) {
                var e = this.node.getChildByName("eye")
                    , i = e.getChildByName(t);
                return null != i && (i.active ? (i.active = !1,
                        !1) : (e.children.map(function(t) {
                        t.active = !1
                    }),
                        i.active = !0,
                        !0))
            },
            SetNeck: function(t) {
                var e = this.node.getChildByName("neck")
                    , i = e.getChildByName(t);
                return null != i && (i.active ? (i.active = !1,
                        !1) : (e.children.map(function(t) {
                        t.active = !1
                    }),
                        i.active = !0,
                        !0))
            }
        }),
            cc._RF.pop()
    }
        , {}],
    mta: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "20b48oAXRNCwYPe2Y7mJDhZ", "mta"),
            cc._RF.pop()
    }
        , {}],
    share: [function(t, e, i) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function a() {
            if (o) {
                o = !1;
                var t = document.getElementById("GameCanvas")
                    , e = document.getElementById("share")
                    , i = document.getElementById("Cocos2dGameContainer");
                e || ((e = document.createElement("img")).id = "share",
                    e.style.width = "100%",
                    e.style.height = "100%",
                    e.style.display = "none",
                    e.style.position = "absolute",
                    e.style.zIndex = "10",
                    i.appendChild(e));
                var n = t.toDataURL("image/png");
                n.length < 100 || (e.src = n,
                    e.style.height = i.style.height,
                    e.style.width = i.style.width,
                    e.style.padding = i.style.padding,
                    e.style.margin = i.style.margin,
                    t.style.display = "none",
                    e.style.display = "flex")
            }
        }
        cc._RF.push(e, "a76adQIWF1DVapQzBNv1mU9", "share");
        var c = n(t("var"))
            , s = n(t("util"))
            , o = !0;
        cc.Class({
            extends: cc.Component,
            properties: {
                panel: cc.Node,
                share_panel: cc.Node,
                share_btn: cc.Node,
                qr_img: cc.Node,
                delay: 0,
                main: cc.Node,
                error: cc.Node
            },
            init: function(t) {
                var e = this;
                this.main = t,
                    this.share_panel = cc.find("Canvas/SHARE_PANEL"),
                    this.panel = cc.find("Canvas/PANEL"),
                    this.share_btn = cc.find("Canvas/SHARE"),
                    this.qr_img = cc.find("Canvas/SHARE_PANEL/wechat/qr").getComponent(cc.Sprite),
                    this.error = cc.find("Canvas/DEBUG/ERROR").getComponent(cc.Label),
                    this.share_btn.active = !1,
                    this.stage = cc.find("Canvas/STAGE"),
                    this.share_btn.on("touchstart", function(t) {}, this),
                    this.share_btn.on("touchend", function(t) {
                        e.main.is_freeze = !0,
                            e.clearRemoveTag(),
                            e.fadeLogo().scaleStage().showSharePanel().showQR().showShare().showHint2().showLogoClickHint();
                        try {
                            e.createQR(s.default.getNormalizedURL() + "&CKTAG=mta_share.share_qrcode")
                        } catch (t) {
                            console.log(t),
                                MtaH5.clickStat("error", {
                                    detail1: t.message || t,
                                    ua: navigator.userAgent
                                })
                        }
                        window.MtaH5 && (MtaH5.clickStat("create", {
                            qudao: s.default.getParameterByName("ADTAG"),
                            kol: s.default.getParameterByName("k")
                        }),
                            MtaH5.clickStat("fangwen", {
                                create: "true"
                            }),
                            MtaH5.clickShare("share_qrcode"))
                    }, this),
                    this.setupWeixin()
            },
            setupWeixin: function() {
                window.wx && s.default.isWeixinBrowser && axios.post("http://wx.playstacking.com/wx/sign", {
                    url: location.href.split("#")[0]
                }).then(function(t) {
                    var e = t.data;
                    wx.config({
                        debug: !1,
                        appId: e.appId,
                        timestamp: e.timestamp,
                        nonceStr: e.nonceStr,
                        signature: e.signature,
                        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
                    });
                    var i, n, a, c = document.getElementById("share_icon_1"), o = document.getElementById("share_icon_2");
                    e.share ? (i = e.share.title,
                        n = e.share.desc,
                        a = 1 == e.share.img_type ? c.src : o.src) : (i = "????????????????????????????????????",
                        n = "??????????????????????????????????????????????????????",
                        a = c.src),
                        wx.ready(function() {
                            wx.onMenuShareTimeline({
                                title: i,
                                desc: n,
                                link: s.default.getNormalizedURL() + "&CKTAG=mta_share.share_timeline",
                                imgUrl: a,
                                success: function() {
                                    MtaH5.clickStat("share_timeline", {
                                        qudao: s.default.getParameterByName("ADTAG"),
                                        kol: s.default.getParameterByName("k")
                                    }),
                                        MtaH5.clickStat("fangwen", {
                                            share: "true"
                                        }),
                                        MtaH5.clickShare("share_timeline")
                                }
                            }),
                                wx.onMenuShareAppMessage({
                                    title: i,
                                    desc: n,
                                    link: s.default.getNormalizedURL() + "&CKTAG=mta_share.share_friend",
                                    imgUrl: a,
                                    success: function() {
                                        MtaH5.clickStat("share_friend", {
                                            qudao: s.default.getParameterByName("ADTAG"),
                                            kol: s.default.getParameterByName("k")
                                        }),
                                            MtaH5.clickStat("fangwen", {
                                                share: "true"
                                            }),
                                            MtaH5.clickShare("share_friend")
                                    }
                                })
                        }),
                        wx.error(function(t) {
                            console.log(t)
                        })
                })
            },
            clearRemoveTag: function() {
                null != this.main.selected_instance && this.main.selected_instance.HideFrame()
            },
            showLight: function() {
                var t = cc.find("Canvas/Light");
                return t.opacity = 0,
                    t.runAction(cc.sequence(cc.delayTime(this.delay), cc.fadeIn(.1), cc.fadeOut(.15), cc.fadeIn(.15), cc.fadeOut(.15))),
                    this.delay += .8,
                    this
            },
            fadeLogo: function() {
                var t = cc.find("Canvas/SHARE_PANEL/Background/logo");
                return this.main.is_mini ? (t.runAction(cc.sequence(cc.delayTime(this.delay), cc.spawn(cc.fadeOut(.2), cc.moveTo(.2, cc.v2(0, 30))))),
                    this.delay += .35) : t.active = !1,
                    this
            },
            showShare: function() {
                return this.share_panel.runAction(cc.sequence(cc.delayTime(this.delay), cc.callFunc(this.showImage, this))),
                    this.delay += .3,
                    this
            },
            scaleStage: function() {
                return this.stage.runAction(cc.sequence(cc.delayTime(this.delay), cc.scaleTo(.3, .96))),
                    this.delay += .3,
                    this
            },
            showSharePanel: function() {
                this.panel.active = !1,
                    this.share_panel.active = !0,
                    this.share_btn.active = !1;
                var t = this.share_panel.getChildByName("wechat")
                    , e = t.getChildByName("web");
                if (c.default.screen_ratio >= c.default.RATIO_THIN_SMALL) {
                    var i = t.getChildByName("qr");
                    i.scale = .75,
                        i.getComponent(cc.Widget).left = 85,
                        i.getComponent(cc.Widget).updateAlignment(),
                        e.scale = .6,
                        e.getComponent(cc.Widget).left = 275,
                        e.getComponent(cc.Widget).updateAlignment();
                    var n = t.getChildByName("logo");
                    n.scale = .6,
                        n.getComponent(cc.Widget).right = 80,
                        n.getComponent(cc.Widget).updateAlignment();
                    var a = t.getChildByName("click_hint");
                    a.scale = .85,
                        a.getComponent(cc.Widget).right = 88,
                        a.getComponent(cc.Widget).updateAlignment()
                }
                return t.opacity = 0,
                    this
            },
            showQR: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : .5
                    , e = this.share_panel.getChildByName("wechat");
                return e.opacity = 0,
                    e.runAction(cc.sequence(cc.delayTime(this.delay), cc.fadeIn(t))),
                    this.delay += t + .1,
                    this
            },
            showImage: function() {
                o = !0,
                    cc.director.once(cc.Director.EVENT_AFTER_DRAW, a)
            },
            showHint2: function() {
                var t = document.getElementById("web_hint_bot")
                    , e = document.getElementById("press_save")
                    , i = document.getElementById("snap_save")
                    , n = cc.view.getVisibleSize().height
                    , a = window.innerHeight / n * 350;
                t.style.display = "flex",
                    t.style.height = a + "px",
                    t.style.transform = "translate3d(0, " + (a + 5) + "px, 0)";
                var c = s.default.iOSVersion();
                return c && c < 10 ? e.style.display = "none" : s.default.isWeixinBrowser ? i.style.display = "none" : e.style.display = "none",
                    t.addEventListener("click", function() {
                        t.style.transform = "translate3d(0, " + (a + 5) + "px, 0)"
                    }, !1),
                    setTimeout(function() {
                        t.style.transform = "translate3d(0, 0, 0)",
                            setTimeout(function() {
                                t.style.transform = "translate3d(0, " + (a + 5) + "px, 0)"
                            }, 2500)
                    }, 1e3 * (this.delay + 1)),
                    this.delay += 3,
                    this
            },
            showHint: function() {
                var t = this
                    , e = document.getElementById("hint_img")
                    , i = document.getElementById("hint");
                i || (i = this.createHintDiv()),
                e || (e = this.createHintImg(),
                    i.appendChild(e));
                var n = s.default.iOSVersion();
                return n && n < 10 ? this.setImg(e, "hint_capture") : s.default.isWeixinBrowser ? this.setImg(e, "save_hint") : this.setImg(e, "hint_capture"),
                    setTimeout(function() {
                        t.showHintDiv(i)
                    }, 1e3 * (this.delay + 1)),
                    this.delay += 3,
                    this
            },
            createHintImg: function() {
                var t = document.createElement("img");
                return t.id = "hint_img",
                    t.style.width = "300px",
                    t
            },
            setImg: function(t, e) {
                t.src = document.getElementById(e).src
            },
            createHintDiv: function() {
                var t = document.createElement("div");
                return t.id = "hint",
                    t.style.display = "none",
                    t.style.width = "100%",
                    t.style.height = "100%",
                    t.style.position = "absolute",
                    t.style.top = "0",
                    t.style.left = "0",
                    t.style.zIndex = "25",
                    t.style.justifyContent = "center",
                    t.style.alignItems = "center",
                    t.style.opacity = "0",
                    t.style.webkitTransition = t.style.transition = "opacity 0.30s",
                    document.body.appendChild(t),
                    t.addEventListener("touchstart", function() {
                        t.style.opacity = 0,
                            setTimeout(function() {
                                t.style.display = "none"
                            }, 300)
                    }),
                    t
            },
            showHintDiv: function(t) {
                t.style.display = "flex",
                    t.style.opacity = 0,
                    setTimeout(function() {
                        t.style.opacity = 1,
                            setTimeout(function() {
                                t.style.opacity = 0,
                                    setTimeout(function() {
                                        t.style.display = "none"
                                    }, 300)
                            }, 2300)
                    }, 50)
            },
            showLogoClickHint: function() {
                var t = this
                    , e = s.default.isWeixinBrowser ? .5 : 2.5;
                return setTimeout(function() {
                    t.createClickHint()
                }, 1e3 * (this.delay + e)),
                    this
            },
            createClickHint: function() {
                var t = this.share_panel.getChildByName("wechat").getChildByName("click_hint")
                    , e = cc.view.getScaleX()
                    , i = t.getComponent(cc.Widget).right
                    , n = document.createElement("div");
                n.style.width = " 80px",
                    n.style.height = " 100px",
                    n.style.position = "absolute",
                    n.style.bottom = "22px",
                    n.style.right = i * e - 40 + "px",
                    n.style.zIndex = " 55",
                    n.style.webkitTransition = n.style.transition = "opacity 0.25s",
                    n.style.textAlign = "center",
                    n.style.opacity = "1",
                    document.body.appendChild(n),
                    n.addEventListener("click", function() {
                        MtaH5.clickStat("fangwen", {
                            gotomain: "true"
                        }),
                            s.default.isWeixinBrowser ? (MtaH5.clickStat("goto_weixin", {
                                qudao: s.default.getParameterByName("ADTAG"),
                                kol: s.default.getParameterByName("k")
                            }),
                                setTimeout(function() {
                                    window.open("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxNTM0MzU2Mw==&scene=124#wechat_redirect")
                                }, 30)) : (MtaH5.clickStat("goto_weibo", {
                                qudao: s.default.getParameterByName("ADTAG"),
                                kol: s.default.getParameterByName("k")
                            }),
                                setTimeout(function() {
                                    window.open("https://weibo.com/pupupula")
                                }, 30))
                    })
            },
            createAnimation: function() {
                var t = document.createElement("style");
                t.type = "text/css";
                t.innerHTML = "      @keyframes fading {          0% {opacity 0;} 50% {opacity:80} 100% {opacity: 0;}      }      @-webkit-keyframes fading {          0% {opacity 0;} 50% {opacity:80} 100% {opacity: 0;}      }      @-moz-keyframes fading {          0% {opacity 0;} 50% {opacity:80} 100% {opacity: 0;}      }    ",
                    document.getElementsByTagName("head")[0].appendChild(t)
            },
            createQR: function(t) {
                var e = this
                    , i = document.createElement("div");
                i.id = "qrcode",
                    i.style.display = "none",
                    document.body.appendChild(i);
                new QRCode(i,{
                    text: t,
                    width: 200,
                    height: 200,
                    colorDark: "#222222",
                    colorLight: "#F6F6F6",
                    correctLevel: QRCode.CorrectLevel.M
                });
                var n = i.getElementsByTagName("img")[0];
                setTimeout(function() {
                    var t = new cc.Texture2D;
                    t.initWithElement(n),
                        t.handleLoadedTexture();
                    var i = new cc.SpriteFrame(t);
                    e.qr_img.spriteFrame = i
                }, 200)
            }
        }),
            cc._RF.pop()
    }
        , {
            util: "util",
            var: "var"
        }],
    util: [function(t, e, i) {
        "use strict";
        function n(t, e) {
            e || (e = window.location.href),
                t = t.replace(/[\[\]]/g, "\\$&");
            var i = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
            return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
        }
        cc._RF.push(e, "c018eEQJsNFTZCV/1az62gU", "util");
        var a = /micromessenger/i.test(navigator.userAgent);
        e.exports = {
            getChildByPath: function(t, e) {
                for (var i, n = e.split("/"), a = t, c = 0; c < n.length; c++) {
                    if (null == (i = a.getChildByName(n[c])))
                        return null;
                    a = i
                }
                return a
            },
            getRandomInt: function(t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t
            },
            getParameterByName: n,
            getNormalizedURL: function() {
                var t = n("ADTAG")
                    , e = n("k")
                    , i = (t = "-1" == t ? "IMG" : t) ? "?ADTAG=" + t : "?ADTAG=-1"
                    , a = e ? "&k=" + e : "&k=-1"
                    , c = n("r") ? "&r=1" : ""
                    , s = parseInt(n("d"))
                    , o = isNaN(s) ? "&d=1" : "&d=" + (s + 1);
                return location.protocol + "//" + location.host + location.pathname + i + a + c + o
            },
            isWeixinBrowser: a,
            iOSVersion: function() {
                if (window.MSStream)
                    return !1;
                var t, e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                return void 0 !== e && null !== e && (t = e[1] + "." + e[2],
                        console.log(t),
                        parseFloat(t))
            }
        },
            cc._RF.pop()
    }
        , {}],
    var: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "b76ebHG1q5Fx5IJFFdWK5K7", "var");
        e.exports = {
            init: function(t) {
                t = t || {
                        r: !1
                    };
                var e = cc.view.getVisibleSize().width
                    , i = cc.view.getVisibleSize().height;
                i / e < 1.4 ? (this.screen_ratio = 0,
                    this.SCALE_FACTOR = .92) : i / e > 2 ? (this.screen_ratio = 3,
                    this.SCALE_FACTOR = .7) : i / e > 1.85 ? (this.screen_ratio = 2,
                    this.SCALE_FACTOR = .75) : (this.screen_ratio = 1,
                    this.SCALE_FACTOR = .85),
                t.r && (this.MIN_ROTATE = -180,
                    this.MAX_ROTATE = 180)
            },
            SCALE_FACTOR: .85,
            screen_ratio: 1,
            RATIO_THICK: 0,
            RATIO_MEDIUM: 1,
            RATIO_THIN_SMALL: 2,
            RATIO_THIN: 3,
            MIN_ROTATE: 0,
            MAX_ROTATE: 0,
            VERSION: "1.0.35"
        },
            cc._RF.pop()
    }
        , {}]
}, {}, ["AccessManager", "BGManager", "Game", "HelloWorld", "PersonManager", "AdultManager", "AdultPanel", "Frog", "GridSize", "Instance", "InstanceManager", "Main", "PartAttr", "RoomManager", "SaveLoad", "SnowManager", "SnowWindow", "Turtle", "mta", "share", "OffsetChecker", "util", "var", "TabPanel", "avatar"]);
/**
 * Created by jason on 2018/4/30.
 */
