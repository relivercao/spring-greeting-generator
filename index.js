#!/usr/bin/env node

/**
 * Spring Festival Greeting Generator CLI
 * 春节文案生成器命令行工具
 */

const generator = require('./generator');

// 解析命令行参数
const args = process.argv.slice(2);
const options = {};

args.forEach(arg => {
  if (arg.startsWith('--target=')) {
    options.target = arg.split('=')[1];
  } else if (arg.startsWith('--style=')) {
    options.style = arg.split('=')[1];
  } else if (arg.startsWith('--name=')) {
    options.name = arg.split('=')[1];
  } else if (arg.startsWith('--year=')) {
    options.year = parseInt(arg.split('=')[1]);
  } else if (arg.startsWith('--count=')) {
    options.count = parseInt(arg.split('=')[1]);
  } else if (arg === '--help' || arg === '-h') {
    console.log(`
🧧 春节文案生成器 - Spring Festival Greeting Generator

用法：
  node index.js [选项]

选项：
  --target=<类型>    目标对象：elder(长辈) boss(领导) friend(朋友) client(客户) lover(爱人) child(孩子)
  --style=<风格>     文案风格：formal(正式) warm(温馨) funny(幽默) poetic(诗意) simple(简洁)
  --name=<称呼>      对方称呼（可选）
  --year=<年份>      年份（默认当前年份）
  --count=<数量>     批量生成数量（默认1）
  --help, -h         显示帮助

示例：
  node index.js --target=elder --style=warm --name=奶奶
  node index.js --target=friend --style=funny --count=5
`);
    process.exit(0);
  }
});

// 生成文案
console.log('\n🧧 ============ 春节文案生成器 ============ 🧧\n');

if (options.count && options.count > 1) {
  console.log(`生成 ${options.count} 条文案：\n`);
  const greetings = generator.generateBatch(options, options.count);
  greetings.forEach((g, i) => {
    console.log(`${i + 1}. ${g}\n`);
  });
} else {
  const greeting = generator.generate(options);
  console.log(greeting);
  console.log('\n📋 已生成！直接复制使用吧！\n');
}
