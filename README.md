**TwitterAPIの仕様変更によりサービス終了**

# MustBuy

## 概要

Twitterでユーザのいいね欄を検索できるWebアプリケーション

## 背景

- 同人誌即売会でお品書きツイートを行う文化がある
  - お品書きツイートには、同人誌即売会のタグが付与されていることが多い
    - ex. `#芸カ27`
- いいね欄からお品書きツイートのみを抽出したい
  - 同人誌即売会での欲しかった本の買い逃しを防げる！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">いいねしたツイートの中から <a href="https://twitter.com/hashtag/%E8%8A%B8%E3%82%AB27?src=hash&amp;ref_src=twsrc%5Etfw">#芸カ27</a> or <a href="https://twitter.com/hashtag/%E8%8A%B8%E3%82%AB27%E3%81%8A%E5%93%81%E6%9B%B8%E3%81%8D?src=hash&amp;ref_src=twsrc%5Etfw">#芸カ27お品書き</a> を含むものを一覧表示するWebアプリを作りました🎉<br><br>買い逃しがないように是非チェックしてみてください！<a href="https://t.co/kd4d1AYBoZ">https://t.co/kd4d1AYBoZ</a> <a href="https://t.co/0tFcrYJTCB">pic.twitter.com/0tFcrYJTCB</a></p>&mdash; こめかみ (@temple_circle) <a href="https://twitter.com/temple_circle/status/1545929664681877504?ref_src=twsrc%5Etfw">July 10, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### システム構成

- Next.js on Vercel
