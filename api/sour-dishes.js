// 酸味菜品API
const sourDishes = [
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
    id: 5,
    name: '柠檬鸡翅',
    description: '酸香开胃，外酥里嫩',
    image: '🍋🍗',
    category: '肉类',
    tags: ['酸酸的', '开胃', '香脆'],
    price: 0
  },
  {
    id: 8,
    name: '酸辣土豆丝',
    description: '酸辣爽口，超级下饭',
    image: '🥔🌶️',
    category: '家常菜',
    tags: ['酸酸的', '下饭菜', '辣'],
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
    id: 11,
    name: '糖醋里脊',
    description: '外酥里嫩，酸甜适口',
    image: '🍖🍯',
    category: '肉类',
    tags: ['酸酸的', '下饭菜', '经典'],
    price: 0
  },
  {
    id: 15,
    name: '鱼香肉丝',
    description: '鱼香味浓，肉丝滑嫩',
    image: '🐟🥓',
    category: '家常菜',
    tags: ['下饭菜', '酸甜', '经典'],
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
    id: 28,
    name: '酸菜鱼',
    description: '酸辣开胃，鱼肉嫩滑',
    image: '🐟🥬',
    category: '汤菜',
    tags: ['酸酸的', '辣', '开胃'],
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
    id: 35,
    name: '醋溜白菜',
    description: '酸甜爽脆，开胃解腻',
    image: '🥬🍶',
    category: '素菜',
    tags: ['酸酸的', '开胃', '快手'],
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
  
  res.status(200).json(sourDishes);
}