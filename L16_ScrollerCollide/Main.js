"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L16_ScrollerCollide;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L16_ScrollerCollide) {
    L16_ScrollerCollide.ƒ = FudgeCore;
    L16_ScrollerCollide.Sprite = L14_ScrollerFoundation.Sprite;
    L16_ScrollerCollide.NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let hare;
    let dolly = 1.9;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtHare = new L16_ScrollerCollide.ƒ.TextureImage();
        txtHare.image = img;
        L16_ScrollerCollide.Hare.generateSprites(txtHare);
        // Dirt.generateSprites(txtHare);
        L16_ScrollerCollide.ƒ.RenderManager.initialize(true, false);
        L16_ScrollerCollide.game = new L16_ScrollerCollide.ƒ.Node("Game");
        hare = new L16_ScrollerCollide.Hare("Hare");
        //Dirt = new Dirt("Dirt");
        L16_ScrollerCollide.level = createLevel();
        L16_ScrollerCollide.game.appendChild(L16_ScrollerCollide.level);
        L16_ScrollerCollide.game.appendChild(hare);
        let cmpCamera = new L16_ScrollerCollide.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        //cmpCamera.pivot.lookAt(ƒ.Vector3.Z(4));
        cmpCamera.pivot.translateX(dolly);
        cmpCamera.backgroundColor = L16_ScrollerCollide.ƒ.Color.CSS("lightblue");
        let viewport = new L16_ScrollerCollide.ƒ.Viewport();
        viewport.initialize("Viewport", L16_ScrollerCollide.game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L16_ScrollerCollide.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L16_ScrollerCollide.ƒ.Loop.start(L16_ScrollerCollide.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == L16_ScrollerCollide.ƒ.KEYBOARD_CODE.W && _event.type == "keydown")
            hare.act(L16_ScrollerCollide.ACTION.JUMP);
        if (_event.code == L16_ScrollerCollide.ƒ.KEYBOARD_CODE.S && _event.type == "keydown")
            hare.act(L16_ScrollerCollide.ACTION.SLIDE);
    }
    function processInput() {
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.A]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.LEFT);
            if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.S]) {
                hare.act(L16_ScrollerCollide.ACTION.SLIDE, L16_ScrollerCollide.DIRECTION.LEFT);
                return;
            }
            return;
        }
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.D]) {
            hare.act(L16_ScrollerCollide.ACTION.WALK, L16_ScrollerCollide.DIRECTION.RIGHT);
            //dolly = dolly-1;
            if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.S]) {
                hare.act(L16_ScrollerCollide.ACTION.SLIDE, L16_ScrollerCollide.DIRECTION.RIGHT);
                return;
            }
            return;
        }
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.S]) {
            hare.act(L16_ScrollerCollide.ACTION.DUCK);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.F]) {
            hare.act(L16_ScrollerCollide.ACTION.RUN, L16_ScrollerCollide.DIRECTION.RIGHT);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.W]) {
            hare.act(L16_ScrollerCollide.ACTION.JUMP);
            return;
        }
        if (keysPressed[L16_ScrollerCollide.ƒ.KEYBOARD_CODE.E]) {
            hare.act(L16_ScrollerCollide.ACTION.ATTACK);
            return;
        }
        //Dirt.act(OBJECT.DIRT);
        hare.act(L16_ScrollerCollide.ACTION.IDLE);
    }
    function createLevel() {
        let level = new L16_ScrollerCollide.ƒ.Node("Level");
        let floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(2.3);
        floor.cmpTransform.local.translateY(0.2);
        floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);
        floor = new L16_ScrollerCollide.Floor();
        floor.cmpTransform.local.scaleY(0.8);
        floor.cmpTransform.local.scaleX(3);
        floor.cmpTransform.local.translateY(0.3);
        floor.cmpTransform.local.translateX(4);
        level.appendChild(floor);
        return level;
    }
})(L16_ScrollerCollide || (L16_ScrollerCollide = {}));
//# sourceMappingURL=Main.js.map