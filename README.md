# Nuxt.js Totorial

## 特徴

 - Vue.jsでSSRを行うためのフレームワーク
 - SSRした結果を静的ファイルとして書き出すこともできる
 - webpackの設定がすでにされている
 - Vue Routerの設定なしでルーティング設定ができる

 ※SSR HTMLを構築する仕組みがサーバー側にもクライアント側にも備わっていること

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

Nuxt.jsアプリケーションの設定ファイル。
plugins/middlewareなどの設定、webpackの拡張。

### assets

コンパイルされていないsassファイルやjsファイルを格納。
vue-loaderによってコンパイルなどの処理が行われる。

### static

webpackを通す必要のないimgファイルなどの静的なファイルを格納。
staticディレクトリにimage.pngを置いた場合、アプリケーション内では/image.pngで参照できる。

### components

Vue.jsのコンポーネントを格納。

### layouts

共通のレイアウト、個別のレイアウトなどを格納。
ページコンポーネントからレイアウトを指定する。

```/layouts/top.vue```を読み込む場合

```
export default {
  layout: 'top',
}
```

### pages

pagesディレクトリの中の構造がそのままルーティングになる。

- pagesディレクトリ直下のindex.vueが```/```
- pages/users/index.vueが```/users
- _user.vueのようにファイル名の先頭に```_```をつけると動的なルーティング

### store

vuexのファイルを格納。
index.jsを生成すると自動的にVuexストアを有効にする。

## 開発用ローカルサーバーの起動

```
$ npm run dev
```

## 参考サイト

- [Nuxt.js、ファーストステップ
](https://app.codegrid.net/series/2018-nuxtjs)

