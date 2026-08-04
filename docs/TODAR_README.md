<div align="center">

  # 📈 TODAR 2.0 // Real-Time Algorithmic Financial Intelligence Terminal

  [![Live Platform](https://img.shields.io/badge/Live_Terminal-todar.finance.lakshya.uk-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://todar.finance.lakshya.uk)
  [![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![WebSockets](https://img.shields.io/badge/WebSockets-Real--Time-06b6d4?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
  [![D3 & Recharts](https://img.shields.io/badge/Charts-D3%20%2F%20Recharts-f59e0b?style=for-the-badge)](https://d3js.org/)

  <p align="center">
    <b>A high-throughput quantitative market analytics platform delivering sub-50ms tick streaming, multi-asset order book depth, predictive trend models, and automated algorithmic signal alerts.</b>
  </p>

</div>

---

## 🏛️ System Architecture

```mermaid
flowchart LR
    subgraph MarketFeeds ["📡 Global Market Data Ingestion"]
        Exchanges["Equities & Crypto Exchanges<br/>(Binance • Polygon.io • AlphaVantage)"]
        StreamHandler["Fastify WebSocket Stream Gateway<br/>(Backpressure & Delta Compression)"]
    end

    subgraph AnalyticsCore ["⚙️ Quantitative Analysis Engine"]
        TickProcessor["Real-Time Tick Ring Buffer<br/>(Rolling Window Calculations)"]
        SignalEngine["Technical Indicators<br/>(EMA • MACD • RSI • Bollinger Bands)"]
        RiskEngine["Value-at-Risk (VaR) & Volatility Estimator"]
    end

    subgraph ClientTerminal ["💻 React & WebGL Terminal UI"]
        CandleChart["Interactive High-Density Candlestick Chart"]
        OrderBook["Live Bid/Ask Depth Ladder"]
        Alerts["Real-Time Execution Trigger Matrix"]
    end

    Exchanges --> StreamHandler
    StreamHandler --> TickProcessor
    TickProcessor --> SignalEngine
    TickProcessor --> RiskEngine
    SignalEngine --> CandleChart
    RiskEngine --> OrderBook
    SignalEngine --> Alerts
```

---

## ✨ Core Features

- **Sub-50ms Market Tick Streaming**: Bi-directional WebSocket stream protocol with message compression and auto-reconnection backoff.
- **High-Density Candlestick & Volume Charts**: Custom canvas/D3-accelerated candlestick renderer capable of displaying 50,000+ data points smoothly.
- **Level 2 Order Book Depth Ladder**: Live visual order book displaying dynamic bid/ask walls, order imbalances, and microsecond volume profiles.
- **Automated Algorithmic Alert Engine**: Configurable mathematical threshold triggers (e.g. RSI divergence, Golden Cross, Bollinger band squeeze).
- **Multi-Asset Portfolio Risk Simulation**: Monte Carlo simulation and historical Value-at-Risk (VaR) calculations across diversified portfolios.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Recharts, D3.js
- **Backend & Stream**: Node.js, Fastify, WebSocket protocol, Redis Pub/Sub
- **Financial Computation**: Math.js, Custom quantitative statistics library
- **Infrastructure**: Vercel Edge Serverless, Upstash Redis, Docker

---

## 🚀 Installation & Local Development

```bash
# 1. Clone repository
git clone https://github.com/lak-is-law/todar-finance.git
cd todar-finance

# 2. Install dependencies
npm install

# 3. Configure .env.local
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

---

## 🧗 Challenges Faced & Solutions

### 1. High-Frequency State Thrashing in React
- **Challenge**: Receiving 200+ WebSocket market ticks per second triggered excessive React re-render cycles, causing frame drops.
- **Solution**: Batched incoming ticks into a high-speed typed ring buffer (`Float64Array`) and flushed state updates to the UI at an optimized 60 FPS using `requestAnimationFrame`.

### 2. Chart Layout Performance on Huge Timeframes
- **Challenge**: Rendering multi-year historical 1-minute candle datasets overloaded SVG DOM nodes.
- **Solution**: Implemented Canvas-based level-of-detail (LOD) downsampling (Largest-Triangle-Three-Buckets algorithm) to render only visible data points on viewport zoom.

---

## 💡 Lessons Learned

- WebSocket payload size directly dictates client rendering performance; switching from verbose JSON to binary protocols (`MessagePack` / `Protocol Buffers`) reduced bandwidth by 65%.
- Pure functional calculation pipelines facilitate bulletproof unit testing for risk modeling algorithms.

---

## 📄 License & Contact

Distributed under the **MIT License**.
Developed by **Lakshya Agarwal** ([contact@lakshya.uk](mailto:contact@lakshya.uk) • [lakshya.uk](https://lakshya.uk)).
