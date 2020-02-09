"use strict";
// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerCollide;
// / <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerCollide) {
    var ƒ = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
        ACTION["DUCK"] = "Duck";
        ACTION["RUN"] = "Run";
        ACTION["SLIDE"] = "Slide";
        ACTION["ATTACK"] = "Attack";
    })(ACTION = L16_ScrollerCollide.ACTION || (L16_ScrollerCollide.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = L16_ScrollerCollide.DIRECTION || (L16_ScrollerCollide.DIRECTION = {}));
    class Hare extends ƒ.Node {
        constructor(_name = "Hare") {
            super(_name);
            // private action: ACTION;
            // private time: ƒ.Time = new ƒ.Time();
            this.speed = ƒ.Vector3.ZERO();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Hare.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision();
            };
            this.addComponent(new ƒ.ComponentTransform());
            for (let sprite of Hare.sprites) {
                let nodeSprite = new L16_ScrollerCollide.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(ACTION.IDLE);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Hare.sprites = [];
            let sprite = new L16_ScrollerCollide.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 220, 150, 150), 9, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 70, 150, 150), 11, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.JUMP);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 370, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.DUCK);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 520, 150, 150), 4, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Hare.sprites.push(sprite);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(525, 520, 150, 150), 1, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.RUN);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 671, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.SLIDE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 820, 150, 150), 3, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Hare.sprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(ACTION.ATTACK);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 972, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Hare.sprites.push(sprite);
        }
        show(_action) {
            if (_action == ACTION.JUMP)
                return;
            for (let child of this.getChildren())
                child.activate(child.name == _action);
            // this.action = _action;
        }
        act(_action, _direction) {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Hare.speedWalk.x; // * direction;
                    this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
                    console.log(direction);
                    break;
                case ACTION.SLIDE:
                    // let directionslide: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    // this.speed.x = Hare.speedWalk.x; //Hare.speedWalk.x; // * direction;
                    // this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * directionslide);
                    break;
                case ACTION.ATTACK:
                    break;
                case ACTION.JUMP:
                    if (this.speed.y != 0) {
                        break;
                    }
                    else {
                        this.speed.y = 3;
                        break;
                    }
                case ACTION.DUCK:
                    this.speed.x = 0;
                    break;
                case ACTION.RUN:
                    this.speed.x = Hare.speedRun.x; // * direction;
            }
            this.show(_action);
        }
        checkCollision() {
            for (let floor of L16_ScrollerCollide.level.getChildren()) {
                let rect = floor.getRectWorld();
                //console.log(rect.toString());
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }
    }
    Hare.speedWalk = new ƒ.Vector2(1, 5); // units per second
    Hare.speedRun = new ƒ.Vector2(1.5, 5);
    Hare.gravity = ƒ.Vector2.Y(-3);
    L16_ScrollerCollide.Hare = Hare;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Hare.js.map