FROM nginx:alpine

# Install nvm with node and npm
RUN apk add --no-cache --repository http://nl.alpinelinux.org/alpine/edge/main libuv \
  && apk add --no-cache --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs=14.15.1-r0 nodejs-npm=14.15.1-r0 \
  && apk add --no-cache --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/community yarn=1.22.10-r0 \
  && apk add --no-cache bash \
  && echo "NodeJS Version:" "$(node -v)" \
  && echo "NPM Version:" "$(npm -v)" \
  && echo "Yarn Version:" "$(yarn -v)"

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

WORKDIR /usr/share/nginx/html

RUN npm i -g pm2

COPY node_modules ./node_modules
COPY .next ./.next
COPY public ./public
# COPY package.json ./package.json
# COPY next.config.js ./next.config.js
COPY ecosystem.config.js ./ecosystem.config.js
COPY server.js ./server.js

EXPOSE 3000

ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
