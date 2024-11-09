const { Student } = require('../models');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { member_name, member_email, member_age } = req.body;
    const student = await Student.create({ member_name, member_email, member_age });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all students with pagination
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Student.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      total: count,
      pages: Math.ceil(count / limit),
      current_page: parseInt(page),
      students: rows
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a student's information
exports.updateStudent = async (req, res) => {
  try {
    const { member_name, member_email, member_age } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.member_name = member_name;
    student.member_email = member_email;
    student.member_age = member_age;

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    await student.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
