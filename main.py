import streamlit as st

# Set up the title and description
st.set_page_config(page_title="Interactive ML Model", page_icon="🤖")
st.markdown(
    """
    <style>
    .main-title {
        font-size: 48px;
        color: #4CAF50;
        text-align: center;
        margin-top: -60px;
        margin-bottom: 20px;
    }
    .sidebar .sidebar-content {
        background-color: #f0f2f6;
    }
    .message {
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        display: inline-block;
        max-width: 70%;
    }
    .user-message {
        background-color: #dcf8c6;
        text-align: right;
        align-self: flex-end;
    }
    .bot-message {
        background-color: #e0e0e0;
        text-align: left;
        align-self: flex-start;
    }
    .chat-container {
        display: flex;
        flex-direction: column;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# Display the title
st.markdown("<div class='main-title'>Interactive ML Model</div>", unsafe_allow_html=True)

# Initialize chat history
if 'history' not in st.session_state:
    st.session_state.history = []

# User input form
with st.form(key='chat_form', clear_on_submit=True):
    user_input = st.text_input("Type your message:")
    submit_button = st.form_submit_button(label='Send')

# Process user input
if submit_button and user_input:
    # Add user message to history
    st.session_state.history.append({"message": user_input, "is_user": True})

    # Here you will integrate your ML model to generate a response
    # For now, we will use a placeholder response
    response = "This is a placeholder response. Integrate your ML model to generate a real response."
    st.session_state.history.append({"message": response, "is_user": False})

# Display chat history
chat_container = st.container()
with chat_container:
    for chat in st.session_state.history:
        if chat["is_user"]:
            st.markdown(f"<div class='message user-message'>{chat['message']}</div>", unsafe_allow_html=True)
        else:
            st.markdown(f"<div class='message bot-message'>{chat['message']}</div>", unsafe_allow_html=True)

# Sidebar information
st.sidebar.title("About")
st.sidebar.info(
    """
    This is an interactive chat interface powered by a machine learning model.
    You can type your message in the text box and receive responses from the model.
    """
)
