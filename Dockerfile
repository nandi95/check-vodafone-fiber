FROM zenika/alpine-chrome:with-puppeteer

COPY . .

RUN npm install --no-fund

RUN npm run build

# remove dev dependencies
RUN npm prune --production

CMD ["node", "index.js"]
