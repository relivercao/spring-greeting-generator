#!/usr/bin/env python3
"""
春节祝福页面自动更新脚本
每天 0 点运行，根据当天日期更新祝福语
"""
import json
from pathlib import Path

# 农历日期映射（2026年春节是2月17日）
LUNAR_CALENDAR = {
    # 日期 -> (农历日期, 风俗, 祝福语)
    "02-17": ("正月初一", "春节", "新年快乐 · 恭喜发财 · 万事如意"),
    "02-18": ("正月初二", "回娘家", "吉祥如意 · 阖家欢乐 · 步步高升"),
    "02-19": ("正月初三", "老鼠嫁女", "财源广进 · 吉星高照 · 大吉大利"),
    "02-20": ("正月初四", "迎灶神", "迎春纳福 · 心想事成 · 富贵盈门"),
    "02-21": ("正月初五", "破五", "五福临门 · 财源滚滚 · 事业兴旺"),
    "02-22": ("正月初六", "送穷", "六六大顺 · 万事亨通 · 吉庆有余"),
    "02-23": ("正月初七", "人日", "人寿年丰 · 平安顺遂 · 吉祥如意"),
    "02-24": ("正月初八", "谷日", "五谷丰登 · 风和日丽 · 诸事大吉"),
    "02-25": ("正月初九", "天日", "天恩浩荡 · 福寿绵长 · 喜气盈门"),
    "02-26": ("正月初十", "石日", "十全十美 · 富贵吉祥 · 万事如意"),
    "02-27": ("正月十一", "子嗣日", "子孙满堂 · 幸福安康 · 吉祥如意"),
    "02-28": ("正月十二", "灯生日", "灯火辉煌 · 前程似锦 · 平安吉祥"),
    "03-01": ("正月十三", "上灯日", "灯烛荧煌 · 财星高照 · 吉祥如意"),
    "03-02": ("正月十四", "试灯日", "灯红酒绿 · 富贵荣华 · 万事大吉"),
    "03-03": ("正月十五", "元宵节", "元宵佳节 · 团圆美满 · 灯灯相映"),
    "03-04": ("正月十六", "落灯日", "落灯收串 · 好事连连 · 吉祥如意"),
    "03-05": ("正月十七", "人气日", "人气旺盛 · 身体健康 · 万事如意"),
    "03-06": ("正月十八", "雨水日", "雨水滋润 · 五谷丰登 · 吉祥如意"),
    "03-07": ("正月十九", "慈悲日", "慈悲为怀 · 心愿达成 · 平安吉祥"),
    "03-08": ("正月二十", "天穿日", "补天祈福 · 平安吉祥 · 万事如意"),
    "03-09": ("正月廿一", "串游日", "游历四方 · 平安顺利 · 吉祥如意"),
    "03-10": ("正月廿二", "aggle日", "龙灯舞动 · 吉祥如意 · 财源广进"),
    "03-11": ("正月廿三", "天赦日", "天恩浩荡 · 赦罪祈福 · 平安吉祥"),
    "03-12": ("正月廿四", "接管日", "接管事务 · 顺利吉祥 · 万事如意"),
    "03-13": ("正月廿五", "填仓日", "填仓纳福 · 五谷丰登 · 吉祥如意"),
    "03-14": ("正月廿六", "驱穷日", "驱穷迎富 · 财源广进 · 吉祥如意"),
    "03-15": ("正月廿七", "洗佛日", "浴佛祈福 · 平安吉祥 · 万事如意"),
    "03-16": ("正月廿八", "千佛山", "登山祈福 · 平安吉祥 · 步步高升"),
    "03-17": ("正月廿九", "小除夕", "除旧迎新 · 吉祥如意 · 万事大吉"),
    "03-18": ("正月初三十", "除夕", "辞旧迎新 · 新年快乐 · 万事如意"),
}

PROJECT_ROOT = Path(__file__).parent
CHUXI_HTML = PROJECT_ROOT / "chuxi.html"

def get_today_lunar():
    """获取今天的农历日期信息"""
    from datetime import datetime
    today = datetime.now()
    month_day = f"{today.month:02d}-{today.day:02d}"
    return LUNAR_CALENDAR.get(month_day, ("新春快乐", "吉祥如意", "恭喜发财 · 万事如意"))

def update_page():
    """更新祝福页面"""
    lunar_date, custom, blessing = get_today_lunar()
    
    # 读取当前页面
    with open(CHUXI_HTML, encoding="utf-8") as f:
        content = f.read()
    
    # 更新农历日期
    old_subtitle = '<p class="subtitle">正月初三 · 老鼠嫁女</p>'
    new_subtitle = f'<p class="subtitle">{lunar_date} · {custom}</p>'
    content = content.replace(old_subtitle, new_subtitle)
    
    # 更新祝福语 - 需要找到对应的 blessing-words 部分
    old_words = '''<div class="blessing-words">
    <div class="blessing-item"><span>🧧</span>恭喜发财</div>
    <div class="blessing-item"><span>🎊</span>万事如意</div>
    <div class="blessing-item"><span>💰</span>财源滚滚</div>
    <div class="blessing-item"><span>❤️</span>心想事成</div>
    <div class="blessing-item"><span>🏮</span>吉星高照</div>
    <div class="blessing-item"><span>🍊</span>大吉大利</div>
  </div>'''
    
    # 解析祝福语
    items = blessing.split(" · ")
    emoji_map = {
        "恭喜发财": "🧧", "万事如意": "🎊", "财源滚滚": "💰",
        "心想事成": "❤️", "吉星高照": "🏮", "大吉大利": "🍊",
        "五福临门": "🎁", "富贵盈门": "🏠", "阖家欢乐": "👨‍👩‍👧",
        "步步高升": "📈", "财源广进": "💎", "万事亨通": "🚀",
        "吉祥如意": "✨", "五谷丰登": "🌾", "灯灯相映": "🏮",
        "团圆美满": "🥮", "人寿年丰": "🌟", "平安顺遂": "🛡️",
        "诸事大吉": "🍊", "好事连连": "🔄", "龙灯舞动": "🐉",
        "五湖四海": "🌏", "欣欣向荣": "🌱", "国泰民安": "🇨🇳",
        "辞旧迎新": "🧨", "新年快乐": "🎉", "万事大吉": "🧧",
    }
    new_words = '<div class="blessing-words">\n'
    for item in items:
        emoji = emoji_map.get(item, "✨")
        new_words += f'    <div class="blessing-item"><span>{emoji}</span>{item}</div>\n'
    new_words += '  </div>'
    
    if old_words in content:
        content = content.replace(old_words, new_words)
    
    # 写回文件
    with open(CHUXI_HTML, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"✅ 已更新: {lunar_date} · {custom}")
    print(f"   祝福语: {blessing}")

if __name__ == "__main__":
    update_page()
