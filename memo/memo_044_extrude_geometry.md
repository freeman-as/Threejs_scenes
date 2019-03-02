## 044_extrude_geometry

``THREE.ExtrudeGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``ExtrudeGeometry``**
  パスシェイプから押し出されたジオメトリを作成
  https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry

  ```javascript
  // constructor
  ExtrudeGeometry(shapes : Array, options : Object)
  // - shapes: 形状または形状の配列
  
  // code example
  const length = 12, width = 8;
  const shape = new THREE.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo( 0, width );
  shape.lineTo( length, width );
  shape.lineTo( length, 0 );
  shape.lineTo( 0, 0 );
  const extrudeSettings = {
  	steps: 2,
  	depth: 16,
  	bevelEnabled: true,
  	bevelThickness: 1,
  	bevelSize: 1,
  	bevelSegments: 1
  };
  const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const mesh = new THREE.Mesh( geometry, material ) ;
  scene.add( mesh );
  ```



- 

---
### メモ

- **``THREE.ExtrudeGeometry``**
  2次元形状から3次元形状を押し出してジオメトリを作成
  押し出す：2次元形状をその法線方向に引き伸ばして3次元にすること
- **``options.steps``**
  押し出す方向にいくつのセグメントに分割するか指定
- **``options.depth``**
  どのくらいの距離(深さ)を押し出すか指定
- **``options.bevelThickness``**
  ベベルの深さを指定
  ベベル：押し出された前面と後面の間の丸みのついた角のこと
- **``options.bevelSize``**
  ベベルの高さを指定。この高さは形状の通常の高さに追加される
- **``options.curveSegments``**
  形状の曲線を押し出すときにセグメントをいくつ使用するか指定
- **``options.extrudePath``**
  形状が押し出される方向を指定するパス(``THREE.CurvePath``)。指定がなければz軸に沿って押し出される
- 

------

### 参考

- 
