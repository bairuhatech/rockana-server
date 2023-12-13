import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { setupSwagger } from "./swagger";
import * as dotenv from "dotenv";

async function bootstrap() {
  const logger = new Logger("Next ME");
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
    next();
  });
  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
  });
  await app.listen(process.env.PORT || 8000, () =>
    logger.log(`server is running on port ${process.env.PORT || 8000} `)
  );
}
//test
bootstrap();
