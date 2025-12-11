// Socket.io API路由（Vercel Serverless Functions版）
import { Server } from 'socket.io';

// 存储连接的客户端
const connectedUsers = {};

export default function handler(req, res) {
  // 如果res.socket.server.io已存在，重用它
  if (!res.socket.server.io) {
    console.log('初始化Socket.io服务器...');
    
    // 创建Socket.io服务器
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
      transports: ['polling', 'websocket'],
      pingTimeout: 60000,
      pingInterval: 25000
    });
    
    // 存储io实例
    res.socket.server.io = io;
    
    // Socket.io事件处理
    io.on('connection', (socket) => {
      console.log('新用户连接:', socket.id);
      
      socket.on('register', (userType) => {
        connectedUsers[userType] = socket.id;
        console.log(`${userType} 已连接`);
        
        // 发送连接成功消息
        socket.emit('connected', { 
          message: `连接成功！欢迎${userType === 'girlfriend' ? '小可爱' : '男朋友'}~` 
        });
      });
      
      socket.on('add-to-cart', (data) => {
        console.log('收到点菜:', data.item?.name);
        
        // 发送给男友
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
        
        // 确认消息回传给女友
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
        // 清理断开连接的用户
        for (let userType in connectedUsers) {
          if (connectedUsers[userType] === socket.id) {
            delete connectedUsers[userType];
            console.log(`${userType} 已断开`);
          }
        }
      });
    });
  }
  
  // 处理HTTP请求
  res.end();
}

// 配置Vercel Serverless Functions
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};