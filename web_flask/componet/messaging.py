#!/usr/bin/python3
""" mail setup """
from flask_mail import Message

from flask import render_template, request

from web_flask.componet import staff_view
from web_flask.componet.mail import mail
from web_flask.forms.message import MessageForm


@staff_view.route('/mail', methods=['GET'], strict_slashes=False)
def messaging():
    """ send mail """
    form = MessageForm()

    return render_template('message.html', form=form)


@staff_view.route('/mail', methods=['POST'], strict_slashes=False)
def send_mail():
    """ send mail """
    if request.method == 'POST':
        # level = request.form.get('level')
        # to_student = request.form.get('tostudent')
        # to_guardian = request.form.get('toGuardian')
        # to_pending_pay = request.form.get('toPendingPay')
        # message_content = request.form.get('message')

        msg = Message('Hello',
                      sender='ranisminth@gmail.com',
                      recipients=['frankarhin910@gmail.com'])
        msg.body = "This is the email body"
        mail.send(msg)

    return render_template('message.html')

