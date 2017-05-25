import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
  initialState: {
    lists: [
      { name: 'dva', id: 1 },
      { name: 'antd', id: 2 },
    ],
  },
});

app.model(require('./models/list'));
app.model(require('./models/add'));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
