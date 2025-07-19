# backend/app.py

from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app) # permite peticiones desde el frontend

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.json
    print("Datos recibidos", data)

    # Simulamos el procesamiento de datos
    
    response = {"message": "Formulario recibido correctamente", "data": data}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)