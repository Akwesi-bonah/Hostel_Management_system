from web_flask.student_model import student_views
from flask import render_template

@student_views.route('/default', methods=['GET'])
def default():
    """
     Display default site student
    """

    return render_template('default.html')