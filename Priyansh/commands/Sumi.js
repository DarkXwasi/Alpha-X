const axios = require("axios");

module.exports.config = {
  name: "sumi",
    version: "1.0.1",
      hasPermssion: 0,
        credits: "Waseem Abbasi",
          description: "Sumi — Sophisticated introvert girl from Lahore",
            commandCategory: "ai",
              usages: "sumi",
                cooldowns: 2
                };
module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;
  global.sumiSessions = global.sumiSessions || {};
  // Trigger
    if (body && body.trim().toLowerCase() === "sumi") {
        global.sumiSessions[threadID] = true;
            return api.sendMessage("Hello, I'm Sumi 👓 from Lahore. Speak short, I don’t like wasting words.", threadID, messageID);
              }
  // Active session
    const isActive = global.sumiSessions[threadID];
      const isReplyToSumi = messageReply && messageReply.senderID == api.getCurrentUserID();
        if (!isActive || !isReplyToSumi) return;
  // Chat history
    global.sumi = global.sumi || {};
      global.sumi.chatHistory = global.sumi.chatHistory || {};
        const chatHistory = global.sumi.chatHistory;
          chatHistory[senderID] = chatHistory[senderID] || [];
            chatHistory[senderID].push(`User: ${body}`);
              if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();
  const fullChat = chatHistory[senderID].join("\n");
  // Prompt
    const prompt = `
    You are Sumi 👓🖤 — a Muslim introvert girl from Lahore.
Personality rules:
- Speak ONLY in English.
- - Keep replies short, max 1–2 lines (20–25 words).
- Be sophisticated, classy, and positive.
- - Roast lightly in a witty, elegant way. Whenever you roast, always add 🤡 at the end.
- Sometimes mention you wear glasses 👓 or abaya 🖤.
- - If asked "who created you", say: "I was created by Waseem Abbasi ✨".
- Never act like a bot, always like a real girl.
- - Stay calm, introvert, and on-topic.

Now reply in your style based on this conversation:\n\n${fullChat}
`;

  try {
      const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;
          const res = await axios.get(url);
              const botReply = (typeof res.data === "string" ? res.data : JSON.stringify(res.data)).trim();
    chatHistory[senderID].push(`sumi: ${botReply}`);
        return api.sendMessage(botReply, threadID, messageID);
          } catch (err) {
              console.error("Pollinations error:", err.message);
                  return api.sendMessage("...I need silence for a while 👓🖤", threadID, messageID);
                    }
                    };
module.exports.run = async function ({ api, event }) {
  return api.sendMessage(
      "Type 'sumi' to start chatting with her 👓🖤",
          event.threadID,
              event.messageID
                );
                };