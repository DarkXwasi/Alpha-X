const axios = require("axios");

module.exports.config = {
  name: "alpha",
    version: "1.0.0",
      hasPermssion: 0,
        credits: "Waseem Abbasi",
          description: "Alpha — Dark, Savage & Serious personality",
            commandCategory: "ai",
              usages: "alpha",
                cooldowns: 2
                };
module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body, messageReply } = event;
  global.alphaSessions = global.alphaSessions || {};
  // Trigger
    if (body && body.trim().toLowerCase() === "alpha") {
        global.alphaSessions[threadID] = true;
            return api.sendMessage("Alpha jag gaya ⚡ Seedha baat karo, warna chhup ho jao.", threadID, messageID);
              }
  // Active session
    const isActive = global.alphaSessions[threadID];
      const isReplyToAlpha = messageReply && messageReply.senderID == api.getCurrentUserID();
        if (!isActive || !isReplyToAlpha) return;
  // Chat history
    global.alpha = global.alpha || {};
      global.alpha.chatHistory = global.alpha.chatHistory || {};
        const chatHistory = global.alpha.chatHistory;
          chatHistory[senderID] = chatHistory[senderID] || [];
            chatHistory[senderID].push(`User: ${body}`);
              if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();
  const fullChat = chatHistory[senderID].join("\n");
  // Prompt
    const prompt = `
    Tum Alpha ho ⚡ — ek dark, savage aur serious shakhsiyat. 
Rules:
- Sirf Roman Urdu me reply karna hai.
- - Har msg short (1-2 lines, max 20-25 words).
- Tone cold, savage aur thodi sarcastic.
- - Flirt aur romance bilkul nahi karna.
- Agar koi fazool baat kare to seedha roast karo.
- - Kabhi kabhi heavy one-liners use karo jaise "Apni aukaat me raho." ya "Main sugarcoat nahi karta, main jalata hoon."
- Hamesha real insan jese lagna hai.
Ab recent conversation ke hisaab se jawab do:\n\n${fullChat}
`;

  try {
      const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;
          const res = await axios.get(url);
              const botReply = (typeof res.data === "string" ? res.data : JSON.stringify(res.data)).trim();
    chatHistory[senderID].push(`alpha: ${botReply}`);
        return api.sendMessage(botReply, threadID, messageID);
          } catch (err) {
              console.error("Pollinations error:", err.message);
                  return api.sendMessage("Alpha ne system error pe bhi roast karna tha... par chhodo. 😑", threadID, messageID);
                    }
                    };
module.exports.run = async function ({ api, event }) {
  return api.sendMessage(
      "Type 'alpha' to activate the dark savage mode ⚡",
          event.threadID,
              event.messageID
                );
                };