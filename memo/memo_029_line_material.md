## 029_line_material

``THREE.LineBasicMaterial``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``LineBasicMaterial``**
  ワイヤーフレームスタイルの図形を描画するためのマテリアル
  https://threejs.org/docs/#api/en/materials/LineBasicMaterial

  ```javascript
  // constructor
  LineBasicMaterial( parameters : Object )
  // code example
  const material = new THREE.LineBasicMaterial( {
  	color: 0xffffff,
  	linewidth: 1,
  	linecap: 'round', //ignored by WebGLRenderer
  	linejoin:  'round' //ignored by WebGLRenderer
  } );
  ```



- **``Line``**
  実線。LineSegmentsとほぼ同じ。唯一の違いは、gl.LINESの代わりにgl.LINE_STRIPを使ってレンダリングされる
  https://threejs.org/docs/#api/en/objects/Line

  ```javascript
  // constructor
  Line( geometry : Geometry, material : Material )
  // code example
  const material = new THREE.LineBasicMaterial({
  	color: 0x0000ff
  });
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
  	new THREE.Vector3( -10, 0, 0 ),
  	new THREE.Vector3( 0, 10, 0 ),
  	new THREE.Vector3( 10, 0, 0 )
  );
  const line = new THREE.Line( geometry, material );
  scene.add( line );
  ```



- 

---
### メモ

- **``THREE.LineBasicMaterial``**
  ラインのための基本的なマテリアル。``TRHEE.Line``だけで利用できる
  法線が指す方向が面の色の決定に使用
  球などの場合、構成する面の法線はすべて違う方向を向いていて、各法線の間は滑らかに補間される
  る
- **``vetexColors``**
  ``TRHEE.VertexColors``を設定すると、各頂点ごとに特定の色を設定できる
- **``setHSL``**
  HSLカラーを設定
  https://threejs.org/docs/#api/en/math/Color.setHSL
- 

------

### 参考

- ゴスパー曲線（Gosper Curve）
  2次元の領域を満たすアルゴリズム
  https://en.wikipedia.org/wiki/Gosper_curve
- 
