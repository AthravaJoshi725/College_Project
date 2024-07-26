async function sendMessage() {
    const inputBox = document.getElementById('user-input');
    const message = inputBox.value;
    inputBox.value = '';

    if (!message.trim()) return;

    const chatBox = document.getElementById('chat-box');

    // Create user message wrapper
    const userMessageWrapper = document.createElement('div');
    userMessageWrapper.classList.add('message-wrapper', 'user-wrapper');

    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user');
    userMessageDiv.textContent = message;

    userMessageWrapper.appendChild(userMessageDiv);
    chatBox.appendChild(userMessageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add loading indicator wrapper
    const loadingWrapper = document.createElement('div');
    loadingWrapper.classList.add('message-wrapper');

    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'bot');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    loadingDiv.appendChild(loadingIndicator);

    loadingWrapper.appendChild(loadingDiv);
    chatBox.appendChild(loadingWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;

    const response = await fetch('/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    const data = await response.json();

    // Remove loading indicator
    chatBox.removeChild(loadingWrapper);

    // Create bot message wrapper
    const botMessageWrapper = document.createElement('div');
    botMessageWrapper.classList.add('message-wrapper');

    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('message', 'bot');
    botMessageDiv.textContent = data.reply;

    botMessageWrapper.appendChild(botMessageDiv);
    chatBox.appendChild(botMessageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function refreshChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
}
