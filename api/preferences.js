// 用户偏好API
const userPreferences = {
  dislikes: ['胡萝卜', '蒜薹'],
  likes: ['酸酸的', '西兰花', '芹菜', '花菜']
};

export default function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只允许GET请求' });
  }
  
  res.status(200).json(userPreferences);
}