/**
 * Spring Festival Greeting Generator
 * 春节文案生成器
 */

const greetings = {
  elder: {
    formal: [
      "祝您{year}年身体健康，福寿安康，阖家幸福！",
      "新春佳节，祝您松柏长青，福如东海，寿比南山！",
      "{year}年大吉，祝您岁岁平安，年年有余，身体健康！"
    ],
    warm: [
      "亲爱的{称呼}，{year}年到了，祝您身体硬朗，天天开心，我们永远爱您！",
      "又是一年春节，感谢您一直以来的关爱，祝您新年快乐，健康长寿！",
      "{称呼}，祝您{year}年福气满满，身体棒棒，每天都开开心心！"
    ],
    poetic: [
      "岁序更新，春风送暖。愿您松鹤延年，福寿双全，{year}年吉祥！",
      "瑞雪兆丰年，春风迎新岁。祝您福泽深厚，身体康健，万事如意！"
    ],
    simple: [
      "祝您{year}年身体健康，万事如意！",
      "新年快乐，祝您福寿安康！",
      "{year}年大吉，身体健康！"
    ]
  },
  boss: {
    formal: [
      "尊敬的{称呼}，祝您{year}年事业蒸蒸日上，阖家幸福安康！",
      "新春佳节，感谢您一年来的指导与关怀，祝您{year}年宏图大展，万事如意！",
      "{year}年到，祝您事业辉煌，前程似锦，身体健康！"
    ],
    warm: [
      "{称呼}，感谢您这一年的照顾，祝您{year}年工作顺利，生活美满，心想事成！",
      "新年快乐！愿{year}年您事业更上一层楼，家庭幸福美满！"
    ],
    simple: [
      "祝您{year}年工作顺利，新年大吉！",
      "新年快乐，{year}年万事如意！"
    ]
  },
  friend: {
    funny: [
      "兄弟/姐妹，{year}年祝你暴富暴瘦暴桃花，钱包鼓鼓肚子平平！",
      "新年快乐！{year}年祝你：工资翻倍，发际线不后移，对象比前任好看！",
      "马年到了，祝你马上有钱，马上有对象，马上变瘦！"
    ],
    warm: [
      "亲爱的{称呼}，{year}年祝你心想事成，我们一起变得更好！",
      "新的一年，愿我们友谊长存，{year}年一起发财！",
      "谢谢你这年的陪伴，{year}年继续一起嗨！"
    ],
    simple: [
      "新年快乐，{year}年大吉！",
      "祝你{year}年一切顺利，发发发！"
    ]
  },
  client: {
    formal: [
      "尊敬的{称呼}，感谢您一直以来的信任与支持，祝您{year}年事业兴旺，阖家幸福！",
      "新春佳节，恭祝贵公司蒸蒸日上，财源广进！",
      "{year}年大吉，期待我们继续携手合作，共创辉煌！"
    ],
    warm: [
      "{称呼}，感谢这一年的合作，祝您和您的团队{year}年红红火火，万事如意！",
      "新年快乐！愿{year}年我们合作更愉快，一起创造更大价值！"
    ]
  },
  lover: {
    warm: [
      "亲爱的，{year}年愿我们继续携手同行，爱到永远！新年快乐！",
      "又一年春节，感恩有你的陪伴。{year}年，我依然最爱你！",
      "宝贝，新年快乐！愿我们的爱情在{year}年更加甜蜜！"
    ],
    poetic: [
      "愿得一心人，白首不相离。{year}年，愿我们执子之手，与子偕老。",
      "春风十里不如你，{year}年愿我们比翼双飞，幸福美满。"
    ],
    funny: [
      "宝贝，{year}年继续做我的小可爱，我继续宠你！新年快乐！",
      "亲爱的，新年愿望：你变得更爱我，我变得更会赚钱！"
    ]
  },
  child: {
    warm: [
      "宝贝，{year}年祝你健康快乐成长，学习进步，天天开心！",
      "新年快乐！愿你在{year}年像小马驹一样健康活泼，茁壮成长！",
      "宝贝，祝你{year}年学业有成，快乐无忧，爸爸妈妈永远爱你！"
    ],
    funny: [
      "小家伙，{year}年祝你吃嘛嘛香，考试成绩棒棒，红包收到手软！",
      "新年快乐！{year}年祝你：身高蹭蹭涨，成绩节节高！"
    ]
  }
};

/**
 * 生成拜年文案
 * @param {Object} options - 配置选项
 * @param {string} options.target - 目标对象：elder/boss/friend/client/lover/child
 * @param {string} options.style - 风格：formal/warm/funny/poetic/simple
 * @param {string} options.name - 称呼（可选）
 * @param {number} options.year - 年份（默认当前年份）
 * @returns {string} 生成的文案
 */
function generate(options = {}) {
  const {
    target = 'friend',
    style = 'warm',
    name = '',
    year = new Date().getFullYear()
  } = options;

  const targetGreetings = greetings[target] || greetings.friend;
  const styleGreetings = targetGreetings[style] || targetGreetings.warm || targetGreetings.formal;

  if (!styleGreetings || styleGreetings.length === 0) {
    // 降级到任意可用风格
    const anyStyle = Object.values(targetGreetings)[0];
    if (anyStyle && anyStyle.length > 0) {
      return anyStyle[Math.floor(Math.random() * anyStyle.length)]
        .replace(/{year}/g, year)
        .replace(/{称呼}/g, name || '您');
    }
    return `祝您${year}年新年快乐，万事如意！`;
  }

  const greeting = styleGreetings[Math.floor(Math.random() * styleGreetings.length)];
  
  return greeting
    .replace(/{year}/g, year)
    .replace(/{称呼}/g, name || '您');
}

/**
 * 批量生成文案
 * @param {Object} options - 配置选项
 * @param {number} count - 生成数量
 * @returns {string[]} 文案数组
 */
function generateBatch(options = {}, count = 5) {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(generate(options));
  }
  return results;
}

/**
 * 获取所有支持的目标类型
 */
function getTargets() {
  return Object.keys(greetings);
}

/**
 * 获取指定目标支持的风格
 */
function getStyles(target) {
  const targetGreetings = greetings[target];
  return targetGreetings ? Object.keys(targetGreetings) : [];
}

module.exports = {
  generate,
  generateBatch,
  getTargets,
  getStyles
};
