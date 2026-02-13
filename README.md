# 🧧 Spring Festival Greeting Generator (春节文案生成器)

> AI-powered Chinese New Year greeting generator with multiple styles and scenarios

[中文](#中文说明) | [English](#english)

---

## 中文说明

### ✨ 功能特点

- 🎯 **多种场景**：长辈、领导、朋友、客户、爱人、孩子
- 🎨 **多种风格**：正式、温馨、幽默、诗意、简洁
- ⚡ **即时生成**：秒出结果，可批量生成
- 📱 **一键复制**：直接复制使用

### 🚀 快速使用

```bash
# 克隆仓库
git clone https://github.com/relivercao/spring-greeting-generator.git
cd spring-greeting-generator

# 安装依赖
npm install

# 运行
npm start
```

### 📖 API 使用

```javascript
const generator = require('./generator');

// 生成拜年文案
const greeting = generator.generate({
  target: 'elder',      // elder, boss, friend, client, lover, child
  style: 'warm',        // formal, warm, funny, poetic, simple
  name: '张三',          // 可选：对方称呼
  year: 2026            // 可选：年份
});

console.log(greeting);
```

### 💰 付费定制

- **个性化定制**：根据您的具体需求定制文案风格
- **批量生成**：一次性生成 100+ 条文案
- **API 服务**：接入您的应用/系统

**联系方式**：Telegram @relivercao 或在 GitHub 提 Issue

---

## English

An AI-powered tool to generate personalized Chinese New Year greeting messages.

### Features
- Multiple target scenarios (family, boss, friends, clients, etc.)
- Various styles (formal, warm, funny, poetic, simple)
- Instant generation
- Easy to integrate

### License
MIT

---

⭐ 如果觉得有用，给个 Star 支持一下！

### ☕ 支持作者

如果这个工具帮到了你，欢迎请我喝杯咖啡：

- 支付宝/微信：联系获取
- GitHub Sponsor：欢迎赞助

---

Made with ❤️ by [relivercao](https://github.com/relivercao)
