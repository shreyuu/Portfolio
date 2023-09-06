# Import the necessary modules.
from flask import Flask, render_template, request

# Create a Flask app.
app = Flask(__name__)

# Define the route for the contact page.
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    # If the user is submitting the form, process the data.
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        # Send the data to the server.
        send_email(name, email, message)

        # Redirect the user to the thank-you page.
        return render_template('thank_you.html')

    # If the user is just viewing the page, show the form.
    else:
        return render_template('contact.html')

# Define the function to send the email.
def send_email(name, email, message):
    # Import the necessary modules.
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText

    # Create the email message.
    msg = MIMEMultipart()
    msg['Subject'] = 'New Message from Portfolio Website'
    msg['From'] = email
    msg['To'] = 'shreyashmeshram0031@gmail.com'

    # Create the body of the email.
    body = MIMEText(message)
    msg.attach(body)

    # Send the email.
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('shreyashmeshram0031@gmail.com', 'your_password')
    server.sendmail(email, 'shreyashmeshram0031@gmail.com', msg.as_string())
    server.quit()

# Run the app.
if __name__ == '__main__':
    app.run()