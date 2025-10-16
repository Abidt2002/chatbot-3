// ---------- SIMPLE QA SEARCH ----------
function findAnswer(userInput) {
  userInput = userInput.toLowerCase();
  for (let i = 0; i < qaDataset.length; i++) {
    if (userInput.includes(qaDataset[i].q.toLowerCase())) {
      return qaDataset[i].a;
    }
  }
  return "I'm sorry, I don't have information about that yet. Please ask something related to DevBay.";
}

// ---------- MESSAGE DISPLAY ----------
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Typewriter effect for bot messages
  if (sender === "bot") {
    let index = 0;
    const interval = setInterval(() => {
      msgDiv.textContent += message[index];
      index++;
      if (index >= message.length) clearInterval(interval);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 25);
  } else {
    msgDiv.textContent = message;
  }
}

// ---------- SEND MESSAGE ----------
sendBtn.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text === "") return;

  appendMessage("user", text);
  userInput.value = "";

  const answer = findAnswer(text);
  setTimeout(() => appendMessage("bot", answer), 500);
});

// Enter key support
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// ---------- OPEN/CLOSE ----------
const chatbotIcon = document.getElementById("chatbot-icon");
const chatContainer = document.getElementById("chat-container");
const closeChat = document.getElementById("close-chat");

chatbotIcon.addEventListener("click", () => {
  chatContainer.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
  chatContainer.classList.add("hidden");
});
