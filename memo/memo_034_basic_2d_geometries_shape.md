## 034_basic_2d_geometries_shape

``THREE.ShapeGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``ShapeGeometry``**
  1つ以上のパス形状から片面多角形ジオメトリを作成
  https://threejs.org/docs/#api/en/geometries/ShapeGeometry

  ```javascript
  // constructor
  ShapeGeometry(shapes : Array, curveSegments : Integer)
  // - thetaSegments: セグメント数。数値が大きいほど、リングは丸くなる。最小値=3, デフォルト値=8
  
  // code example
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();
  heartShape.moveTo( x + 5, y + 5 );
  heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
  heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
  heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
  heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
  heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
  heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
  const geometry = new THREE.ShapeGeometry( heartShape );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const mesh = new THREE.Mesh( geometry, material ) ;
  scene.add( mesh );
  ```



- **``THREE.Shape``**
  オプションの穴のあるパスを使用して、任意の2次元形状平面を定義。 ``ExtrudeGeometry``、``ShapeGeometry``と一緒に使用して点を取得したり、三角面を取得したりできる
  https://threejs.org/docs/#api/en/extras/core/Shape

  ```javascript
  // constructor
  Shape( points : Array )
  // - points : 点からShapeを作成します. 最初の点はオフセットを定義し、それから連続する点はLineCurvesとして曲線配列に追加. 点が指定されていない場合は、空の図形が作成され、.currentPointが原点に設定される
  
  // code example
  const heartShape = new THREE.Shape();
  heartShape.moveTo( 25, 25 );
  heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
  heartShape.bezierCurveTo( 30, 0, 30, 35,30,35 );
  heartShape.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
  heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
  heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
  heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
  const extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
  const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
  const mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
  ```



- 

---
### メモ

- **``THREE.ShapeGeometry``**
  独自の2次元形状を作成
  必須プロパティなし

- **``THREE.Shape``**

- **``THREE.Path``**

- **``THEE.Shape.holes : array``**

- 


------

### 参考

- 
