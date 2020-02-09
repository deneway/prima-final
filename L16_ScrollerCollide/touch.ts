
namespace L16_ScrollerCollide {
    import ƒ = FudgeCore;
  
    export class Hitbox extends ƒ.Node {
      private static mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
      private static material: ƒ.Material = new ƒ.Material("Hitbox", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("black", 0.5)));
      private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
  
      public constructor(_name?: string) {

        if(_name){
          super(_name);
        }else{
          super("Hitbox");
        }
        this.addComponent(new ƒ.ComponentTransform());
        this.addComponent(new ƒ.ComponentMaterial(Hitbox.material));
        let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Hitbox.mesh);
        //cmpMesh.pivot.translateY(-0.5);
        cmpMesh.pivot = Hitbox.pivot;
        this.addComponent(cmpMesh);
      
      }
  
      public getRectWorld(): ƒ.Rectangle {
        let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
        let topleft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
        let bottomright: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);
        
        //let pivot: ƒ.Matrix4x4 = this.getComponent(ƒ.ComponentMesh).pivot;
        let mtxResult: ƒ.Matrix4x4 = ƒ.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
        topleft.transform(mtxResult, true);
        bottomright.transform(mtxResult, true);
  
        let size: ƒ.Vector2 = new ƒ.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
        rect.position = topleft.toVector2();
        rect.size = size;
  
        return rect;
      }

      public checkCollision(): void {

        for (let floor of level.getChildren()) {

          if (floor.name == "Hitbox") {
            let hit: boolean = false;
            let rectOfThis: ƒ.Rectangle = (<Hitbox>this).getRectWorld();
            let rectOfThat: ƒ.Rectangle = (<Hitbox>floor).getRectWorld();
            let expansionRight: ƒ.Vector2 = new ƒ.Vector2(rectOfThat.size.x);
            let expansionDown: ƒ.Vector2 = new ƒ.Vector2(0 , rectOfThat.size.y);
            let topRight: ƒ.Vector2 = ƒ.Vector2.SUM(rectOfThat.position, expansionRight);
            let bottomLeft: ƒ.Vector2 = ƒ.Vector2.SUM(rectOfThat.position, expansionDown);
            let bottomRight: ƒ.Vector2 = ƒ.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);

            if (rectOfThis.isInside(rectOfThat.position)) {
              hit = true;
            } else if (rectOfThis.isInside(topRight)) {
              hit = true;
            } else if (rectOfThis.isInside(bottomLeft)) {
              hit = true;
            } else if (rectOfThis.isInside(bottomRight)) {
              hit = true;
            }

            if (hit) {
              ƒ.Debug.log("HIT");
            }
          } else {
            continue;
          }

        }
      }
    }
  }