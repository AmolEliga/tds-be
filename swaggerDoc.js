const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const optionsV1 = {
  swaggerDefinition : {
    info: {
      title: 'Transport Document Service',
      version: '1.0',
      description: 'REST APIs with autogenerated swagger doc',
    },
    basePath: "/api"
  },
  // List of files to be processes. 
  //apis: ['./routes/*.js', './routes/*/*.js'],
  apis: ['./docs/*.yaml'],
};


const swaggerSpecV1 = swaggerJsdoc(optionsV1);


//const specs = swaggerJsdoc(options);
var swaggerHtmlV1 = swaggerUi.generateHTML(swaggerSpecV1, optionsV1)


//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports = (app) => {
    //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use('/api-docs', swaggerUi.serveFiles(swaggerSpecV1, optionsV1))
    app.get('/api-docs', (req, res) => { res.send(swaggerHtmlV1) });

}