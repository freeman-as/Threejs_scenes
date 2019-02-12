## 009_geometries

Three.jsで利用できる標準的なジオメトリ一覧

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Vector3()``**
  3Dベクトルを表すクラス3Dベクトルは、（x、y、およびzとラベル付けされた）順序付けられた数字のトリプレットです。
  https://threejs.org/docs/index.html#api/en/math/Vector3

  ```javascript
  Vector3( x : Float, y : Float, z : Float )
  // example code
  var a = new THREE.Vector3( 0, 1, 0 );
  //no arguments; will be initialised to (0, 0, 0)
  var b = new THREE.Vector3( );
  var d = a.distanceTo( b );
  ```




- 

---
### メモ

- **ジオメトリ**
  基本的に**頂点群**と呼ばれる3D空間での座標の集合とそれらの点をつないでまとめた数多くの面のこと
- **頂点群 (vertices)**
- **頂点 (vertex)**
- **面 (face)**
  常に3つの頂点からなる三角形
- 

------

### 参考

- threejsのビルド方法

  https://github.com/mrdoob/three.js/wiki/Build-instructions

- three npm

  https://www.npmjs.com/package/three
