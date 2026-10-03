const express = require('express');
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');

const app = express();
const PORT = process.env.PORT || 3000;

const APP_ID = "3f5f68440a96421595a2a4ce22ddaf69";
const APP_CERTIFICATE = "8d3f3bd43f8f4398aa3962b3c88a2d35";

app.get('/token', (req, res) => {
  const channelName = req.query.channel;
  if (!channelName) {
    return res.status(400).json({ error: 'channel required' });
  }
  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expirationTime = 60 * 60 * 24; // 24 hours
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTime;

  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
  console.log(`Token generated for channel: ${channelName}`);
  res.json({ token: token, channel: channelName });
});

app.get('/', (req, res) => {
  res.send('SecureChild Token Server is Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});