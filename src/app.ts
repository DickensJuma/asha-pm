import  express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import sequelize from './utils/database';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import teamRoutes from './routes/teamRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

const connectDB = async () => {
await sequelize
      .authenticate()
      .then(() => {
        console.log(
          "✅ PostgreSQL Connection has been established successfully."
        );
      })
      .catch((err) => {
        console.error("❌ Unable to connect to the PostgreSQL database:", err);
      });
  };

  connectDB();
  // Swagger configuration options
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
    info: {
      title: 'Asha PM API Documentation',
      version: '1.0.0',
      description: 'Product Management  API Documentation',
    },
    components: {
      securitySchemes: {
          ApiKeyAuth: {
              scheme: "bearer",
              type: "http"
          }
      }
  },
  },
  apis: ['./src/controllers/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);


// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Asha PM Project!',
  });
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/teams', teamRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// // Start the server
const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
