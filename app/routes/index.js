
const studentRoutes = require('./student_routes');

module.exports = function(app, db) {
	studentRoutes(app, db);
}