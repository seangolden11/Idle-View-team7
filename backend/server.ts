import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import axios from 'axios';

const app = express();
// 기존 CORS 설정을 아래와 같이 변경
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // CORS 미들웨어 적용
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Root route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

// Middleware to verify JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    (req as any).user = decoded;
    next();
  });
};

// API: 회원가입
app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password_hash: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.user_id });
  } catch (error) {
    next(error);
  }
});

// API: 로그인
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ userId: user.user_id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
});

// API: 대시보드 설정 불러오기
app.get('/dashboard/settings', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await prisma.dashboardSetting.findFirst({
      where: { user_id: (req as any).user.userId },
    });
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

// API: 위젯 추가하기
app.post('/widget/add', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  const { widget_type, config } = req.body;
  try {
    await prisma.widget.create({
      data: {
        user_id: (req as any).user.userId,
        widget_type,
        config,
      },
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// API: 위젯 삭제하기
app.delete('/widget/remove', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  const { widget_id } = req.body;
  try {
    await prisma.widget.delete({
      where: { widget_id },
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

app.get('/widget/weather', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY || 'TGocIkLZrVsK2CylrjJuwnCPkwjcshlUB1Eiw9BbTF6veLrvMIH4U3scYaMHP297LHiKpNW41irfzEjOUlx%2BUw%3D%3D';
    const baseUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtFcst';
    
    const now = new Date();
    const baseDate = now.toISOString().split('T')[0].replace(/-/g, ''); // yyyyMMdd
    const baseTime = '0600'; // 발표 시간은 요청 시간에 따라 동적으로 조정 가능

    // 격자 변환 로직 필요 시 추가
    const nx = 55; // Placeholder
    const ny = 127; // Placeholder

    const response = await axios.get(baseUrl, {
      params: {
        serviceKey: apiKey,
        numOfRows: 10,
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny,
      },
    });

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// API: 일정 관리 (Mock 데이터 예시)
app.get('/widget/schedule', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  res.json({ events: [{ title: 'Meeting', date: '2024-11-15', time: '10:00' }] });
});

// API: IdleView 화면 활성화
app.post('/idleview/activate', authenticateToken, (req: Request, res: Response) => {
  res.json({ success: true });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
