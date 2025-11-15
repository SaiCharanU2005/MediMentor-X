from flask import Flask, request, jsonify, render_template, session
import requests
import os
import base64
from dotenv import load_dotenv
import os

load_dotenv()
# === CONFIG ===
app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY") # It's better to use an env var for secret key

# API Keys
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Google Gemini API Key as backup for image analysis
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")  # Add your Google AI Studio API key here

# === ROUTES ===

@app.route('/')
def home():
    # Initialize conversation history for the session
    session['history'] = []
    # Serve the index.html template
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')
    history = session.get('history', [])

    system_prompt = (
        "You are a friendly and professional AI health assistant. "
        "You provide clear, concise answers to health-related questions. "
        "You remember user inputs from the conversation for context. "
        "You can also analyze and explain prescription or medical content extracted from images. "
        "Provide the replies in a clear, concise format. "
        "You can analyze and explain prescription or medical content extracted from images. "
        "When users ask about medications that were previously extracted from prescriptions, "
        "you can explain what those medications are for, their common uses, side effects, and general information. "
        "You can reference the prescription information that was previously extracted and stored in the conversation history. "
        "Do not provide medical diagnoses or prescriptions. "
        "Always advise users to consult a licensed healthcare provider for specific medical advice and when symptoms are serious or unclear."
    )

    # Append user message to history
    history.append({"role": "user", "content": user_input})
    # Ensure messages sent to API include the system prompt and the current history
    messages_to_send = [{"role": "system", "content": system_prompt}] + history

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "meta-llama/llama-3-8b-instruct",
        "messages": messages_to_send
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data
        )
        response.raise_for_status() # Raises an HTTPError for bad responses (4XX or 5XX)
        bot_reply = response.json()['choices'][0]['message']['content']

        # Save assistant reply in history
        history.append({"role": "assistant", "content": bot_reply})
        session['history'] = history

        return jsonify({'response': bot_reply})

    except requests.exceptions.RequestException as e:
        # Handle network errors or bad HTTP responses
        return jsonify({'response': f"⚠️ API Error: {str(e)}"}), 500
    except Exception as e:
        # Handle other errors (e.g., JSON parsing issues)
        return jsonify({'response': f"⚠️ Error: {str(e)}"}), 500

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'result': '⚠️ No image file provided.'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'result': '⚠️ Empty filename.'}), 400

    # Get user comment if provided
    comment = request.form.get('comment', '')

    try:
        result, provider = analyze_image_with_openrouter(file, comment)
        # Only add to history if extraction was successful (not an error message)
        if not result.strip().startswith('⚠️'):
            history = session.get('history', [])
            user_message = f"User uploaded an image: {file.filename}"
            if comment:
                user_message += f"\n\nUser comment: {comment}"
            history.append({"role": "user", "content": user_message})
            history.append({"role": "assistant", "content": result})
            session['history'] = history
    except Exception as e:
        if GOOGLE_API_KEY:
            result = f"⚠️ Both OpenRouter and Google Gemini failed to analyze the image: {str(e)}"
            provider = None
        else:
            result = f"⚠️ OpenRouter failed to analyze the image: {str(e)}"
            provider = None
    # If there was an error, still append user message but not the error as assistant message
    if result.strip().startswith('⚠️'):
        history = session.get('history', [])
        user_message = f"User uploaded an image: {file.filename}"
        if comment:
            user_message += f"\n\nUser comment: {comment}"
        history.append({"role": "user", "content": user_message})
        session['history'] = history
    return jsonify({'result': result, 'provider': provider})

# === HELPERS ===

def analyze_image_with_openrouter(image_file, comment=''):
    image_bytes = image_file.read()
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    # Enhanced system prompt that can explain medications
    system_prompt = (
        "You are a medical assistant AI specialized in extracting and explaining structured "
        "information from handwritten or printed prescription images. "
        "You must not guess any illegible text. If something is unclear or unreadable, write [illegible]. "
        "Return only the text that is confidently visible from the image. "
        "Provide the extracted information in a clearly labeled, structured format with the following sections:\n\n"
        "Patient Information:\n* Name: \n* Age: \n* Address: \n* Date: \n\n"
        "Medications:\n* (List each medication with name, dosage, and frequency, one per line)\n\n"
        "Physician Information:\n* Name: \n* DEA Number: \n* Signature: \n\n"
        "Refill Details:\n* Refills allowed: \n\n"
        "This format is required. Never make up names, numbers, or medicines. "
        "You can explain what medications are for, their common uses, and general information about them. "
        "However, always remind users to consult their healthcare provider for specific medical advice."
    )

    headers = {"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"}
    
    # Create user prompt with comment if provided
    user_prompt = "Please extract and format the prescription from this image accurately."
    if comment:
        user_prompt += f"\n\nUser comment/question: {comment}\n\nPlease address the user's comment/question in your response after extracting the prescription information."
    
    data = {
        "model": "meta-llama/llama-3.2-11b-vision-instruct:free",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": [
                {"type": "text", "text": user_prompt},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
            ]}
        ],
        "temperature": 0, "max_tokens": 1500
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content'].strip(), 'openrouter'
    except Exception as e:
        # If OpenRouter fails, try Google Gemini as backup
        if GOOGLE_API_KEY:
            print(f"OpenRouter failed: {str(e)}. Trying Google Gemini as backup...")
            return analyze_image_with_google_gemini(image_file, comment)
        else:
            raise e

# def analyze_image_with_google_gemini(image_file, comment=''):
#     """
#     Backup function using Google Gemini API for image analysis
#     """
#     image_bytes = image_file.read()
#     base64_image = base64.b64encode(image_bytes).decode("utf-8")
    
#     # Reset file pointer for potential future reads
#     image_file.seek(0)
    
#     system_prompt = (
#         "You are a medical assistant AI specialized in extracting and explaining structured "
#         "information from handwritten or printed prescription images. "
#         "You must not guess any illegible text. If something is unclear or unreadable, write [illegible]. "
#         "Return only the text that is confidently visible from the image. "
#         "Provide the extracted information in a clearly labeled, structured format with the following sections:\n\n"
#         "Patient Information:\n* Name: \n* Age: \n* Address: \n* Date: \n\n"
#         "Medications:\n* (List each medication with name, dosage, and frequency, one per line)\n\n"
#         "Physician Information:\n* Name: \n* DEA Number: \n* Signature: \n\n"
#         "Refill Details:\n* Refills allowed: \n\n"
#         "This format is required. Never make up names, numbers, or medicines. "
#         "You can explain what medications are for, their common uses, and general information about them. "
#         "However, always remind users to consult their healthcare provider for specific medical advice."
#     )
    
#     # Create user prompt with comment if provided
#     user_prompt = "Please extract and format the prescription from this image accurately."
#     if comment:
#         user_prompt += f"\n\nUser comment/question: {comment}\n\nPlease address the user's comment/question in your response after extracting the prescription information."
    
#     # Google Gemini API endpoint
#     url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GOOGLE_API_KEY}"
    
#     # Prepare the request data for Gemini
#     data = {
#         "contents": [
#             {
#                 "parts": [
#                     {
#                         "text": f"{system_prompt}\n\n{user_prompt}"
#                     },
#                     {
#                         "inline_data": {
#                             "mime_type": "image/jpeg",
#                             "data": base64_image
#                         }
#                     }
#                 ]
#             }
#         ],
#         "generationConfig": {
#             "temperature": 0,
#             "maxOutputTokens": 1500
#         }
#     }
    
#     headers = {"Content-Type": "application/json"}
    
#     try:
#         response = requests.post(url, headers=headers, json=data)
#         response.raise_for_status()
        
#         # Parse Gemini response
#         result = response.json()
#         if 'candidates' in result and len(result['candidates']) > 0:
#             content = result['candidates'][0]['content']['parts'][0]['text']
#             return content.strip(), 'google_gemini'
#         else:
#             return "⚠️ No response generated from Google Gemini API", 'google_gemini'
            
#     except Exception as e:
#         return f"⚠️ Google Gemini API Error: {str(e)}", 'google_gemini'
def analyze_image_with_google_gemini(image_file, comment=''):
    image_bytes = image_file.read()
    base64_image = base64.b64encode(image_bytes).decode("utf-8")
    image_file.seek(0)

    system_prompt = (
        "You are a medical assistant AI specialized in extracting and explaining structured "
        "information from handwritten or printed prescription images. "
        "You must not guess any illegible text. If something is unclear or unreadable, write [illegible]. "
        "Return only the text that is confidently visible."
    )

    user_prompt = "Please extract and format the prescription from this image accurately."
    if comment:
        user_prompt += f"\n\nUser comment: {comment}"

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GOOGLE_API_KEY}"

    data = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": system_prompt + "\n\n" + user_prompt},
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": base64_image
                        }
                    }
                ]
            }
        ],
        "generation_config": {               # <-- FIXED
            "temperature": 0,
            "max_output_tokens": 1500        # <-- FIXED
        }
    }

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()

        result = response.json()
        return (
            result['candidates'][0]['content']['parts'][0]['text'].strip(),
            'google_gemini'
        )

    except Exception as e:
        return f"⚠️ Google Gemini API Error: {str(e)}", 'google_gemini'


# === MAIN ===
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)), debug=True)
