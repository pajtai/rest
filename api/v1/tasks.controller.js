'use strict';

const express = require('express');

module.exports = (app) => {

  app.services.logger.debug('Tasks Controller Loaded');

  const router = express.Router();

  /**
   *  @swagger
   *  /tasks:
   *    get:
   *      tags:
   *        - Tasks
   *      description: Get collection of all tasks
   *      produces:
   *      responses:
   *        200:
   *          content:
   *            application/json:
   *              description: tasks
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Task'
   */
  router.get('/', (req, res) => {

    app.models.tasks
      .find()
      .then(docs => res.json(docs))
      .catch(sendError(res));
  });

  /**
   *  @swagger
   *  /tasks:
   *    post:
   *      tags:
   *        - Tasks
   *      description: Add a task
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Task'
   *      responses:
   *        201:
   *          content:
   *            application/json:
   *              description: tasks
   *              schema:
   *                $ref: '#/components/schemas/Task'
   */
  router.post('/', (req, res) => {

    const incoming = req.body;

    const task = app.models.tasks(incoming);

    task
      .save(incoming)
      .then(doc => res.status(201).json(doc))
      .catch(sendError(res));
  });

  /**
   *  @swagger
   *  /tasks/{id}:
   *    delete:
   *      tags:
   *        - Tasks
   *      description: Delete a task by id
   *      parameters:
   *        - in: path
   *          name: id
   *          description: id of task to be deleted
   *          schema:
   *            type: string
   *      responses:
   *        200:
   *          content:
   *            application/json:
   *              description: tasks
   *              schema:
   *                $ref: '#/components/schemas/Task'
   */
  router.delete('/:id', (req, res) => {
    console.log('about to delete', req.params.id);
    app.models.tasks.findByIdAndRemove(req.params.id)
      .then(doc => {
        console.log('deleted', doc);
        res.json(doc)
      })
      .catch(sendError(res));
  });

  return router;
};

function sendError(res) {
  return error => {
    res.status(500);
    res.send(error);
  }
}