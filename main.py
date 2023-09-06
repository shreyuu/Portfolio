# Import the necessary modules.
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message

# Create a Flask app.
app = Flask(__name__)

# Configure Flask-Mail for sending emails.
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'shreyashmeshram0031@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'Shreyash23@25'  # Replace with your email password

mail = Mail(app)

# Define the route for the contact page.
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        if not name or not email or not message:
            flash('All fields are required.', 'error')
        else:
            try:
                send_email(name, email, message)
                flash('Message sent successfully!', 'success')
            except Exception as e:
                flash(f'An error occurred: {str(e)}', 'error')

            return redirect(url_for('contact'))

    return render_template('contact.html')

def send_email(name, email, message):
    msg = Message('New Message from Portfolio Website',
                  sender=email,
                  recipients=['shreyashmeshram0031@gmail.com'])  # Replace with your email

    msg.body = message

    try:
        mail.send(msg)
    except Exception as e:
        raise Exception(f'Email sending failed: {str(e)}')

if __name__ == '__main__':
    app.secret_key = 'shreyuu'  # Replace with a secure secret key
    app.run(debug=True)
