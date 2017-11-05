
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
		const regno = {'regno': req.body.regno};
		db.collection('students').findOne(regno, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				if (!item) {
					res.render('searchstudent', {error: 'User does not exit'});
				} else {
				res.render('liststudent', {student: item});
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

	app.post('/students/edit', (req, res, next) => {
		const regno = {'regno': req.body.regno};
		var firstname, lastname, email, dob, school, department,
		sex, level, imageUrl, dateCreated, regno_old;
		db.collection('students').findOne(regno, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				if (!item) {
					res.render('searchstudent', {error: 'User does not exit'});
				} else {
					firstname = item.firstname;
					lastname = item.lastname;
					email = item.email; dob = item.dob;
					level = item.level; imageUrl = item.imageUrl;
					school = item.school; sex = item.sex;
					department = item.department;
					dateCreated = item.dateCreated;
					regno_old = item.regno;
				}
			}
		});

		if (!(req.body.firstname == "")) {
			firstname = req.body.firstname;
		} if (!(req.body.lastname == "")) {
			lastname = req.body.lastname;
		} if (!(req.body.email == "")) {
			email = req.body.email;
		} if (!(req.body.dob == "")) {
			dob = req.body.dob;
		} if (!(req.body.department == "")) {
			department = req.body.department;
		} if (!(req.body.school == "")) {
			school = req.body.school;
		} if (!(req.body.imageUrl == "")) {
			imageUrl = req.body.imageUrl;
		} if (!(req.body.dateCreated == "")) {
			dateCreated = req.body.dateCreated;
		} if (!(req.body.sex == "")) {
			sex = req.body.sex;
		} if (!(req.body.regno == "")) {
			regno_old = req.body.regno;
		} if (!(req.body.level == "")) {
			level = req.body.level;
		}

		const student = {firstname: firstname,
		 lastname: lastname, regno: regno_old,
		  dob: dob, school: school,
		   department: department, email: email,
		    sex: sex, level: level,
		     imageUrl: imageUrl, dateCreated: dateCreated};
		db.collection('students').update(regno, student, { upsert: true }, (err, result) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log({student: result})
				res.render('liststudent', {student: result});
			}
		});
	});

	app.get('/students/add', function(req,res,next){
		let regno = req.body.regno;
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