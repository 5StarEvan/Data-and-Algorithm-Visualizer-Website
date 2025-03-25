from flask import Flask, request, render_template, redirect, session, flash
from flask_mysqldb import MySQL , MySQLdb
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

def configure():
    load_dotenv()
    
app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv("DBH")
app.config['MYSQL_USER'] = os.getenv("DBU")
app.config['MYSQL_PASSWORD'] = os.getenv("DBP")
app.config['MYSQL_DB'] = os.getenv("DBN")

app.secret_key = os.getenv("SCRTKEY")


mysql = MySQL(app)


# Route for the homepage
@app.route('/')
@app.route('/home.html')
def home():
    return render_template('home.html')



# Route for linkedlist Data Structure
@app.route('/linkedlist.html')
def linkedlist_page():
    return render_template('linkedlist.html') 

# Route for the list of the Data Structures
@app.route('/stack.html')
def stack_page():
    return render_template('stack.html')

# Route for the list of the Data Structures
@app.route('/list.html')
def list():
    return render_template('list.html')

@app.route('/queue.html')
def queue():
    return render_template('queue.html')


@app.route('/login.html', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        userEmail = request.form['email'].strip()
        userPassword = request.form['password'].strip()

        if not userEmail or not userPassword:
            message = "Please fill in both email and password"
            return render_template('login.html', message=message)

        try:
            with mysql.connection.cursor(cursorclass=MySQLdb.cursors.DictCursor) as cur:
                cur.execute('SELECT * FROM users WHERE email = %s', (userEmail,))
                user = cur.fetchone()

                if not user:
                    message = "No account found with this email address"
                    return render_template('login.html', message=message)

                if check_password_hash(user['password'], userPassword):
                    session['loggedin'] = True
                    session['id'] = user['id']
                    session['first_name'] = user['first_name']
                    session['last_name'] = user['last_name']
                    session['email'] = user['email']
                    return redirect('/home.html')
                else:
                    message = "Incorrect password"
                    return render_template('login.html', message=message)

        except MySQLdb.Error as e:
            print(f"MySQL Error: {e}")
            message = "Database error occurred"
            return render_template('login.html', message=message)
        except Exception as e:
            print(f"Unexpected Error: {e}")
            message = "An error occurred while processing your login"
            return render_template('login.html', message=message)
    
    return render_template('login.html')

@app.route('/logout.html')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('first_name', None)
    session.pop('last_name', None)
    session.pop('email', None)
    session.clear()
    return redirect("home.html?logout=true")

@app.route('/accountCreateSuccess.html')
def accountCreate():
    return render_template('accountCreateSuccess.html')

@app.route('/signup.html', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        userFirstName = request.form['inputFirstName']
        userLastName = request.form['inputLastName']
        userEmail = request.form['inputEmail']
        userPassword = request.form['inputPassword']


        hashedUserPassword = generate_password_hash(userPassword, method='pbkdf2:sha256')


        cur = mysql.connection.cursor()

        try:

            cur.execute("SELECT * FROM users WHERE email = %s", (userEmail,))
            existing_user = cur.fetchone()
            if existing_user:
                return "Email already in use. Please choose another one."

  
            cur.execute("INSERT INTO users (first_name, last_name, email, password) VALUES (%s, %s, %s, %s)", 
                        (userFirstName, userLastName, userEmail, hashedUserPassword))
            mysql.connection.commit()  
            
            return redirect('accountCreateSuccess.html')
        
        except Exception as e:
            print(f"Error: {e}")
            mysql.connection.rollback()  
            return "An error occurred while trying to sign you up. Please try again later."
        
        finally:
 
            cur.close() 

    return render_template('signup.html')


@app.route('/dfs.html')
def DFS():
    return render_template('dfs.html')


# Running the application
if __name__ == '__main__':
    app.run(debug=True) 