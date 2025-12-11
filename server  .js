// 本地开发服务器
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 菜品数据（与API保持一致）
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
    id: 2,
    name: '西兰花炒虾仁',
    description: '营养丰富，口感清爽',
    image: '🥦🍤',
    category: '健康餐',
    tags: ['西兰花', '健康', '高蛋白'],
    price: 0
  },
  {
    id: 3,
    name: '芹菜炒肉丝',
    description: '清脆爽口，美味健康',
    image: '🌿🥓',
    category: '家常菜',
    tags: ['芹菜', '下饭菜'],
    price: 0
  },
  {
    id: 4,
    name: '红烧花菜',
    description: '软糯入味，家常味道',
    image: '🥦🍛',
    category: '素菜',
    tags: ['花菜', '下饭菜'],
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
    id: 8,
    name: '酸辣土豆丝',
    description: '酸辣爽口，超级下饭',
    image: '🥔🌶️',
    category: '家常菜',
    tags: ['酸酸的', '下饭菜', '辣'],
    price: 0
  },
  {
    id: 9,
    name: '清炒西兰花',
    description: '简单健康，保持原味',
    image: '🥦✨',
    category: '健康餐',
    tags: ['西兰花', '健康', '清淡'],
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
    id: 12,
    name: '麻婆豆腐',
    description: '麻辣鲜香，入口即化',
    image: '🌶️🧱',
    category: '家常菜',
    tags: ['下饭菜', '辣', '经典'],
    price: 0
  },
  {
    id: 13,
    name: '蒜蓉西兰花',
    description: '蒜香浓郁，西兰花爽脆',
    image: '🥦🧄',
    category: '健康餐',
    tags: ['西兰花', '健康', '蒜香'],
    price: 0
  },
  {
    id: 14,
    name: '宫保鸡丁',
    description: '鸡肉鲜嫩，花生香脆',
    image: '🍗🥜',
    category: '经典菜',
    tags: ['下饭菜', '微辣', '经典'],
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
    id: 16,
    name: '水煮肉片',
    description: '麻辣鲜香，肉质嫩滑',
    image: '🥩🔥',
    category: '川菜',
    tags: ['辣', '下饭菜', '经典'],
    price: 0
  },
  {
    id: 17,
    name: '可乐鸡翅',
    description: '甜咸适口，肉质鲜嫩',
    image: '🍗🥤',
    category: '家常菜',
    tags: ['甜口', '经典', '小朋友爱'],
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
    id: 19,
    name: '干煸豆角',
    description: '干香麻辣，非常下饭',
    image: '🫛🔥',
    category: '家常菜',
    tags: ['辣', '下饭菜', '素菜'],
    price: 0
  },
  {
    id: 20,
    name: '地三鲜',
    description: '东北经典，鲜香味美',
    image: '🥔🍆🫑',
    category: '素菜',
    tags: ['经典', '下饭菜', '素菜'],
    price: 0
  },
  {
    id: 21,
    name: '回锅肉',
    description: '肥而不腻，咸香微辣',
    image: '🥓🌶️',
    category: '川菜',
    tags: ['下饭菜', '经典', '辣'],
    price: 0
  },
  {
    id: 22,
    name: '清蒸鲈鱼',
    description: '肉质鲜嫩，清淡健康',
    image: '🐟✨',
    category: '海鲜',
    tags: ['健康', '清淡', '高蛋白'],
    price: 0
  },
  {
    id: 23,
    name: '蚂蚁上树',
    description: '粉丝爽滑，肉末香浓',
    image: '🍜🐜',
    category: '家常菜',
    tags: ['下饭菜', '经典'],
    price: 0
  },
  {
    id: 24,
    name: '京酱肉丝',
    description: '咸甜适口，搭配豆皮',
    image: '🥓🌯',
    category: '京菜',
    tags: ['甜咸口', '经典'],
    price: 0
  },
  {
    id: 25,
    name: '蚝油生菜',
    description: '简单快手，清脆爽口',
    image: '🥬🦪',
    category: '素菜',
    tags: ['健康', '清淡', '快手'],
    price: 0
  },
  {
    id: 26,
    name: '辣子鸡丁',
    description: '麻辣干香，鸡肉酥脆',
    image: '🍗🌶️',
    category: '川菜',
    tags: ['辣', '下饭菜', '经典'],
    price: 0
  },
  {
    id: 27,
    name: '红烧肉',
    description: '肥而不腻，入口即化',
    image: '🥩🍯',
    category: '经典菜',
    tags: ['经典', '下饭菜', '甜口'],
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
    id: 29,
    name: '蒸鸡蛋羹',
    description: '嫩滑细腻，营养丰富',
    image: '🥚✨',
    category: '家常菜',
    tags: ['健康', '清淡', '营养'],
    price: 0
  },
  {
    id: 30,
    name: '拍黄瓜',
    description: '清脆爽口，简单开胃',
    image: '🥒👏',
    category: '凉菜',
    tags: ['开胃', '清淡', '快手'],
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
    id: 32,
    name: '青椒肉丝',
    description: '肉丝滑嫩，青椒爽脆',
    image: '🫑🥓',
    category: '家常菜',
    tags: ['下饭菜', '经典'],
    price: 0
  },
  {
    id: 33,
    name: '炸酱面',
    description: '面条筋道，炸酱香浓',
    image: '🍜🥫',
    category: '主食',
    tags: ['经典', '饱腹', '面食'],
    price: 0
  },
  {
    id: 34,
    name: '炒时蔬',
    description: '时令蔬菜，简单健康',
    image: '🥗✨',
    category: '素菜',
    tags: ['健康', '清淡', '时令'],
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
  },
  {
    id: 36,
    name: '肉末茄子',
    description: '茄子软糯，肉末香浓',
    image: '🍆🥓',
    category: '家常菜',
    tags: ['下饭菜', '经典'],
    price: 0
  },
  {
    id: 37,
    name: '冬瓜排骨汤',
    description: '清淡鲜美，营养滋补',
    image: '🍈🍖🍵',
    category: '汤品',
    tags: ['健康', '清淡', '滋补'],
    price: 0
  },
  {
    id: 38,
    name: '韭菜炒鸡蛋',
    description: '简单快手，香气扑鼻',
    image: '🌱🥚',
    category: '家常菜',
    tags: ['快手', '经典'],
    price: 0
  },
  {
    id: 39,
    name: '炝炒莲白',
    description: '麻辣脆爽，非常下饭',
    image: '🥬🔥',
    category: '素菜',
    tags: ['辣', '下饭菜', '快手'],
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

const userPreferences = {
  dislikes: ['胡萝卜', '蒜薹'],
  likes: ['酸酸的', '西兰花', '芹菜', '花菜']
};

// 存储连接的客户端
let connectedUsers = {};

io.on('connection', (socket) => {
  console.log('新用户连接:', socket.id);
  
  socket.on('register', (userType) => {
    connectedUsers[userType] = socket.id;
    console.log(`${userType} 已连接`);
    
    socket.emit('connected', { 
      message: `连接成功！欢迎${userType === 'girlfriend' ? '小可爱' : '男朋友'}~` 
    });
  });
  
  socket.on('add-to-cart', (data) => {
    console.log('收到点菜:', data.item?.name);
    
    if (connectedUsers.boyfriend) {
      io.to(connectedUsers.boyfriend).emit('new-order', {
        item: data.item,
        time: new Date().toLocaleTimeString('zh-CN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        message: `💝 小可爱点了: ${data.item?.name || '未知菜品'}`
      });
    }
    
    socket.emit('order-confirmed', {
      message: `💖 已添加到购物车！稍等片刻哦~`
    });
  });
  
  socket.on('checkout', (data) => {
    console.log('提交订单:', data.items?.length || 0 + '个菜品');
    
    if (connectedUsers.boyfriend) {
      io.to(connectedUsers.boyfriend).emit('order-complete', {
        items: data.items || [],
        total: data.total || 0,
        time: new Date().toLocaleString('zh-CN'),
        message: '🎉 小可爱的完整订单来啦！快去准备吧~'
      });
    }
    
    socket.emit('checkout-complete', {
      message: '📦 订单已发送给男朋友啦！等着吃好吃的吧~ 😋'
    });
  });
  
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
    for (let userType in connectedUsers) {
      if (connectedUsers[userType] === socket.id) {
        delete connectedUsers[userType];
        console.log(`${userType} 已断开`);
      }
    }
  });
});

// API路由（与Vercel API保持一致）
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.get('/api/preferences', (req, res) => {
  res.json(userPreferences);
});

app.get('/api/period-friendly', (req, res) => {
  const periodFriendlyItems = menuItems.filter(item => 
    item.tags && item.tags.includes('经期友好')
  );
  res.json(periodFriendlyItems);
});

app.get('/api/sour-dishes', (req, res) => {
  const sourDishes = menuItems.filter(item => 
    item.tags && item.tags.includes('酸酸的')
  );
  res.json(sourDishes);
});

app.get('/api/broccoli-dishes', (req, res) => {
  const broccoliDishes = menuItems.filter(item => 
    item.name && (item.name.includes('西兰花') || item.name.includes('花菜'))
  );
  res.json(broccoliDishes);
});

// 页面路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'girlfriend.html'));
});

app.get('/girlfriend', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'girlfriend.html'));
});

app.get('/boyfriend', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'boyfriend.html'));
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 本地开发端口
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 本地服务器运行在: http://localhost:${PORT}`);
  console.log(`👩 女友端: http://localhost:${PORT}/girlfriend`);
  console.log(`👨 男友端: http://localhost:${PORT}/boyfriend`);
  console.log(`📊 API: http://localhost:${PORT}/api/menu`);
  console.log(`💡 提示: 按 Ctrl+C 停止服务器`);
});