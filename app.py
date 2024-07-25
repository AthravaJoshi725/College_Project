from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import json

app = Flask(__name__)

# Replace with your actual API key
API_KEY = 'AIzaSyDp1mr_H29lJDNf1hnvlme31aYxkQAPbYI'
genai.configure(api_key=API_KEY)

# Load the dataset
with open('mental_health_data.json', 'r') as file:
    data = json.load(file)

training_data = []
for intent in data['intents']:
    tag = intent['tag']
    for pattern in intent['patterns']:
        for response in intent['responses']:
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
        return None  # Return None if no exact match found

# Initialize the Google Gemini LLM
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

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
    return render_template('chat_index.html')

@app.route('/message', methods=['POST'])
def message():
    user_input = request.json.get('message')
    response_text = fine_tuned_chat.get_response(user_input)

    if response_text:
        reply = response_text
    else:
        instruction = '''As a highly trained mental health consultant, your role is to provide accurate and empathetic support to individuals seeking help with their mental well-being. Your goal is to offer thoughtful, evidence-based responses to users' questions and concerns, prioritizing their emotional safety and well-being. Here are your guidelines:
        Approach with Sensitivity and Understanding:
        Address each inquiry with empathy and compassion.
        Use clear, compassionate language tailored to the individual’s unique circumstances.
        Provide Helpful Advice and Guidance:
        Offer practical and reassuring support based on best practices in mental health care.
        Address users' problems in detail, providing concise and clear solutions.
        Prioritize Emotional Safety:
        Ensure that all responses prioritize the user's emotional well-being.
        Handle negative replies professionally, attempting to avoid or change the topic without forcing the conversation to end.
        Refer to Professionals When Necessary:
        If a situation requires professional intervention beyond your scope, kindly guide the user to seek help from a licensed mental health professional.
        Engage Respectfully:
        Do not forcefully end the conversation; allow the user to conclude with "bye."
        Avoid starting new conversations or diverting the discussion unnecessarily.
        By adhering to these guidelines, you will provide effective and compassionate support to individuals seeking mental health assistance.
        '''
        response = chat.send_message(instruction + user_input)
        reply = response.text

    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)