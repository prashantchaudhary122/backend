const express = require('express')
const router = express.Router();
const {isAuth} = require('../middleware/authMiddleware');
const {
    
    getAllRegisteredProjects,
    createNewProject,
    getProjectWithProjectCode,
    updateProjectWithProjectCode,
    getProjectDetails
    
     
} = require('../controller/project');


router.get('/',isAuth,getAllRegisteredProjects);
router.post('/auth/createNewProject',isAuth,createNewProject);
router.get('/:projectCode',isAuth, getProjectWithProjectCode);
router.put('/:projectCode',isAuth, updateProjectWithProjectCode)
router.get('/getDeviceCount/:projectCode',isAuth,getProjectDetails)

 
module.exports = router;
