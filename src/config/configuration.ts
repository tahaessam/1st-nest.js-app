// we make this file to add logic to read the env variables and return them in a structured way

export default () => ({
  port: parseInt(process.env.PORT as string) || 3000,
  database: {
    url: process.env.DB_URL,
    accessKey: process.env.DB_ACCESS_KEY,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  user: {
    email: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
  secretKey: process.env.SecretKey,
  s3: {
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    bucketName: process.env.S3_BUCKET_NAME,
  },
  jwt: {
    accesssecret: process.env.SecretKey,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
//parseInt need int so we add (as string) to avoid error if the value is undefined or null
// we can also use Joi to validate the env variables and throw an error if they are not valid
