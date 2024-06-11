// Here we place all the constant variables which should be made public so they are not put in the .env file
module.exports = {
    DB_NAME : "NodeAuth",
    PORT : process.env.PORT || 8000
}