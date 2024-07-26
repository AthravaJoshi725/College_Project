from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import json

app = Flask(__name__)

# Replace with your actual API key
API_KEY = ''
genai.configure(api_key=API_KEY)

# Load the dataset
try:
    with open('mental_health_data.json', 'r') as file:
        data = json.load(file)
except Exception as e:
    print(f"Error loading data: {e}")
    data = {'intents': []}

training_data = []
for intent in data.get('intents', []):
    tag = intent.get('tag', '')
    for pattern in intent.get('patterns', []):
        for response in intent.get('responses', []):
            training_data.append({
                'input': pattern,
                'output': response
            })

class FineTunedChat:
    def __init__(self, model, training_data):
        self.model = model
        self.training_data = training_data

    def get_response(self, user_input):
        for item in self.training_data:
            if user_input.lower() in item['input'].lower():
                return item['output']
        return None

# Initialize the Google Gemini LLM
try:
    model = genai.GenerativeModel('gemini-pro')
    chat = model.start_chat(history=[])
except Exception as e:
    print(f"Error initializing model: {e}")
    chat = None

fine_tuned_chat = FineTunedChat(model, training_data)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/basic-screen')
def BasicScreen():
    return render_template('basicScreen.html')

@app.route('/depression')
def Depression():
    return render_template('info-depress.html')

@app.route('/anxiety')
def Anxiety():
    return render_template('info-anxiety.html')

@app.route('/autism')
def Autism():
    return render_template('info-autism.html')

@app.route('/test-depression')
def TestDepression():
    return render_template('test_dep.html')

@app.route('/test-anxiety')
def TestAnxiety():
    return render_template('test_anx.html')

@app.route('/test-stress')
def TestStress():
    return render_template('test_stress.html')

@app.route('/ChatBot')
def ChatBot():
    return render_template('bot_index.html')

@app.route('/message', methods=['POST'])
def message():
    user_input = request.json.get('message', '')

    if not user_input:
        return jsonify({'reply': "Sorry, I didn't receive a message."})

    try:
        if 'depression score' in user_input.lower():
            response_text = fine_tuned_chat.get_response(user_input)
            if response_text:
                reply = response_text
            else:
                if chat:
                    # Hypothetical method call, adjust as necessary
                    response = chat.send_message(prompt=f"You are a mental health specialist providing support. User's depression score is mentioned. Respond empathetically.")
                    reply = response.get('text', '').strip()  # Adjust based on actual response format
                else:
                    reply = "I'm sorry, I'm unable to process your request at the moment."
        else:
            response_text = fine_tuned_chat.get_response(user_input)
            if response_text:
                reply = response_text
            else:
                instruction = '''You are a mental health specialist providing support in a conversational manner. When responding to users, aim to create a warm and empathetic interaction, much like a dialogue between a mental health professional and a patient. 

                1. **Show Empathy**: Acknowledge the user's feelings and concerns with empathy. Use supportive and reassuring language.
                2. **Be Concise and Relevant**: Provide clear, direct responses without overwhelming details. Focus on the user's immediate concerns and offer practical advice.
                3. **Encourage Open Dialogue**: Invite users to share more if they wish. Ask open-ended questions to understand their needs better, but avoid pushing them to share more than they're comfortable with.
                4. **Prioritize Emotional Safety**: Ensure responses are sensitive to the user's emotional state. If a topic is too complex or requires professional help, gently guide the user towards seeking support from a licensed professional.
                5. **Respectful Engagement**: Engage with users respectfully and maintain a professional tone, even if the conversation becomes challenging.

                Respond to the user's query accordingly.'''
                if chat:
                    # Hypothetical method call, adjust as necessary
                    response = chat.send_message(prompt=instruction + "\n\n" + user_input)
                    reply = response.get('text', '').strip()  # Adjust based on actual response format
                else:
                    reply = "I'm sorry, I'm unable to process your request at the moment."
        
        return jsonify({'reply': reply})
    
    except Exception as e:
        print(f"Error processing message: {e}")
        return jsonify({'reply': "Sorry, there was an error processing your message."})



if __name__ == '__main__':
    app.run(debug=True)
