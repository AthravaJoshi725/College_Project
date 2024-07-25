from flask import Flask, render_template

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
