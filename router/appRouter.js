const authRoutes = require("./../routes/authRoutes")
const userRoutes = require("./../routes/userRoutes");

const appRouter = (app)=>{
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
}
module.exports = appRouter;