import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

openai.api_key = ''

@app.route('/generate-test-cases', methods=['POST'])
def generate_test_cases():
    context = request.form.get('context', '')
    screenshots = request.files.getlist('screenshot_')
    print(1)

    # Convert screenshots to base64 or prepare as needed
    images = [screenshot.read() for screenshot in screenshots]
    

    # Make OpenAI API call (adjust based on your actual API method)
    response = openai.Image.create(
        model="gpt-4-vision",
        images=images,
        context=context,
        n=1
    )

    # Inspect the actual response structure to adjust this parsing
    try:
        # Example structure (modify as needed)
        test_cases = response.get('data', [{}])[0].get('text', 'No test cases found')
    except KeyError as e:
        test_cases = f"Error parsing response: {str(e)}"

    return jsonify({"testCases": test_cases})

if __name__ == '__main__':
    app.run(debug=True, port=5000)