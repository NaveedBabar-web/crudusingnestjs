import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express'; // Ensure Express is correctly imported
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Set API Global Prefix
  app.setGlobalPrefix('api');

  // Manually Serve Swagger UI Static Files (Fix for Vercel)
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use('/swagger-ui', express.static(join(__dirname, '..', 'node_modules', 'swagger-ui-dist')));

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Nest.js CRUD API')
    .setDescription('API documentation for User CRUD operations')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Nest.js API Docs',
    customCssUrl: '/swagger-ui/swagger-ui.css',
    customJs: ['/swagger-ui/swagger-ui-bundle.js', '/swagger-ui/swagger-ui-standalone-preset.js'],
    swaggerOptions: {
      url: '/api/docs-json',
    },
  });

  // Redirect root URL to Swagger Docs
  app.use('/', (req, res) => {
    res.redirect('/api/docs');
  });

  // Start Server
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📜 Swagger API Docs available at http://localhost:${PORT}/api/docs`);
  });
}

bootstrap();
