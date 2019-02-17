## 024_multi_material

各面ごとにマテリアルを適用する

---
### 使用したThree.jsのAPIについて(抜粋)

- **``面ごとに異なるマテリアルを設定する方法``**

  1. ``Material``の配列を作成
  2. ``Mesh``を作成するときに配列の値で指定

  ```javascript
  // code example
  // Materialの配列作成
  const materials = [
      new THREE.MeshBasicMaterial({color: 0x009e60}),
      new THREE.MeshBasicMaterial({color: 0x009e60}),
      new THREE.MeshBasicMaterial({color: 0x0051ba}),
      new THREE.MeshBasicMaterial({color: 0x0051ba}),
      new THREE.MeshBasicMaterial({color: 0xffd500}),
      new THREE.MeshBasicMaterial({color: 0xffd500}),
      new THREE.MeshBasicMaterial({color: 0xff5800}),
      new THREE.MeshBasicMaterial({color: 0xff5800}),
      new THREE.MeshBasicMaterial({color: 0xC41E3A}),
      new THREE.MeshBasicMaterial({color: 0xC41E3A}),
      new THREE.MeshBasicMaterial({color: 0xffffff}),
      new THREE.MeshBasicMaterial({color: 0xffffff})
  ];
  
  // Meshの作成時にMaterialの配列を指定
  const cubeGeom = new THREE.BoxGeometry(5, 5, 5);
  const cube = new THREE.Mesh(cubeGeom, materials);
  ```



- 

---
### メモ

- **``複数material指定時の面の適用方法``**
  ``geometry.faces``配列内のそれぞれの面に設定されている``materialIndex``プロパティを見て、適用するマテリアルを決定している
- 

------

### 参考

- **``THREE.MultiMaterial is Deprecated.``**
  r85で削除された
  https://www.kabuku.co.jp/developers/threejs_r85
  https://github.com/mrdoob/three.js/issues/10931
- 
