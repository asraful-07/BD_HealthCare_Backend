import app from "./app";

const PORT = process.env.PORT;

const bootstrap = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:5002`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

bootstrap();
