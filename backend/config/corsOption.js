const whitelist = [
  "http://localhost:5173", // ✅ Allow frontend
  "https://accounts.google.com", // ✅ Allow Google OAuth
  "http://172.18.0.3:5173/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
export default corsOptions;
