const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Project = db.Project;
const ProjectHistory = db.ProjectHistory;
const ProjectEntry = db.ProjectEntry;
const ProjectRecording = db.ProjectRecording;
const ProjectBOM = db.ProjectBOM;
const Test = db.Test;
const ProjectUserMapping = db.ProjectUserMapping;
const User = db.User;


module.exports = {
    addProject,
    addProjectHistory,
    addProjectEntry,
    updateProjectEntry,
    updateProjectEntryCageLowering,
    updateProjectEntryConcretePouring,
    updateProjectEntryFinal,
    updateProjectHistoryFinal,
    addProjectRecording,
    updateProject,
    updateProjectwithInitialVal,
    updateProjectHistory,
    updateProjectRecording,
    getProjectDtlById,
    getLastAddProduct,
    getLastAddedProjectEntry,
    getProjectRecordingDtlByPilno,
    getAllProjectHistory,
    getAllProjectEntryInProgress,
    getAllProjects,
    getPillingDetailsByProjId,
    getProjectHistoryDtlByPileId,
    getAllAddedProjectEntry,
    getGraphData,
    updateProjectHistoryUsingEndBoringtime,

    updateProjectHistorycageLoweringEndTime,
    updateProjectHistoryconcretePourEndTime,
    cageLoweringQtyUpdate,
    concretePouringQtyUpdate,

    //harish update 2
    cageLoweringQtyProjectHistoryUpdate,
    concretePouringQtyProjectHistoryUpdate,
    totalBoringTime,

    //harish update 3
    getPilingCutOffLevel,
    getAllProjectHistoryBoringComplete,
    addProjectBOM,
    getAllAddedProjectBOMByProjectID,
    updateProjectBOM,
    updateProjectBOMByStatus,
    getAllProjectsSumTotal,
    getAllProjectsCount,
    updateProjectHistoryfoundinglevel,
    addProjectRecordingIngInBulk,
    getProjectDtlByLoginId,
    mapProjectUser,
    getMappingProjectByempId,
    getAllMappingProject,
    deleteProjectMapping,
    getProjectDtlByLoginIdWithAggregate,
    getMappingStaffDtlsByProject
};

async function getPilingCutOffLevel(pileNo) {
    return await ProjectHistory.find({ "pileNo": pileNo }).sort({ $natural: 1 });
}

async function getProjectDtlById(id) {
    return await Project.find({ _id: id }).sort({ $natural: -1 }).limit(1);
}

async function getMappingProjectByempId(empId) {
    const projectUserMapping = await ProjectUserMapping.find({ "empId": empId }).select({ "projectId": 1, '_id': 0 })
    // return await ProjectUserMapping.find({ "empId": empId }).select({ "projectId": 1, '_id': 0 });
    const lstAllowedProject = [];
    for (let index = 0; index < projectUserMapping.length; index++) {
        var element = JSON.stringify(projectUserMapping[index]);
        var stringify = JSON.parse(element);
        lstAllowedProject.push(stringify['projectId']);
    }
    // console.log(lstAllowedProject);
    return await Project.find({ _id: { $in: lstAllowedProject } });
}



async function getGraphData() {
    const lstGraphData = [];

    const allProjects = await Project.find();
    //console.log(allProjects);
    var projVal = 0 ;
   
    var projName = "";
    for (let index = 0; index < allProjects.length; index++) {
        const element = JSON.stringify(allProjects[index]);
        var stringify = JSON.parse(element);

      
      
      
        var projId    = stringify['id'];
        //console.log(projId);
            projVal   = stringify['projval'];
          //  console.log(projVal);
            projName  = stringify['projName'];


           
            var pillingInfoByProjectID1    =  stringify['pillingInfoByProjectID1'];
          
           // console.log(pillingInfoByProjectID1);
            var P1totalAmt = 0;
            var totalPillingCalc = 0;
            var P1totalNoOfPile=0;
            var p1Id=0;
            for (let index = 0; index < pillingInfoByProjectID1.length; index++) {
                const element = pillingInfoByProjectID1[index];
                P1totalNoOfPile = element.qty;
                P1totalAmt = element.amount;
               // console.log(P1totalAmt);
                p1Id=element.id;
               // console.log(p1Id);
                //var stringify = JSON.parse(element);
               // console.log(stringify);
                // var Amount = element.amount;
                // console.log(Amount);
                // totalAmt = totalAmt + Amount;
                // console.log(totalAmt);
            }
    
            var P2totalNoOfPile=0;
            var p2Id=0;
              var P2totalAmt = 0;
            var pillingInfoByProjectID2    = stringify['pillingInfoByProjectID2'];
            for (let index = 0; index < pillingInfoByProjectID2.length; index++) {
                const element = pillingInfoByProjectID2[index];
                 P2totalNoOfPile = element.qty;
                  P2totalAmt = element.amount;
                  p2Id=element.id;
                // var Amount = element.amount;
                // totalAmt = totalAmt + Amount;
                // console.log(totalAmt);
                
            }
      //     ProjectHistory.find({ $and: [{ projId: projId, casingToplevel: { $lte: 0 } }] }).sort({ $natural: -1 });
          //  console.log(projName);
          var P1noOfPileCompleted = 0;
        // console.log(pillingInfoByProjectID1!=null);
          if(pillingInfoByProjectID1!=null){
             // var id= 
      // const allProjectEntry = await ProjectEntry.find({"id":p1Id});
       const allProjectEntry = await ProjectEntry.find({"projId":projId});

       // const allProjectEntry = await ProjectEntry.find({$and:[{ "projId": {$eq:projId},"id":{$eq:p1Id}}]});
       // console.log(allProjectEntry);
       
        //var totalNoOfPileCompleted = 0;
        for (let index = 0; index < allProjectEntry.length; index++) {
            const element = allProjectEntry[index];
           // console.log(element);
           // console.log(element.statusOfPilling);
          //  var stringify = JSON.parse(element.statusOfPilling);
            //console.log(stringify);
            var projStatusOfPilling = element.statusOfPilling;
           // console.log(projStatusOfPilling);
           
            //totalNoOfPileCompleted = totalNoOfPileCompleted + 1;
            if(projStatusOfPilling==7){
                P1noOfPileCompleted = P1noOfPileCompleted +1; 
              //  console.log(P1noOfPileCompleted);
            }
           // console.log(P1noOfPileCompleted);
        }
    }

      var p1Status =0;
     // console.log(P1noOfPileCompleted);
        //console.log(P1totalNoOfPile);
         var P1 = (P1noOfPileCompleted/P1totalNoOfPile) * 100 ;
       //  console.log(P1);
         if(P1==0||P1=== Infinity){
            p1Status = 0;
            //console.log(p1Status);
         }
         else{
          //  console.log(P1totalAmt);
           // console.log(P1);
            p1Status = (P1/100) * P1totalAmt;
          //  console.log(p1Status);
         }
        //console.log(p1Status);

    var P2noOfPileCompleted = 0;
    if(pillingInfoByProjectID2!=null){
       // const allProjectEntry = await ProjectEntry.find({"id":p2Id});
         const allProjectEntry = await ProjectEntry.find({"projId":projId});
      //  const allProjectEntry = await ProjectEntry.find({$and:[{ "projId": {$eq:projId},"id":{$eq:p2Id}}]});
       // const allProjectEntry = await ProjectEntry.find({$and:[{ projId: {$eq:projId},id:{$eq:id}}]});
        //const allProjectEntry = await ProjectEntry.find({$and:[{ projId: projId,id:id}]});
 // console.log(allProjectEntry);
 
  //var totalNoOfPileCompleted = 0;
  for (let index = 0; index < allProjectEntry.length; index++) {
      const element = allProjectEntry[index];
     // console.log(element.statusOfPilling);
    //  var stringify = JSON.parse(element.statusOfPilling);
      //console.log(stringify);
      var projStatusOfPilling = element.statusOfPilling;
     
      //totalNoOfPileCompleted = totalNoOfPileCompleted + 1;
      if(projStatusOfPilling==7){
        P2noOfPileCompleted = P2noOfPileCompleted +1; 
      }
  }
}
      

        var p2Status = 0 ;
        var P2 = (P2noOfPileCompleted/P2totalNoOfPile) * 100 ;
        if(P2==0||P2 === Infinity){
            p2Status = 0;
          //  console.log(p2Status);
         }
         else{
            p2Status = (P2/100)*P2totalAmt;
         }
       // console.log(p2Status);

       /*  i. Piling - [{[(No. of piles completed/Total no. of piles)]*100} * Amount]
           Eg.: Piling Status = {(3/100) * 100}% = 3%
           Piling Status Amount = 3% * 50000000 = 1500000 */
       // totalPillingCalc = (((noOfPileCompleted / totalNoOfPileCompleted) * 100) * totalAmt);
       // console.log(noOfPileCompleted);
       // console.log(totalNoOfPileCompleted);
        
        var totalBOMSum=0;
        const allProjectBOM = await ProjectBOM.find({ "projId": projId});
       // console.log(allProjectBOM);
        for (let index = 0; index < allProjectBOM.length; index++) {
            const element = allProjectBOM[index];
          //  console.log(element);
          //  console.log(element.amount);
          //  console.log(element.status);
          //  var stringify = JSON.parse(element);
          
            var Amount = element.amount.value;
            //console.log(Amount);
            var Status = element.status.value;
            
           // console.log(Amount);
           // console.log(Status);
          //  console.log(Status.value);

         /* ii. BOM - sum of all items (Status * Amount)
        
          Eg.: {(7.143% * 1750000)+ (0% * 100000)} = 125002.5 */
            totalBOMSum = totalBOMSum + (Amount * (Status*(1/100)));
          //  console.log(totalBOMSum);
        }
       // console.log(totalBOMSum);
      /*  Project Percentage on dashboard= (*(Add (i + ii))/(Contract Amount mentioned while adding a project))*100

         Eg.: Percentage = {[(1500000)+(125002.5)]/5212000000} * 100 = 0.0312% */
       //  console.log(index+"--"+p1Status);
         // console.log(index+"--"+p2Status);
          //  console.log(index+"--"+totalBOMSum);
              //    console.log(index+"--"+projVal);
        var Percentage = ((p1Status + p2Status + totalBOMSum) / projVal) * 100; 
      //  console.log(index+"--"+Percentage);
        if(Percentage==0||Percentage === Infinity){
            Percentage=0;
        }

        var objData ={
            projName:'',
            Percentage:''
        }
        if(Percentage>0){
            objData.Percentage = Percentage.toFixed(4) ;
            objData.projName = projName ;
            lstGraphData.push(objData);
        }
        else{
            objData.Percentage = 0 ;
            objData.projName = projName ;
           lstGraphData.push(objData);
        }
        //console.log(lstGraphData);
    }
    return await lstGraphData;
}

async function getMappingStaffDtlsByProject(projectId) {
    const projectUserMapping = await ProjectUserMapping.find({ "projectId": projectId}).select({ "empId": 1, '_id': 0 })
    // const projectUserMapping = await ProjectUserMapping.find({ "projectId": projectId}).select({ "empId": 1, '_id': 0 })
    const lstAllowedEmp = [];
    for (let index = 0; index < projectUserMapping.length; index++) {
        var element = JSON.stringify(projectUserMapping[index]);
        var stringify = JSON.parse(element);
        lstAllowedEmp.push(stringify['empId']);
    }
    //console.log(lstAllowedEmp);
    //return await User.find({ _id: { $in: lstAllowedEmp } ,"isAdmin":{$ne:1} });
    return await User.find({ _id: { $in: lstAllowedEmp } ,"isAdmin":{$eq:true} });
}


async function getProjectDtlByLoginIdWithAggregate() {
    //  console.log(projectParam);
    //return await Project.find({ _id: { $in: arr } });
    return await Project.aggregate([
        // {$match: { _id: {$eq:projectParam} }} ,
        {
            $group: {
                _id: "$_id",
                // _id: null,
                total: {
                    $sum: "$projval"
                },
                average_transaction_amount: {
                    $avg: "$projval"
                },
                min_transaction_amount: {
                    $min: "$projval"
                },
                max_transaction_amount: {
                    $max: "$projval"
                }
            }
        }

    ]);

}

async function getProjectDtlByLoginId(projectParam) {
    //  console.log(projectParam);
    //https://stackoverflow.com/questions/25587729/how-can-i-pass-an-array-to-the-server-when-using-http
    //convert comma sepated string to arry using split(',')
    var arr = projectParam.split(',');
    console.log(arr);
    //Convert Array to comma sepateated String  using Join
    //  console.log(arr.join());
    return await Project.find({ _id: { $in: arr } });
    //    return await Project.aggregate([
    //       // {$match: { _id: {$eq:projectParam} }} ,
    //         {
    //             $group: {
    //                 _id: "$_id",  
    //                // _id: null,
    //                 total: {
    //                     $sum: "$projval"
    //                 },
    //                 average_transaction_amount: {
    //                     $avg: "$projval"
    //                 },
    //                 min_transaction_amount: {
    //                     $min: "$projval"
    //                 },
    //                 max_transaction_amount: {
    //                     $max: "$projval"
    //                 }
    //             }
    //         }

    //     ]);

}

//display Project Name  and Poject Id in Dropdownlist 
async function getAllProjects() {
   // return await Project.find().select({ "projName": 1, '_id': 1 }).sort({ $natural: -1 });
   return await Project.find().select({"location": 1,"client": 1,"completionDate": 1, "commenceDate": 1,"projval": 1,"projName": 1, "projDesc": 1 }).sort({ $natural: -1 });
}
async function getAllProjectsSumTotal() {
    return await Project.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$projval"
                },
                average_transaction_amount: {
                    $avg: "$projval"
                },
                min_transaction_amount: {
                    $min: "$projval"
                },
                max_transaction_amount: {
                    $max: "$projval"
                }
            }
        }

    ]);
}
async function getAllProjectsCount() {
    return await Project.count({});
}

async function deleteProjectMapping(id, res) {
    await ProjectUserMapping.findOneAndDelete({ "_id": id }, function (err, docs) {
        if (err) return res.status(500).send(err);
    });
}

async function getAllMappingProject() {
    return await ProjectUserMapping.find({ "empName": { $ne: null } }).sort({ $natural: -1 });
}
//All records in Project Entry
async function getAllAddedProjectEntry() {
    return await ProjectEntry.find().sort({ $natural: -1 });
}

async function getLastAddProduct() {
    return await Project.find().sort({ $natural: -1 }).limit(1);
}
// Started  ProjectEntry

//Last Enter record in Project Entry
async function getLastAddedProjectEntry() {
    return await ProjectEntry.find().sort({ $natural: -1 }).limit(1);
}

async function getAllAddedProjectBOMByProjectID(projId) {
    return await ProjectBOM.find({ "projId": projId }).sort({ $natural: -1 });
}


// 1- inProgress Boaring,2-Completed Boaring
//3-Cage InProgress,4-Cage Completed
//5-ConcretePouring In Progress
//6-ConcretePouring Completed
async function getAllProjectEntryInProgress() {
    return await ProjectEntry.find({ "statusOfPilling": { $ne: 6 } }).sort({ $natural: -1 });
}
//Project Entry


async function getAllProjectHistoryBoringComplete() {
    return await ProjectHistory.find({ "depthOfBore": { $gt: 0 } }).sort({ $natural: -1 });
}

async function addProjectEntry(projectParam) {
    const projectEntry = new ProjectEntry(projectParam);
    await projectEntry.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}
async function updateProjectEntry(param) {
    return await ProjectEntry.update({ pileNo: param.pileNo },
        {
            $set:
            {
                statusOfPilling: param.statusOfPilling,
            }

        }, { multi: true, new: true });
}

async function updateProjectEntryCageLowering(param) {
    return await ProjectEntry.update({ pileNo: param.pileNo },
        {
            $set:
            {
                cageloweringStartTime: param.cageloweringStartTime,
                cageloweringEndTime: param.cageloweringEndTime,
                statusOfPilling: param.statusOfPilling
            }

        }, { multi: true, new: true });
}

async function updateProjectEntryConcretePouring(param) {
    return await ProjectEntry.update({ pileNo: param.pileNo },
        {
            $set:
            {

                concretePouringStartTime: param.concretePouringStartTime,
                concretePouringEndTime: param.concretePouringEndTime,
                statusOfPilling: param.statusOfPilling
            }

        }, { multi: true, new: true });
}

async function cageLoweringQtyUpdate(param) {
    return await ProjectEntry.update({ pileNo: param.pileNo },
        {
            $set:
            {
                cageloweringQty: param.cageloweringQty,
                statusOfPilling: param.statusOfPilling,
            }

        }, { multi: true, new: true });
}

async function concretePouringQtyUpdate(param) {
    return await ProjectEntry.update({ pileNo: param.pileNo },
        {
            $set:
            {
                concretePouringQty: param.concretePouringQty,
                statusOfPilling: param.statusOfPilling,
            }

        }, { multi: true, new: true });
}

async function updateProjectEntryFinal(param) {
    return await ProjectEntry.update({ pileNo: param.pileNo },
        {
            $set:
            {

                noOfTrimePiecesUsed: param.noOfTrimePiecesUsed,
                noOfManPower: param.noOfManPower,
                noOfManPowerContractor: param.noOfManPowerContractor,
                noOfShifts: param.noOfShifts,
                statusOfPilling: param.statusOfPilling,
            }

        }, { multi: true, new: true });
}

async function updateProjectHistoryFinal(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                dateOfEnding: param.dateOfEnding,
                noOfTrimePiecesUsed: param.noOfTrimePiecesUsed,
                totalNoOfShiftsWorked: param.totalNoOfShiftsWorked,
                noOfManpowerPRC: param.noOfManpowerPRC,
                noOfManpowerContractor: param.noOfManpowerContractor,

            }

        }, { multi: true, new: true });
}



async function updateProjectHistorycageLoweringEndTime(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                cageLoweringStartTime: param.cageLoweringStartTime,
                cageLoweringEndTime: param.cageLoweringEndTime,
                totalTimeForCageLowering: param.totalTimeForCageLowering,
            }

        }, { multi: true, new: true });
}

async function updateProjectHistoryconcretePourEndTime(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                concretePourStartTime: param.concretePourStartTime,
                concretePourEndTime: param.concretePourEndTime,
                totalConcretePourTime: param.totalConcretePourTime,
            }

        }, { multi: true, new: true });
}
// Ended  ProjectEntry

//Recoding started
async function addProjectRecording(projectParam) {
    const projectRecording = new ProjectRecording(projectParam);
    await projectRecording.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}


async function getProjectRecordingDtlByPilno(pileNo) {
    return await ProjectRecording.find({ "pileNo": pileNo }).sort({ $natural: 1 });
}

async function getPillingDetailsByProjId(projId) {

    return await ProjectHistory.find({ $and: [{ projId: projId, casingToplevel: { $lte: 0 } }] }).sort({ $natural: -1 });
}

async function getProjectHistoryDtlByPileId(pileNo) {
    return await ProjectHistory.find({ "pileNo": pileNo }).sort({ $natural: -1 });
}





//Recoding Ended
async function getAllProjectHistory(uniqueId) {
    return await ProjectHistory.find({ "uniqueId": uniqueId }).sort({ $natural: -1 });
}



async function mapProjectUser(projectUserMappingParam) {
    console.log(projectUserMappingParam);
    // const projectUserMapping = new ProjectUserMapping(projectUserMappingParam);
    // await projectUserMapping.save()
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    await ProjectUserMapping.collection.insertMany(projectUserMappingParam, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            return "Multiple documents inserted to Collection";
        }
    });
}


async function addProject(projectParam) {
    console.log(projectParam);
    const project = new Project(projectParam);
    await project.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    
}


async function addProject(projectParam) {
    console.log(projectParam);
    const project = new Project(projectParam);
    await project.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

async function addProjectRecordingIngInBulk(projectParam) {
    await Test.collection.insertMany(projectParam, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            return "Multiple documents inserted to Collection";
        }
    });
}
async function addProjectBOM(projectBOMParam) {
    const projectBOM = new ProjectBOM(projectBOMParam);
    await projectBOM.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}


async function addProjectHistory(projectParam) {

    // validate
    if (await ProjectHistory.findOne({ pileNo: projectParam.pileNo + '-' + projectParam.uniqueId })) {
        throw 'pile No  "' + projectParam.pileNo.split('-')[0] + '" is already taken';
    }
    const projectHistory = new ProjectHistory(projectParam);
    await projectHistory.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
            throw 'pile No  "' + projectParam.pileNo.split('-')[0] + '" is already taken';
        });
}



// async function addProjectRecording(projectParam) {
//     const projectRecording = new ProjectRecording(projectParam);
//     await projectRecording.save()
//         .then((data) => {
//             console.log(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

async function updateProject(param) {
    //console.log(param.updateDate);
    // var nested = JSON.stringify(param.PillingInfoByProjectID);
    //console.log(nested);
    return await Project.findOneAndUpdate({ _id: param.id },
        {
            $set:
            {
                pillingInfoByProjectID1: param.pillingInfoByProjectID1,
                pillingInfoByProjectID2: param.pillingInfoByProjectID2,
                otherInfoByProjectID: param.otherInfoByProjectID,
                updateDate: param.updateDate
            }

        }, { multi: true, new: true });
}

async function updateProjectwithInitialVal(param) {
    //console.log(param.updateDate);
    // var nested = JSON.stringify(param.PillingInfoByProjectID);
    //console.log(nested);
    return await Project.findOneAndUpdate({ _id: param.id },
        {
            $set:
            {
                projName: param.projName,
                projDesc: param.projDesc,
                projval: param.projval,
                commenceDate: param.commenceDate,
                completionDate:param.completionDate,
                client:param.client,
                location:param.location,
            }

        }, { multi: true, new: true });
}
async function updateProjectBOM(param) {
    return await ProjectBOM.findOneAndUpdate({ _id: param.id },
        {
            $set:
            {
                title: param.title,
                desc: param.desc,
                rate: param.rate,
                qty: param.qty,
                amount: param.amount,
                updateDate: param.updateDate
            }

        }, { multi: true, new: true });
}
async function updateProjectBOMByStatus(param) {
    return await ProjectBOM.findOneAndUpdate({ _id: param.id },
        {
            $set:
            {
                status: param.status,
                updatedQty: param.updatedQty,
                updateDate: param.updateDate
            }

        }, { multi: true, new: true });
}


async function updatePillingDataWithUniqueID(param) {
    //console.log(param.updateDate);
    // var nested = JSON.stringify(param.PillingInfoByProjectID);
    //console.log(nested);
    return await Project.findOneAndUpdate({ _id: param.id },
        {
            $set:
            {
                pillingInfoByProjectID1: param.pillingInfoByProjectID1,
                pillingInfoByProjectID2: param.pillingInfoByProjectID2,
                otherInfoByProjectID: param.otherInfoByProjectID,
                updateDate: param.updateDate
            }

        }, { multi: true, new: true });
}
async function updateProjectHistory(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                pillingRigDetails: param.pillingRigDetails,
                dateOfStarting: param.dateOfStarting,
                //dateOfEnding: param.dateOfEnding,
                casingToplevel: param.casingToplevel,
                existingToplevel: param.existingToplevel,
                boringStartTime: param.boringStartTime,
                nameOfSiteEngg: param.nameOfSiteEngg
            }

        }, { multi: true, new: true });
}

async function updateProjectHistoryUsingEndBoringtime(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                boringEndTime: param.boringEndTime,
                depthOfBore: param.depthOfBore
            }

        }, { multi: true, new: true });
}
async function updateProjectRecording(param) {
    return await projectRecording.update({ PileNo: param.PileNo },
        {
            $set:
            {
                pillingRigDetails: param.pillingRigDetails,
                updateDate: Date.now()
            }

        }, { multi: true, new: true });
}

async function cageLoweringQtyProjectHistoryUpdate(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                cageloweringQty: param.cageloweringQty,

            }

        }, { multi: true, new: true });
}
async function concretePouringQtyProjectHistoryUpdate(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                concretePouringQty: param.concretePouringQty,

            }

        }, { multi: true, new: true });
}



async function updateProjectHistoryfoundinglevel(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                foundinglevel: param.foundinglevel,

            }

        }, { multi: true, new: true });
}
async function totalBoringTime(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                totalBoringTime: param.totalBoringTime,

            }

        }, { multi: true, new: true });
}   