"use strict";
var L16_ScrollerCollide;
(function (L16_ScrollerCollide) {
    var ƒ = FudgeCore;
    let OBJECT;
    (function (OBJECT) {
        OBJECT["DIRTLEFT"] = "Dirtleft";
        OBJECT["DIRTMIDDLE"] = "Dirtmiddle";
        OBJECT["DIRTRIGHT"] = "Dirtright";
        OBJECT["DIRT"] = "Dirt";
    })(OBJECT = L16_ScrollerCollide.OBJECT || (L16_ScrollerCollide.OBJECT = {}));
    class Dirt extends ƒ.Node {
        constructor(_name = "Dirt") {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform());
            for (let sprite of Dirt.dirtsprites) {
                let nodeSprite = new L16_ScrollerCollide.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.show(OBJECT.DIRT);
        }
        static generateSprites(_txtImage) {
            Dirt.dirtsprites = [];
            let sprite = new L16_ScrollerCollide.Sprite(OBJECT.DIRTLEFT);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 220, 150, 150), 9, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER);
            Dirt.dirtsprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(OBJECT.DIRTMIDDLE);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 70, 150, 150), 11, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Dirt.dirtsprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(OBJECT.DIRTRIGHT);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 370, 150, 150), 7, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Dirt.dirtsprites.push(sprite);
            sprite = new L16_ScrollerCollide.Sprite(OBJECT.DIRT);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(75, 520, 150, 150), 4, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Dirt.dirtsprites.push(sprite);
            sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(525, 520, 150, 150), 1, ƒ.Vector2.ZERO(), 200, ƒ.ORIGIN2D.BOTTOMCENTER); //Position Hase (Bild an sich//Auschnitt(PositionInnerhalbLR/..ObenUNten//KA//Größe//)
            Dirt.dirtsprites.push(sprite);
        }
        show(_object) {
        }
    }
    L16_ScrollerCollide.Dirt = Dirt;
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=DirtSand.js.map