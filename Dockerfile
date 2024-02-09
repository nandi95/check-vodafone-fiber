FROM node:lts-bookworm-slim

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update -qq \
  && apt-get install -qq --no-install-recommends \
    chromium \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && ln -s /usr/bin/chromium /usr/bin/google-chrome \
  && ls -la /usr/bin/

COPY . .

# Install puppeteer so it's available in the container.
RUN npm install --no-fund \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules \
    && chown -R pptruser:pptruser /package.json \
    && chown -R pptruser:pptruser /package-lock.json

RUN npm run build

# remove dev dependencies
RUN npm prune --production

# Run everything after as non-privileged user.
USER pptruser

CMD ["node", "index.js"]
