const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

// Send message when Enter key is pressed
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    // Display user message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerHTML = `<strong>👤 You</strong><br>${message}`;
    chatBox.appendChild(userDiv);

    userInput.value = "";

    // Show loading
    const loading = document.createElement("div");
    loading.className = "ai-message typing";
    loading.id = "loading";
    loading.innerHTML = "🤖 Hope Nexus AI is thinking...";
    chatBox.appendChild(loading);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("http://localhost:5000/api/ai/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        // Remove loading
        document.getElementById("loading").remove();

        // Display AI response
        const aiDiv = document.createElement("div");
        aiDiv.className = "ai-message";

        aiDiv.innerHTML = `
    <strong>🤖 Hope Nexus AI</strong>
    <hr class="my-2">
    ${marked.parse(data.reply)}
`;

        chatBox.appendChild(aiDiv);

        chatBox.appendChild(aiDiv);

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        document.getElementById("loading").remove();

        const errorDiv = document.createElement("div");

        errorDiv.className = "ai-message";

        errorDiv.innerHTML = `
            <strong>❌ Error</strong>
            <br><br>
            Unable to connect to AI Assistant.
        `;

        chatBox.appendChild(errorDiv);

    }

}