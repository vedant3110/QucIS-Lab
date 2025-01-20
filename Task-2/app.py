from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
from qutip import Qobj
import matplotlib.pyplot as plt
import numpy as np
from qutip import Bloch, basis, mesolve, sigmax, sigmay, sigmaz ,destroy
from matplotlib.animation import FuncAnimation
import io
import os
app = Flask(__name__)
CORS(app)


@app.route('/generate_evolution', methods=['POST'])
def generate_evolution():
    data = request.get_json()
    hamiltonian = data.get('ham',"")
    if hamiltonian=="Free":
        delta = float(data.get('de',0))
        beta = float(data.get('be',0))
        g=0.25
        time_in=float(data.get('time_intial',0))
        time_fi=float(data.get('time_final',0))
        H = (delta / 2.0 * sigmaz()) + (beta * sigmaz())
        c_ops = [np.sqrt(beta) * destroy(2)]
        psi0 = (1/np.sqrt(2))*(basis(2, 0)+basis(2,1))
        tlist = np.linspace(time_in, time_fi, 100)
        result = mesolve(H, psi0, tlist, c_ops, [sigmax(), sigmay(), sigmaz()])
    elif hamiltonian=="Rabi":
        delta = float(data.get('de',0))
        beta = float(data.get('be',0))
        g=0.25
        time_in=float(data.get('time_intial',0))
        time_fi=float(data.get('time_final',0))
        H = (delta / 2.0 * sigmax()) + (beta * sigmaz())
        c_ops = [np.sqrt(beta) * destroy(2)]
        psi0 = basis(2, 0)
        tlist = np.linspace(time_in, time_fi, 100)
        result = mesolve(H, psi0, tlist, c_ops, [sigmax(), sigmay(), sigmaz()])
    elif hamiltonian=="Driven":
        delta = float(data.get('de',0))
        beta = float(data.get('be',0))
        gamma = float(data.get('ga',0))
        g=0.25
        time_in=float(data.get('time_intial',0))
        time_fi=float(data.get('time_final',0))
        H = (delta * sigmax()) + (gamma * sigmaz())+(beta * sigmaz())
        c_ops = [np.sqrt(beta) * destroy(2)]
        psi0 = basis(2, 0)
        tlist = np.linspace(time_in, time_fi, 100)
        result = mesolve(H, psi0, tlist, c_ops, [sigmax(), sigmay(), sigmaz()])
    x_vals = result.expect[0]
    y_vals = result.expect[1]
    z_vals = result.expect[2]

    def plot_setup():
        fig = plt.figure(figsize=(8, 8))
        axes = fig.add_subplot(111, projection="3d", elev=30, azim=-40)
        return fig, axes

    def plot_result(n, fig, axes):
        sphere = Bloch(axes=axes)
        sphere.vector_color = ["r"]
        sphere.clear()
        sphere.add_vectors([x_vals[n], y_vals[n], z_vals[n]])
        sphere.add_points([x_vals[:n+1], y_vals[:n+1], z_vals[:n+1]], meth="l")
        sphere.make_sphere()

    fig, axes = plot_setup()
    ani = FuncAnimation(fig, plot_result, frames=len(tlist), fargs=(fig, axes), interval=50)
    temp_file = 'temp.gif'
    ani.save(temp_file, writer='pillow', fps=20)

    with open(temp_file, 'rb') as f:
        buffer = io.BytesIO(f.read())
    os.remove(temp_file)
    return send_file(buffer,mimetype='image/gif',)


if __name__ == '__main__':
    app.run(debug=True)

