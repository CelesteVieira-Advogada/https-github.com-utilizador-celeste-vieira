const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function getAgentResponse(message) {
  const text = message.trim();

  if (!text) {
    return {
      status: 'error',
      answer: 'Please enter a message for the agent.'
    };
  }

  const lower = text.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return {
      status: 'ok',
      answer: 'Hello! I am your agent. How can I help you today?'
    };
  }

  if (lower.includes('status') || lower.includes('health')) {
    return {
      status: 'ok',
      answer: 'All systems are operational. The agent is listening and ready.'
    };
  }

  if (lower.includes('plan') || lower.includes('task')) {
    return {
      status: 'ok',
      answer: 'Here is the plan: 1) define the goal, 2) inspect the relevant files, 3) implement the fix, 4) verify the result.'
    };
  }

  return {
    status: 'ok',
    answer: `I received: "${text}". This starter agent is ready to be connected to your real logic or API.`
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'agent-starter' });
});

app.post('/api/chat', (req, res) => {
  const { message = '' } = req.body || {};
  const response = getAgentResponse(message);
  res.json(response);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Agent app running at http://localhost:${PORT}`);
});
