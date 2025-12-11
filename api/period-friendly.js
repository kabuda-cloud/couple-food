// 经期友好菜品API
const menuItems = [
  {
    id: 1,
    name: '番茄炒蛋',
    description: '酸甜可口，开胃下饭',
    image: '🍅🍳',
    category: '家常菜',
    tags: ['酸酸的', '经期友好', '经典'],
    price: 0
  },
  {
    id: 6,
    name: '红糖姜茶',
    description: '暖身暖心，经期必备',
    image: '🧋❤️',
    category: '饮品',
    tags: ['经期友好', '暖身', '热饮'],
    price: 0
  },
  {
    id: 7,
    name: '红枣桂圆汤',
    description: '补血养颜，温暖身心',
    image: '🍵🌟',
    category: '汤品',
    tags: ['经期友好', '补血', '甜汤'],
    price: 0
  },
  {
    id: 10,
    name: '蓝莓山药',
    description: '酸甜可口，美容养颜',
    image: '🫐🍠',
    category: '甜品',
    tags: ['酸酸的', '经期友好', '甜品'],
    price: 0
  },
  {
    id: 18,
    name: '番茄牛腩',
    description: '牛肉软烂，番茄浓郁',
    image: '🍅🐄',
    category: '炖菜',
    tags: ['酸酸的', '经期友好', '营养'],
    price: 0
  },
  {
    id: 31,
    name: '西红柿鸡蛋汤',
    description: '简单家常，酸甜开胃',
    image: '🍅🥚🍵',
    category: '汤品',
    tags: ['酸酸的', '经期友好', '快手'],
    price: 0
  },
  {
    id: 40,
    name: '冰糖雪梨',
    description: '润肺止咳，清甜可口',
    image: '🍐✨',
    category: '甜品',
    tags: ['经期友好', '滋润', '甜品'],
    price: 0
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只允许GET请求' });
  }
  
  res.status(200).json(menuItems);
}