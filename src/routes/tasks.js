const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('mean-db',['tasks']);

router.get('/tasks',(req,res,next) => {
db.tasks.find((err,tasks) => {
    if(err) return next(err);
    res.json(tasks); 
    });
});

router.get('/tasks/:id',(req,res,next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err,task) => {
        if(err) return next(err);
        res.json(task);     
        });
});

// Add a Task
router.post('/tasks', (req, res, next) => {
    const task = req.body;
    if(!task.title || !(task.isDone + '')) {
        res.status(400).json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }
});

// Delete a Task
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err,task) => {
        if(err) return next(err);
        res.json(task);
    });    
});

// Update a Task
router.put('/tasks/:id', (req, res, next) => {
    const task = req.body;
    console.log("task {}",task);
    const updateTask = {};
    if(task.isDone){
        updateTask.isDone = task.isDone;
    }

    if(task.title){
        updateTask.title = task.title;
    }

    console.log("updateTasks {}",updateTask);


    if(!updateTask){
        res.status(400).json({
            error: 'Bad Request'
        });
    }else{
        console.log("routerUpdate");
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {},  (err,task) => {
            if(err) return next(err);
            res.json(task);
        });    
    }
  
});

module.exports = router;