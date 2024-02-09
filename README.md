Vodafone sent an email saying that fiber is available. It **isn't**.

Website says it isn't available so periodically check if it is.

## Usage

install
```bash
npm i
```

Development
```bash
ts-node index.ts
```

Run
```bash
npm run build && node index.js
```
OR
(this is only tested on linux)
```bash
docker build -t check-fiber . && docker run --rm -it --init check-fiber
```
