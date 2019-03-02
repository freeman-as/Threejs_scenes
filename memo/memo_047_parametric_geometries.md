## 047_parametric_geometries

``THREE.ParametricGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``ParametricGeometry``**
  パラメトリック曲面を表すジオメトリを生成
  https://threejs.org/docs/#api/en/geometries/ParametricGeometry

  ```javascript
  // constructor
  ParametricGeometry(func : Function, slices : Integer, stacks : Integer)
  // - func: それぞれ0から1の間のuとvの値を取り込み、3番目のVector3引数を変更する関数
  // - slices: パラメトリック関数に使用するスライスの数
  // - stacks: パラメトリック関数に使用するスタック数
  
  // code example
  const geometry = new THREE.ParametricGeometry( THREE.ParametricGeometries.klein, 25, 25 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const klein = new THREE.Mesh( geometry, material );
  scene.add( klein );
  ```



- 

---
### メモ

- **``THREE.ParametricGeometry``**
  方程式に基づいてジオメトリを作成
  ジオメトリを生成するための方程式を規定した関数を引数にとる
  引数として渡す関数の第3引数がオプションから必須になったので注意
  ``source``
  https://github.com/mrdoob/three.js/blob/dev/examples/js/ParametricGeometries.js
- **``THREE.ParametricGeometry.func``**
  関数の引数として与えられる``u``, ``v``の値に応じて頂点座標を定義する関数
  ``u``と``v``は``0~1``の値を取る
  ``u``の値はベクトルの``x座標``を決める
  ``v``の値はベクトルの``z座標``を決める
- **``THREE.ParametricGeometry.slices``**
  ``u``の分割数
- **``THREE.ParametricGeometry.stacks``**
  ``v``の分割数
- 

------

### 参考

- 
