import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect("mongodb+srv://find-food-backend:9380333453@cluster0.wv2rsm5.mongodb.net/find-food");
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
