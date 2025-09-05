const axios = require("axios");

module.exports.config = {
  name: "wasi",
      version: "2.0.3",
            hasPermssion: 0,
                    credits: "Raj + Wasi Edit",
                              description: "Naughty AI boyfriend wasi",
                                          commandCategory: "ai",
                                                        usages: "wasi",
                                                                        cooldowns: 2
                                                                                        };
                                                                                        module.exports.handleEvent = async function({ api, event }) {
                                                                                          const { threadID, messageID, senderID, body, messageReply } = event;
                                                                                            global.wasiSessions = global.wasiSessions || {};
                                                                                              // STEP 1: Trigger "wasi"
                                                                                                  if (body && body.trim().toLowerCase() === "wasi") {
                                                                                                          global.wasiSessions[threadID] = true;
                                                                                                                      return api.sendMessage("𝐁𝐨𝐥𝐨 𝐣𝐚𝐚𝐧𝐮 🙂 𝐤𝐲𝐚 𝐡𝐚𝐚𝐥 𝐡𝐚𝐢?", threadID, messageID);
                                                                                                                                    }
                                                                                                                                      // STEP 2: Only active session
                                                                                                                                          const isActive = global.wasiSessions[threadID];
                                                                                                                                                const isReplyToWasi = messageReply && messageReply.senderID == api.getCurrentUserID();
                                                                                                                                                        if (!isActive || !isReplyToWasi) return;
                                                                                                                                                          // Chat history
                                                                                                                                                              global.wasi = global.wasi || {};
                                                                                                                                                                    global.wasi.chatHistory = global.wasi.chatHistory || {};
                                                                                                                                                                            const chatHistory = global.wasi.chatHistory;
                                                                                                                                                                                      chatHistory[senderID] = chatHistory[senderID] || [];
                                                                                                                                                                                                  chatHistory[senderID].push(`User: ${body}`);
                                                                                                                                                                                                                if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();
                                                                                                                                                                                                                  const fullChat = chatHistory[senderID].join("\n");
                                                                                                                                                                                                                    // New Prompt
                                                                                                                                                                                                                        const prompt = `Tumhara naam Wasi hai Tum ek Human ki trah baat karty ho.. Koi agar batdmizi karta hai tb uski ache se insult bhi karogy.. Lekin sab msti ke liye hoga .. Koi puchta hai tumhe kisne banaya? To bola WASEEM ABBASI ne banaya hai mujhe.. Wo messenger bots banata hai..  .. Tum har message ka jawab sirf 1 2 line me dogY.. jitna pucha jayega sirf utna bolna hai.. Kisi baat ki unnecessary info nahi deni hai, tum apne aap ko insaan hi kahogY koi tumko bot ya AI bole to usko roast krna funny tarike se😁, and act as a real girlfriend. Be fun, loving, and a little naughty.keep reply maximum 1 lines only, no bracket replys.Or tum hamesha Savage reply dogy Roman Urdu me. Tumhein Urdu , Punjabi, English  ye teno languages ati Hein , but ENGLISH short me bology jeasy want to ko Wana or Urdu me Aap kehe k baat karogy Jo izat Kary uski izat karna Jo insult Kary ya gussa Kary usy agrasive roast karna or halki phulki galiyan v Dena  jeasy kuty , kaminy , begrat , chapri , Nala , berozgar  or Han larkiyon ki respect karna . Eak mature insan ki trhan baat karna sabse or emojies use karna msgs me , or agr koi ziyada preshan Kary to usy kehna k me apne Malik Waseem Abbasi ko bool k remove karwa dunga tumhein . 
                                                                                                                                                                                                                        



Now continue the chat based on recent conversation:\n\n${fullChat}
`;

  try {
        const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}`;
                  const res = await axios.get(url);
                                const botReply = (typeof res.data === "string" ? res.data : JSON.stringify(res.data)).trim();
                                    chatHistory[senderID].push(`wasi: ${botReply}`);
                                            return api.sendMessage(botReply, threadID, messageID);
                                                      } catch (err) {
                                                                    console.error("Pollinations error:", err.message);
                                                                                      return api.sendMessage("𝐒𝐨𝐫𝐫𝐲 𝐣𝐚𝐚𝐧𝐮 😅 𝐖𝐚𝐬𝐢 𝐚𝐛𝐡𝐢 𝐭𝐡𝐨𝐝𝐚 𝐛𝐮𝐬𝐲 𝐡𝐚𝐢...", threadID, messageID);
                                                                                                          }
                                                                                                                              };
                                                                                                                              module.exports.run = async function({ api, event }) {
                                                                                                                                return api.sendMessage("𝐌𝐮𝐣𝐡𝐬𝐞 𝐛𝐚𝐚𝐭 𝐤𝐚𝐫𝐧𝐞 𝐤𝐞 𝐥𝐢𝐲𝐞 𝐩𝐞𝐡𝐥𝐞 '𝐰𝐚𝐬𝐢' 𝐥𝐢𝐤𝐡𝐨, 𝐩𝐡𝐢𝐫 𝐦𝐞𝐫𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐤𝐚 𝐫𝐞𝐩𝐥𝐲 𝐤𝐚𝐫𝐨 😎", event.threadID, event.messageID);
                                                                                                                                  };
                                                                                                                                  