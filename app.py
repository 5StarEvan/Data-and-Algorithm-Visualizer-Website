from flask import Flask, request, render_template, redirect
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv
import os

def configure():
    load_dotenv()
    
app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv("DBH")
app.config['MYSQL_USER'] = os.getenv("DBU")
app.config['MYSQL_PASSWORD'] = os.getenv("DBP")
app.config['MYSQL_DB'] = os.getenv("DBN")


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

@app.route('/hashmap.html')
def hashmap():
    return render_template('hashmap.html')

@app.route('/login.html' , methods=['GET' , 'POST'])
def login():

    userEmail = request.form['email']
    userPassword = request.form['password']
    return render_template('pageInProgress.html')

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

        # Hash the password
        hashedUserPassword = generate_password_hash(userPassword, method='pbkdf2:sha256')

        # Connect to the MySQL database
        cur = mysql.connection.cursor()

        try:
            # Check if the email already exists
            cur.execute("SELECT * FROM users WHERE email = %s", (userEmail,))
            existing_user = cur.fetchone()
            if existing_user:
                return "Email already in use. Please choose another one."

            # Insert the user into the database
            cur.execute("INSERT INTO users (first_name, last_name, email, password) VALUES (%s, %s, %s, %s)", 
                        (userFirstName, userLastName, userEmail, hashedUserPassword))
            mysql.connection.commit()  # Commit the transaction
            
            # After successful sign-up, redirect to success page
            return redirect('accountCreateSuccess.html')
        
        except Exception as e:
            print(f"Error: {e}")
            mysql.connection.rollback()  # Rollback any changes if an error occurs
            return "An error occurred while trying to sign you up. Please try again later."
        
        finally:
             # Ensure the cursor is closed
            cur.close() 

    return render_template('signup.html')


@app.route('/dfs.html')
def DFS():
    return render_template('pageInProgress.html')


# Running the application
if __name__ == '__main__':
    app.run(debug=True) 