# Nuxt.js Totorial

## 特徴

 - Vue.jsでSSRを行うためのフレームワーク
 - SSRした結果を静的ファイルとして書き出すこともできる
 - webpackの設定がすでにされている
 - Vue Routerの設定なしでルーティング設定ができる

 ※SSR HTMLを構築する仕組みがサーバー側にもクライアント側にも備わっていること

### プロジェクトの作成

```
$ npx create-nuxt-app sample-app
```

### 開発用ローカルサーバーの起動

```
$ npm run dev
```

## VueCLIとどちらを使う？

下記、実装する場合はNuxt.jsを使った方が楽

- ルーティングが必要
- SSRが必要
- 認証が必要

## ディレクトリについて

Nuxt.jsをinstallすると下記ディレクトリ/ファイルが作られる

```
├── nuxt.config.js
├── assets
├── static
├── components
├── layouts
├── pages
├── middleware
├── plugins
└── store
```

### nuxt.config.js

- Nuxt.jsアプリケーションの設定ファイル
- plugins/middlewareなどの設定、webpackの拡張

### assets

- コンパイルされていないsassファイルやjsファイルを管理
- vue-loaderによってコンパイルなどの処理が行われる

### static

- webpackを通す必要のないimgファイルなどの静的なファイルを管理
- staticディレクトリにimage.pngを置いた場合、アプリケーション内では/image.pngで参照

### components

- Vue.jsのコンポーネントを管理

### layouts

- 共通のレイアウト、個別のレイアウトなどを管理
- ページコンポーネントからレイアウトを指定
- ```create-nuxt-app```で作成するとデフォルトのレイアウトコンポーネントとして、```/layouts/default.vue```が作られる
- 共通のレイアウトは```default.vue```、個別のレイアウトは新たに作成
- ```<nuxt />```はVue Routerの```<router-view>```にあたるもので、ルーティングにマッチしたページコンポーネントがレンダリングされる。そのためレイアウトコンポーネントには```<nuxt />```を書く

個別レイアウトの```/layouts/top.vue```を読み込む場合

```
export default {
  layout: 'top',
}
```

### pages

pagesディレクトリの中の構造がそのままルーティングになる。

- pagesディレクトリ直下のindex.vueが```/```
- pages/users/index.vueが```/users```
- _user.vueのようにファイル名の先頭に```_```をつけると動的なルーティング

### store

- vuexのファイルを管理
- index.jsを生成すると自動的にVuexストアを有効にする

## asyncDataとfetchの機能

### Vue.jsとNuxt.jsでAPI取得方法が違う

- Nuxt.jsを使わない場合、Vueインスタンスの初期化時やコンポーネントのcreatedのフックなどでAPIを叩いて、Vuexのストアやコンポーネントのdataに格納
- Nuxt.jsの場合は、ページコンポーネントが読み込まれる前に呼び出される```asyncData```と```fetch```というメソッドでページに必要なデータを読み込む
- ```asyncData```と```fetch```はどちらもデータを取得するためのメソッド
- ```asyncData```はコンポーネントのdataに非同期でデータをセットするときに使う
- ```fetch```はVuexストアに```commit```や```dispatch```するときに使う

### asyncData

- asyncDataメソッド内でreturnしたものが、コンポーネントの```data```とマージされて```<template>```などで使える
- ルートのVueインスタンスへの参照がappとして渡されるので、```app.$axios```でaxiosを参照
- Vue DevToolsでコンポーネントのdataにAPIのレスポンスが確認できる
- asyncDataとfetchはVueインスタンスが作成される前に実行されるメソッドなので```this```が存在しない
- Vueインスタンスへの参照は```context```オブジェクトに格納されている(```app.$axios```の箇所)
- asyncDataとfetchはともにSSR対応

``` javascript
<template>
  <div>
    <div>
      <img :src="avatar_url" width="100">
      <span>
        {{name}}
      </span>
    </div>
    <a :href="html_url">
      {{html_url}}
    </a>
  </div>
</template>

<script>
  export default {
    name: 'user',
    async asyncData({ app, params }) {
      const data = await app.$axios.$get(`https://api.github.com/users/${params.user}`)
      return data;
    }
  }
</script>
```

## SSRについて

- SSRはブラウザで最初にアクセスしたページのコンテンツをすばやくレンダリングするためのもの
- Vue Routerによって遷移した場合はクライアントサイドでレンダリングされる

``` html
<a href="/hoge">サーバーサイドでレンダリング</a>
<nuxt-link to="/hoge">クライアントサイドでレンダリング</nuxt-link>
```

## Vuexストアを使う

- Nuxt.jsはVuexをnpmからinstallしなくても利用できる
- Vuexストアを追加する方法はクラシックモードとモジュールモードの2つある

### クラシックモード

- ```store/index.js```で```new Vuex.Store()```を返すメソッドを```export```すると有効になる
- ストアインスタンスを返すというルール以外は、通常Vuexを使う場合と同じ使い方

``` javascript:store/index.js
import Vuex from 'vuex';

export default () => {
  return new Vuex.Store({
    state() {
      return {
        counter: 0,
      }
    }
  })
}
```

### モジュールモード

- storeディレクトリ内のファイル構造によってnamespacedなモジュールを持ったストアを自動で構築する
- ```store/index.js```で```state```や```mutations```などを```export```することで有効になる
- モジュールは```store```ディレクトリにある```index.js```以外のファイルまたはディレクトリが自動的にモジュールして追加される

``` javascript:store/index.js
export const state = () => ({
  counter: 0
})
```

``` javascript:store/todos.js
export const state = () => ({
  items: []
})
```

この2つのファイルからVuexストアが構築される

``` javascript
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  modules: {
    namespaced: true,
    todos: {
      state: () => ({
        items: []
      })
    }
  }
});
```

## 参考サイト

- [Nuxt.js、ファーストステップ
](https://app.codegrid.net/series/2018-nuxtjs)

