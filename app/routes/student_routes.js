
module.exports = function(app, db) {

	app.get('/', function(req, res, next){
		res.render('home');
	});

	app.get('/students', (req, res) => {
		db.collection('students').find().toArray((err, results) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.render('allstudents', {student: results});
			}
		});
	});

	app.get('/students/list', function(req, res, next){
  let regno = req.body.regno;
  res.render('searchstudents');
});

	app.post('/students/list', (req, res, next) => {
		const regno = {'regno': req.params.regno};
		db.collection('students').findOne(regno, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				if (!item) {
					res.render('searchstudent', {error: 'User does not exit'});
				} else {
				res.render('liststudent', {student:item});
				}
			}
		});
	});

	app.delete('/students/delete/:regno', (req, res) => {
		const regno = {'regno' : req.params.regno};
		db.collection('students').remove(regno, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send('Student with Reg. No.: ' + regno + 'has being deleted successfully');
			}
		});
	});

	app.get('/students/edit', function(req, res, next){
  let regno = req.body.regno;
  res.render('editstudent');
});

	app.put('/students/edit', (req, res) => {
		const regno = {'regno': req.params.regno};
		const student = {firstname: req.body.firstName,
		 lastname: req.body.lastName, regno: req.body.regno,
		  dob: req.body.dob, school: req.body.school,
		   department: req.body.department, email: req.body.email,
		    sex: req.body.sex, level: req.body.level,
		     imageUrl: req.body.imageUrl, dateCreated: req.body.dateCreated};
		db.collection('students').update(regno, student, (err, result) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.render('liststudent', {student: result});
			}
		});
	});

	app.get('/students/add', function(req,res,next){
		res.render('addstudent');
	})

	app.post('/students/add', (req, res, next) => {
		const student = {firstname: req.body.firstname,
		 lastname: req.body.lastname, regno: req.body.regno,
		  dob: req.body.dob, school: req.body.school,
		   department: req.body.department, email: req.body.email,
		    sex: req.body.sex, level: req.body.level,
		     imageUrl: req.body.imageUrl, dateCreated: req.body.dateCreated};
		db.collection('students').insert(student, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.render('liststudent', {student: result.ops[0]});
			}
		});
	});
};