const { env } = process;
const config = {
    host: env.HOST,
    port: env.PORT,
    jwtSecret: env.JWT_SECRET,
    wxAppid: env.wxAppid,
    wxSecret: env.wxSecret
}
export { config };