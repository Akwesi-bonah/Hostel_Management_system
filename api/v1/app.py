#!/usr/bin/python3
""" API Blueprint"""

from flask import Flask, make_response, jsonify
from api.v1.views import views
from models import storage
app = Flask(__name__)
app.url_map.strict_slashes = False
app.register_blueprint(views)
# cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()

@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


if __name__ == "__main__":

    app.run(debug=True, port=5003)