#!/usr/bin/python3
""" API Blueprint  """
from api.v1.views import views


@views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Returns status """
    return {"status": "OK"}, 200

