
module.exports = function(app, db) {

	app.get('/students', (req, res) => {
		db.collection('students').find().toArray((err, results) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(results);
			}
		});
	});

	app.get('/students/:regno', (req, res) => {
		const regno = {'regno': req.params.regno};
		db.collection('students').findOne(regno, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

	app.delete('/students/:regno', (req, res) => {
		const regno = {'regno' : req.params.regno};
		db.collection('students').remove(regno, (err, item) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send('Student with Reg. No.: ' + regno + 'has being deleted successfully');
			}
		});
	});

	app.put('/students/:regno', (req, res) => {
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
				res.send(result);
			}
		});
	});

	app.post('/students', (req, res) => {
		const student = {firstname: req.body.firstName,
		 lastname: req.body.lastName, regno: req.body.regno,
		  dob: req.body.dob, school: req.body.school,
		   department: req.body.department, email: req.body.email,
		    sex: req.body.sex, level: req.body.level,
		     imageUrl: req.body.imageUrl, dateCreated: req.body.dateCreated};
		db.collection('students').insert(student, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};