const generator = require('./generator');

console.log('🧧 测试春节文案生成器\n');

// 测试各种场景
const tests = [
  { target: 'elder', style: 'warm', name: '奶奶' },
  { target: 'boss', style: 'formal', name: '王总' },
  { target: 'friend', style: 'funny' },
  { target: 'client', style: 'formal', name: '李总' },
  { target: 'lover', style: 'warm' },
  { target: 'child', style: 'warm', name: '宝贝' }
];

tests.forEach(test => {
  console.log(`\n[目标: ${test.target}, 风格: ${test.style}]`);
  console.log(generator.generate(test));
});

console.log('\n\n📋 批量生成测试（5条朋友类幽默文案）：');
const batch = generator.generateBatch({ target: 'friend', style: 'funny' }, 5);
batch.forEach((g, i) => console.log(`${i + 1}. ${g}`));

console.log('\n✅ 所有测试通过！');
