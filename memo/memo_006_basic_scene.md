## 006_basic_scene

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Object3D``**
  three.jsのほとんどのオブジェクトの基本クラスであり、3D空間でオブジェクトを操作するための一連のプロパティとメソッドを提供
  https://threejs.org/docs/#api/en/core/Object3D

  ```javascript
  // constructor
  Object3D()
  ```




- **``Object3D.children``**
  子要素を保持できる配列のプロパティ
  https://threejs.org/docs/index.html#api/en/core/Object3D.children

  ```javascript
  children : Object3D
  // sample code
  // シーンが保持しているすべてのオブジェクト数
  scene.children.length
  ```



- **``Object3D.name``**
  オブジェクトのオプションの名前
  シーン内のオブジェクトに直接アクセスするためのキーとしても使える
  https://threejs.org/docs/index.html#api/en/core/Object3D.name

  ```javascript
  name : String
  // オブジェクトの名前を指定して直接取り出す
  Scene.getObjectByName(name)
  ```



- **``Object3D.remove()``**
  オブジェクトをシーンから削除
  https://threejs.org/docs/index.html#api/en/core/Object3D.remove

  ```javascript
  remove ( object : Object3D, ... ) : null
  ```



- **``Object3D.getObjectByName()``**
  オブジェクトの子を検索し、最初の名前と一致する名前を返す。ほとんどのオブジェクトでは、名前はデフォルトで空の文字列なので、手動で設定する必要がある
  https://threejs.org/docs/index.html#api/en/core/Object3D.getObjectByName

  ```javascript
  getObjectByName ( name : String ) : Object3D
  ```



- **``Object3D.traverse()``**
  callback - 最初の引数としてobject3Dオブジェクトを持つ関数。このオブジェクトとそのすべての子孫に対してコールバックを実行
  ``traverse()``は子要素のすべての子要素に対して再帰的に呼び出されるので、一度の呼び出しでシーングラフ全体を走査できる
  https://threejs.org/docs/index.html#api/en/core/Object3D.traverse

  ```javascript
  traverse ( callback : Function ) : null
  ```





- 

---
### メモ

- 


------

### 参考

- 
