#!/usr/bin/python3
"""" API Blueprint for Block """

from models.block import Block
from models import storage
from api.v1.views import views
from flask import jsonify, abort, request


@views.route('/block', methods=['GET'], strict_slashes=False)
def get_blocks():
    """ Retrieves the list of all Student objects """
    all_block = storage.all(Block).values()
    block = [block.to_dict() for block in all_block]
    return jsonify(block)


@views.route('/block/<block_id>', methods=['GET'], strict_slashes=False)
def get_block(block_id):
    """Retrieves a block"""
    block = storage.get(Block, block_id)
    if not block:
        abort(404)

    return jsonify(block.to_dict())


@views.route('/block/<block_id>', methods=['DELETE'], strict_slashes=False)
def delete_block(block_id):
    """Delete block object"""
    block = storage.get(Block, block_id)
    storage.delete(block)
    storage.save()

    return jsonify({}, 200)

@views.route('/block', methods=['POST'], strict_slashes=False)
def add_block():
    """create new block object"""

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'campus' not in request.get_json():
        abort(400, description="campus missing")

    if 'name' not in request.get_json():
        abort(400, description="name missing")

    if 'description' not in request.get_json():
        abort(400, description="description missing")

    data = request.get_json()
    instance = Block(**data)
    instance.save()
    return jsonify(instance.to_dict(), 201)


@views.route('/block/<block_id>', methods=['PUT'], strict_slashes=False)
def update_block(block_id):
    """update block object"""

    block = storage.get(Block, block_id)
    if not block:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    for key, value in request.get_json().items():
        if key not in ignore:
            setattr(block, key, value)
    storage.save()
    return jsonify(block.to_dict(), 200)
