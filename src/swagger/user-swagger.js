/**
 * @openapi
 *  /api/get/batteies/byvid?vid={vid}:
 *   get:
 *     tags:
 *      - Batteies
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *     - in: path
 *       name: vid
 *       type: integer
 *       required: true
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 *  /api/get/currentbattery/byvid?vid={vid}:
 *   get:
 *     tags:
 *      - Batteies
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *     - in: path
 *       name: vid
 *       type: integer
 *       required: true
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 *  /api/add/battery:
 *   post:
 *     tags:
 *      - Batteies
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *     - in: formData
 *       name: vid
 *       type: integer
 *       required: true
 *     - in: formData
 *       name: gpsId
 *       type: integer
 *       required: true
 *     - in: formData
 *       name: currentVoltage
 *       type: integer
 *       required: true
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 *  /api/delete/batt?id={id}:
 *   delete:
 *     tags:
 *      - Batteies
 *     description: Welcome to swagger-jsdoc!
 *     parameters:
 *     - in: path
 *       name: id
 *       type: integer
 *       required: true
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */