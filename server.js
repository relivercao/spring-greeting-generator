#!/usr/bin/env node

/**
 * 春节文案生成器 - Web API 服务
 * Spring Festival Greeting Generator - Web API
 */

const http = require('http');
const url = require('url');
const generator = require('./generator');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 首页
  if (pathname === '/' || pathname === '') {
    res.writeHead(200);
    res.end(JSON.stringify({
      name: '🧧 春节文案生成器 API',
      version: '1.0.0',
      endpoints: {
        '/api/generate': '生成单条文案 (GET: ?target=elder&style=warm&name=奶奶)',
        '/api/batch': '批量生成 (GET: ?count=5&target=friend)',
        '/api/targets': '获取支持的目标类型',
        '/api/styles': '获取支持的风格 (GET: ?target=elder)'
      },
      targets: ['elder', 'boss', 'friend', 'client', 'lover', 'child'],
      styles: ['formal', 'warm', 'funny', 'poetic', 'simple'],
      example: '/api/generate?target=elder&style=warm&name=奶奶'
    }, null, 2));
    return;
  }

  // 生成单条文案
  if (pathname === '/api/generate') {
    const options = {
      target: query.target || 'friend',
      style: query.style || 'warm',
      name: query.name || '',
      year: query.year ? parseInt(query.year) : 2026
    };

    try {
      const greeting = generator.generate(options);
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        data: {
          greeting,
          options
        }
      }, null, 2));
    } catch (error) {
      res.writeHead(400);
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
    return;
  }

  // 批量生成
  if (pathname === '/api/batch') {
    const options = {
      target: query.target || 'friend',
      style: query.style || 'warm',
      name: query.name || '',
      year: query.year ? parseInt(query.year) : 2026
    };
    const count = parseInt(query.count) || 5;

    try {
      const greetings = generator.generateBatch(options, Math.min(count, 20));
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        data: {
          greetings,
          count: greetings.length,
          options
        }
      }, null, 2));
    } catch (error) {
      res.writeHead(400);
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
    return;
  }

  // 获取目标类型
  if (pathname === '/api/targets') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      data: generator.getTargets()
    }, null, 2));
    return;
  }

  // 获取风格
  if (pathname === '/api/styles') {
    const target = query.target || 'friend';
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      target,
      data: generator.getStyles(target)
    }, null, 2));
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    error: 'Not found',
    hint: 'Visit / for API documentation'
  }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🧧 春节文案生成器 API 运行中`);
  console.log(`📡 http://localhost:${PORT}`);
  console.log(`🌍 公网访问: http://43.156.99.137:${PORT}`);
  console.log(`\n📋 API 示例:`);
  console.log(`   http://43.156.99.137:${PORT}/api/generate?target=elder&style=warm&name=奶奶`);
});
