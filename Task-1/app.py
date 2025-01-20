from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
from qutip import Qobj
from qutip_qip.operations import rx
from qutip_qip.circuit import QubitCircuit
import matplotlib
import io

app = Flask(__name__)
CORS(app)


@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.get_json()
    operators = data.get('array', [])
    no_qubits=data.get('no', 0)
    co_qubits=data.get('co', 0)
    matplotlib.use('Agg')
    qc=QubitCircuit(int(no_qubits),int(co_qubits))
    for i in operators:
        if i[0]=="cnot":
            qc.add_gate("CNOT", targets=int(i[1]),controls=int(i[2]))
        elif i[0]=="cz":
            qc.add_gate("CZ", targets=int(i[1]),controls=int(i[2]))
        elif i[0]=="cy":
            qc.add_gate("CY", targets=int(i[1]),controls=int(i[2]))
        elif i[0]=="ct":
            qc.add_gate("CT", targets=int(i[1]),controls=int(i[2]))
        elif i[0]=="cs":
            qc.add_gate("CS", targests=int(i[1]),controls=int(i[2]))
        elif i[0]=="h":
            qc.add_gate("H", targets=int(i[1]))
        elif i[0]=="x":
            qc.add_gate("X", targets=int(i[1]))
        elif i[0]=="y":
            qc.add_gate("Y", targets=int(i[1]))
        elif i[0]=="z":
            qc.add_gate("Z", targets=int(i[1]))
        elif i[0]=="i":
            qc.add_gate("I", targets=int(i[1]))
        elif i[0]=="s":
            qc.add_gate("S", targets=int(i[1]))
        elif i[0]=="t":
            qc.add_gate("T", targets=int(i[1]))
        elif i[0]=="rx":
            qc.add_gate("RX", targets=int(i[1]), arg_value=float(i[2]),style={"showarg": True})
        elif i[0]=="ry":
            qc.add_gate("RY", targets=int(i[1]), arg_value=float(i[2]),style={"showarg": True})
        elif i[0]=="rz":
            qc.add_gate("RZ", targets=int(i[1]), arg_value=float(i[2]),style={"showarg": True})
        elif i[0]=="pg":
            qc.add_gate("Phase", targets=int(i[1]), arg_value=float(i[2]),style={"showarg": True})
        elif i[0]=="swap":
            qc.add_gate("SWAP", targets=[int(i[1]),int(i[2])])  
        elif i[0]=="measure":
            qc.add_measurement("M0", targets=int(i[1]), classical_store=int(i[2]))
        elif i[0]=="crx":
            qc.add_gate("CRX", targets=int(i[1]), arg_value=float(i[3]),controls=int(i[2]),style={"showarg": True})
        elif i[0]=="cry":
            qc.add_gate("CRY", targets=int(i[1]), arg_value=float(i[3]),controls=int(i[2]),style={"showarg": True})
        elif i[0]=="crz":
            qc.add_gate("CRZ", targets=int(i[1]), arg_value=float(i[3]),controls=int(i[2]),style={"showarg": True})
        elif i[0]=="cpg":
            qc.add_gate("C-Phase", targets=int(i[1]), arg_value=float(i[3]),controls=int(i[2]),style={"showarg": True})
        elif i[0]=="fredkin":
            qc.add_gate("Fredkin", targets=[int(i[1]),int(i[2])],controls=int(i[3]))
        elif i[0]=="toffoli":
            qc.add_gate("Toffoli", controls=[int(i[2]),int(i[2])],targets=int(i[1]))
    buffer = io.BytesIO()
    qc.draw(file_type="png",save=True,file_path = buffer, dpi=1000)
    
    buffer.seek(0)
    return send_file(buffer, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)