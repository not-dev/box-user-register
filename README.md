# box user register

box APIでCSVからユーザー登録を行う

## Usage

* boxから公開鍵と秘密鍵のペアを含むJsonファイルを取得
* publicフォルダにJsonを配置
* 起動して、ユーザー名とメールアドレスを含むcsvをドラッグアンドドロップする
* SUBMITボタンで実行

## Note

* csvの文字コードはutf-8またはshift-jis
* csvの形式は1行目がヘッダー、1列目にユーザー名、2列目にメールアドレスがデフォルト
* box認証情報のjsonは下記形式

```json
{
  "boxAppSettings": {
    "clientID": "***",
    "clientSecret": "***",
    "appAuth": {
      "publicKeyID": "***",
      "privateKey": "***",
      "passphrase": "***"
    }
  },
  "enterpriseID": "***"
}
```
