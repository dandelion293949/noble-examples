# セットアップ手順

## NodeJSと依存ライブラリのインストール

```bash
$ sudo apt install nodejs npm \
    bluetooth bluez libbluetooth-dev libudev-dev
```

## npmの最新化とNodeJSのバージョン管理のためnのインストール

Nobleを動かすためにはNodeJSをv8にしないといけません。それ以降のバージョンでは互換性の問題かエラーが発生します。（調査はしてない）

```bash
$ sudo npm install -g npm n
$ sudo n v8
```

## サンプルコードの取得

```bash
$ git clone https://github.com/dandelion293949/noble-examples.git
$ cd noble-examples
```

## NodeJSの依存パッケージをインストール

```bash
$ npm install
```

## 動作確認

アプリケーションを終了させるには[Ctrl + C]です

```bash
$ sudo node ./scan.js
```

