const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Variables to store active streams
const activeStreams = new Map();
const activeViewers = new Map();

// Socket.IO for chat
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Join stream room
  socket.on('join-stream', (streamId) => {
    socket.join(`stream-${streamId}`);
    
    // Increment viewer count
    if (!activeViewers.has(streamId)) {
      activeViewers.set(streamId, 1);
    } else {
      activeViewers.set(streamId, activeViewers.get(streamId) + 1);
    }
    
    // Notify everyone about new viewer count
    io.to(`stream-${streamId}`).emit('viewer-count', activeViewers.get(streamId));
  });
  
  // Leave stream room
  socket.on('leave-stream', (streamId) => {
    socket.leave(`stream-${streamId}`);
    
    // Decrement viewer count
    if (activeViewers.has(streamId)) {
      const viewerCount = Math.max(0, activeViewers.get(streamId) - 1);
      activeViewers.set(streamId, viewerCount);
      
      // Notify everyone about new viewer count
      io.to(`stream-${streamId}`).emit('viewer-count', viewerCount);
    }
  });
  
  // Chat message
  socket.on('chat-message', (message) => {
    if (message && message.streamId && message.text) {
      io.to(`stream-${message.streamId}`).emit('chat-message', {
        id: message.id || Date.now(),
        streamId: message.streamId,
        sender: message.sender || 'Anonymous',
        text: message.text,
        timestamp: message.timestamp || new Date().toISOString()
      });
    }
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API Routes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Get active streams
app.get('/api/streams', (req, res) => {
  const streams = Array.from(activeStreams.values()).map(stream => ({
    ...stream,
    viewers: activeViewers.get(stream.id) || 0
  }));
  
  res.json(streams);
});

// Stream authentication
app.post('/auth/stream', (req, res) => {
  const streamKey = req.body.name;
  const streamerId = req.body.userId || 'anonymous';
  
  // In a real app, validate the stream key against a database
  // For now, allow all streams
  
  const streamId = streamKey;
  
  // Register the stream
  activeStreams.set(streamId, {
    id: streamId,
    title: `Motocross Stream ${streamId}`,
    streamerId,
    startedAt: new Date().toISOString(),
    thumbnail: `/thumbnails/${streamId}.jpg`
  });
  
  console.log(`Stream started: ${streamId}`);
  res.status(200).send('OK');
});

// Stream end
app.post('/auth/stream-done', (req, res) => {
  const streamKey = req.body.name;
  
  // Remove the stream
  if (activeStreams.has(streamKey)) {
    activeStreams.delete(streamKey);
    console.log(`Stream ended: ${streamKey}`);
  }
  
  res.status(200).send('OK');
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});