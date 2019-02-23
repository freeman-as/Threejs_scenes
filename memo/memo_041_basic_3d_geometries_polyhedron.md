## 041_basic_3d_geometries_polyhedron

``THREE.PolyhedronGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``PolyhedronGeometry``**
  多面体は、平面を持つ3次元のソリッド。このクラスは頂点の配列を取り、それらを球に投影してから、それらを目的の詳細レベルに分割する
  https://threejs.org/docs/#api/en/geometries/PolyhedronGeometry

  ```javascript
  // constructor
  PolyhedronGeometry(vertices : Array, indices : Array, radius : Float, detail : Integer)
  // - vertices: フォームのポイント
  // - indices: フォームの面を構成するインデックス
  // - radius: 最終形状の半径
  // - detail: ジオメトリを細分化するレベル数. 大きいほど、形状は滑らかになる
  
  // code example
  const verticesOfCube = [
      -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
      -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
  ];
  const indicesOfFaces = [
      2,1,0,    0,3,2,
      0,4,7,    7,3,0,
      0,1,5,    5,4,0,
      1,2,6,    6,5,1,
      2,3,7,    7,6,2,
      4,5,6,    6,7,4
  ];
  const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
  ```



- **``IcosahedronGeometry``**
  正二十面体形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry

  ```javascript
  // constructor
  IcosahedronGeometry(radius : Float, detail : Integer)
  ```



- **``TetrahedronGeometry``**
  正四面体形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry

  ```javascript
  // constructor
  TetrahedronGeometry(radius : Float, detail : Integer)
  ```



- **``OctahedronGeometry``**
  正八面体形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/OctahedronGeometry

  ```javascript
  // constructor
  OctahedronGeometry(radius : Float, detail : Integer)
  ```



- **``DodecahedronGeometry``**
  正十二面体形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry

  ```javascript
  // constructor
  DodecahedronGeometry(radius : Float, detail : Integer)
  ```



- 

---
### メモ

- **``THREE.PolyhedronGeometry``**
  多面体を作成。多面体とは平らな面と直線の辺だけからなる形状
  直接使用することはほとんどない
  頂点や面を直接指定しなくても利用できる正多面体がいくつかある
  直接利用する場合は頂点や面を指定する必要がある
- **``vertices``**
  多面体を構成する座標
- **``indices``**
  面を構成する頂点のインデックス
- **``radius``**
  多面体のサイズ
- **``detail``**
  多面体をより詳細にすることができる
  1に設定すると三角ポリゴンがそれぞれ4つのさらに小さな三角形に分割される
  以降数値を増やすごとに再帰的に分割される
- 

------

### 参考

- 
