const Note = require("../models/Note");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    let contentArray = [];
    if (content) {
      if (Array.isArray(content)) {
        contentArray = content;
      } else if (typeof content === "string") {
        contentArray = [content];
      }
    }

    const note = new Note({
      title,
      content: contentArray,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updateData = {};
    if (title) updateData.title = title;

    if (content) {
      if (Array.isArray(content)) {
        updateData.content = content;
      } else if (typeof content === "string") {
        updateData.content = [content];
      }
    }

    const note = await Note.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task cannot be empty" });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.content.push(task);
    await note.save();

    res.json({
      message: "Task added successfully",
      note: note,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { task } = req.body;
    const taskIndex = parseInt(req.params.taskIndex);

    if (!task) {
      return res.status(400).json({ message: "Task cannot be empty" });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (taskIndex < 0 || taskIndex >= note.content.length) {
      return res.status(400).json({ message: "Invalid task index" });
    }

    note.content[taskIndex] = task;
    await note.save();

    res.json({
      message: "Task updated successfully",
      note: note,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskIndex = parseInt(req.params.taskIndex);

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (taskIndex < 0 || taskIndex >= note.content.length) {
      return res.status(400).json({ message: "Invalid task index" });
    }

    note.content.splice(taskIndex, 1);
    await note.save();

    res.json({
      message: "Task deleted successfully",
      note: note,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getTasks = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({
      count: note.content.length,
      tasks: note.content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.content = [];
    await note.save();

    res.json({
      message: "All tasks deleted successfully",
      note: note,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,

  getTasks,
  addTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
