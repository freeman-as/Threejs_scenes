## 046_extrude_svg

``THREE.ExtrudeGeometry``を使ったThree.js形式へ変換されたSVGソースの押し出し

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
  ``THREE.ShapeGeometry``が2次元形状を描画するのに``SVG``とほとんど同じ方法を使用している
  そのため``SVG``は``Three.js``内部の2次元形状の扱いと非常に相性がよい
- **``d3-threeD``**
  ``SVGパス``から``Three.js``の2次元形状表現に変換可能な機能を持つライブラリ
  ``Lib URL: ``https://github.com/asutherland/d3-threeD
  押し出す方向にいくつのセグメントに分割するか指定
- **``SVG (Scalable Vector Graphics)``**
  ウェブで利用できるベクター形式の2次元画像を作成するためのXMLに基づいた標準仕様
  **d属性**に形状を描画するためのパスステートメントを含める
- **``transformSVGPathExposed(pathStr)``**
  ``d3-threeD``ライブラリによって提供される関数で``SVG``から``Three.js``形式に変換
  ``pathStr:``SVG文字列を引数として渡す
- 

------

### 参考

- 
