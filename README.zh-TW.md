# vue3-quasar-frontend 

## 開發流程

### 開發環境需求

- nodejs >= 18.14.0
- npm >= 9.3.1

```bash
$ cd vue3-quasar-frontend 

# 安裝依賴
$ yarn install

# 啟動並在 localhost:3000 進行熱重載
$ npm run dev
```

---

## 佈署流程

### 前置流程

1. 執行前請先確認 `docker` 裡的 `.env` 和根目錄底下的 `.env` 相關環境是否設定完成。
2. 如果需要 `nginx`，執行 `compose.nginx`：
   ```bash
   docker compose -f compose.nginx.yml up -d
   ```

### 初次佈署

1. 確認執行環境：

   ```bash
   docker compose up -d --build
   ```

2. 佈署完成。

### 更新佈署

1. 使用 `git` 更新檔案。
2. 確認更新檔案後，執行編譯：
   ```bash
   docker compose up -d --build
   ```
3. 更新完成。