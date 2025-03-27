
# Server Setup Summary: ASCII Gaming Terminal (EC2 + ttyd + Amplify)

This document summarizes the successful steps and common pitfalls encountered while configuring a web-based terminal experience using `ttyd`, EC2, and Amplify.

---

## ✅ Correct Setup Steps

### 1. **Prepare EC2 Environment (Amazon Linux 2023)**

- Open ports: `80`, `443`, `8761` in the EC2 security group.
- Install dev tools:

```bash
sudo dnf groupinstall "Development Tools"
sudo dnf install cmake git openssl-devel libuv-devel json-c-devel nginx
```

---

### 2. **Build and Install libwebsockets + ttyd**

```bash
git clone https://github.com/warmcat/libwebsockets.git
cd libwebsockets && mkdir build && cd build
cmake .. -DLWS_WITH_LIBUV=ON -DCMAKE_BUILD_TYPE=Release
make -j$(nproc) && sudo make install

git clone https://github.com/tsl0922/ttyd.git
cd ttyd && mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc) && sudo make install
```

---

### 3. **Run ttyd**

```bash
ttyd -W -p 8761 bash
```
- `-W`: write-enabled terminal

---

### 4. **Set Up Nginx Reverse Proxy**

Configure `/etc/nginx/conf.d/default.conf` to forward `/` and WebSocket requests to ttyd on port 8761.

---

### 5. **Enable HTTPS with Let’s Encrypt**

```bash
curl -O https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py --user
pip install certbot certbot-nginx --user
sudo ~/.local/bin/certbot --nginx -d ascii-gaming.link
```

If Certbot can’t auto-install the cert, manually configure `ssl_certificate` and `ssl_certificate_key` in the Nginx `server` block.

---

### 6. **Integrate Front-End**

- Use `xterm.js` with WebSocket protocol `"tty"`
- Set `wss://ascii-gaming.link/ws` as the connection endpoint
- Confirm interactivity and data exchange

---

## ⚠️ Common Pitfalls

| Pitfall | Fix |
|--------|-----|
| `cmake: command not found` | Install with `dnf install cmake` |
| `Could not find OpenSSL` | Install with `dnf install openssl-devel` |
| `libwebsockets was not built with libuv` | Rebuild with `-DLWS_WITH_LIBUV=ON` |
| ttyd shows `ignored unknown message type` | Use `protocol: "tty"` in WebSocket |
| `certbot: permission denied` | Use `sudo` when running Certbot |
| `Certbot failed to install cert` | Ensure `server_name` matches in Nginx |
| `net::ERR_CERT_AUTHORITY_INVALID` | Switch from self-signed to Let’s Encrypt |
| Amplify build failure (ESLint peer deps) | Use `--legacy-peer-deps` or align plugin versions |

---

## 🧪 Tested Success

- WebSocket works via iframe and custom xterm.js
- Works on desktop and mobile (Chrome/Safari)
- Fully HTTPS-secured with real domain
