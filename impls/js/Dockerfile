FROM archlinux

WORKDIR /app

COPY package*.json ./

RUN pacman -Syy --noconfirm && pacman -S nodejs npm python3 make gcc readline libstdc++5 --noconfirm && npm install

CMD ["node", "step4_if_fn_do.js"]
