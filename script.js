let app = angular.module("myModule",[]);
var employees=[
    {name:"shivani", lastname:"yadav", gender:0,salary:"15000",dob:new Date("may 16,1900")},
    {name:"ayush", lastname:"gaur", gender:0,salary:"18000",dob:new Date("may 16,1930")},
    {name:"ayush", lastname:"gaur", gender:2,salary:"180000",dob:new Date("may 16,1930")},
    {name:"mansi", lastname:"thakur", gender:1,salary:"25000",dob:new Date("may 16,1909")},
    {name:"mansi", lastname:"thakur", gender:1,salary:"250000",dob:new Date("may 16,1909")},
    {name:"deepanshi", lastname:"singh", gender:1,salary:"150000",dob:new Date("may 16,1991")},
    {name:"deepanshi", lastname:"singh", gender:1,salary:"1500",dob:new Date("may 16,1991")},
    {name:"manoj", lastname:"kaushik", gender:2,salary:"100000",dob:new Date("may 16,1999")},
    {name:"manoj", lastname:"kaushik", gender:0,salary:"1000",dob:new Date("may 6,2000")},
    {name:"shivani", lastname:"yadav", gender:1,salary:"1500",dob:new Date("may 16,1903")},
]; 
var multiplesort = ['name','lastname','gender','salary','dob'];
var modalOpen=false;

app.controller("myController", ($scope) => {        
        $scope.employees=employees;
        $scope.modalOpen=modalOpen;
        $scope.MultipleSort_Popup = function () {
            $scope.modalOpen=!$scope.modalOpen;
        }
        //     modalOpen=true;
        //     console.log("nmb"+modalOpen);
        //     $scope.multiplesort = multiplesort;
            
           

        //     // $mdDialog
        //     //   .show({
        //     //     template:
        //     //       "<multiple-sort received-data='multiplesort'></multiple-sort>",
        //     //     clickOutsideToClose: true,
        //     //     escapeToClose: true,
        //     //     scope: $scope,
        //     //     preserveScope: true,
        //     //   })
        //     //   .then((data) => {
        //     //     console.log(JSON.stringify(data));
        //     //     $scope.chosen_multisort=[];
        //     //     for(let i=0;i<data.length;i++){
        //     //     if(data[i].order==="asc")
        //     //     $scope.chosen_multisort.push('+'+data[i].col);
        //     //     else  if(data[i].order==="desc")
        //     //     $scope.chosen_multisort.push('-'+data[i].col);
        //     //     }
        //     //     console.log(JSON.stringify($scope.chosen_multisort));
        //     //   });
        // }
    
        $scope.receivedData=multiplesort;
        $scope.sortColumn=[]
            $scope.receivedData.forEach((item, i)=>{
                $scope.sortColumn[i]={ col: "", order: "asc", values: [] };
            });
  
        // -------------------------------
       
        $scope.data=$scope.receivedData
        $scope.index = 0;
        $scope.elements = [];
        $scope.dataselected = [];
        $scope.result = [] = [{ col: "", order: "asc" }];
        $scope.elements[-1] = $scope.sortColumn[-1] 
        = {
          col: "",
          order: "asc",
          values: $scope.data,
        };
  
        $scope.add_sort_button = false;
        $scope.delete_sort_button = true;
  
        // ------------------------------------
       
        $scope.addRow = function () {
          $scope.delete_sort_button = false;
          if ($scope.elements.length <= 0)
            $scope.dataselected.push($scope.elements[-1].col);
          else
            $scope.dataselected.push(
              $scope.elements[$scope.elements.length - 1].col
            );
          if ($scope.elements.length < $scope.data.length - 1) {
            $scope.sortColumn[$scope.index].values = $scope.data.filter(
              (item) => !$scope.dataselected.some((other) => item == other)
            );
            $scope.sortColumn[$scope.index].col =
              $scope.sortColumn[$scope.index].values[0];
            $scope.elements.push($scope.sortColumn[$scope.index]);
          }
          if ($scope.elements.length == $scope.data.length - 1)
           $scope.add_sort_button = true;
          $scope.index++;
        };
  
        // --------------------------------
  
        $scope.deleteRow = function () {
          $scope.add_sort_button = false;
          $scope.elements.pop();
          $scope.sortColumn[$scope.elements.length] = {
            col: "",
            order: "asc",
            values: [],
          };
          $scope.index--;
          $scope.dataselected.pop();
          if ($scope.elements.length <= 0) $scope.delete_sort_button = true;
        };
  
        // ---------------------------------------------------
  
        $scope.onsortBychange = function (changeval, changedindex) {
          //console.log(changedindex+" "+$scope.elements.length)
          if (changedindex == $scope.elements.length - 1) return;
          let prevval = $scope.dataselected[changedindex + 1];
          for (let i = changedindex + 1; i < $scope.elements.length; i++) {
            var position = $scope.elements[i].values.indexOf(changeval);
            $scope.elements[i].values[position] = prevval;
            if ($scope.elements[i].col == changeval) {
              $scope.elements[i].col = prevval;
            }
            //replace changeval by change preval in below array
          }
          let changeval_dataselected = $scope.dataselected.indexOf(changeval);
          if (changeval_dataselected > -1)
            $scope.dataselected[changeval_dataselected] = prevval;
          $scope.dataselected[changedindex + 1] = changeval;
          //console.log($scope.dataselected);
          return;
        };
        // -------------------------------
  
        $scope.delete_particularcol = function (delval, delindex) {
          $scope.add_sort_button = false;
  
          if (delindex == $scope.elements.length - 1) {
            $scope.elements.pop();
            $scope.sortColumn[$scope.elements.length] = {
              col: "",
              order: "asc",
              values: [],
            };
            $scope.index--;
          } else {
            for (let i = delindex + 1; i < $scope.elements.length; i++) {
              $scope.elements[i].values.push(delval);
            }
            $scope.elements.splice(delindex, 1);
            let position = $scope.dataselected.indexOf(delval);
            $scope.dataselected.splice(position, 1);
            $scope.sortColumn[$scope.elements.length] = {
              col: "",
              order: "asc",
              values: [],
            };
            $scope.index--;
          }
          //console.log($scope.elements)
          //console.log($scope.dataselected)
        };
  
        // -------------------------
        $scope.onclickSort = function () {
          $scope.result[0] = {
            col: $scope.elements[-1].col,
            order: $scope.elements[-1].order,
          };
          for (let i = 1; i <= $scope.elements.length; i++) {
            $scope.result[i] = {
              col: $scope.elements[i - 1].col,
              order: $scope.elements[i - 1].order,
            };
          }
          console.log("clode the dialog box");
          $scope.modalOpen=false;
          console.log(JSON.stringify($scope.result));
          $scope.chosen_multisort=[];
                  for(let i=0;i<$scope.result.length;i++){
                  if($scope.result[i].order==="asc")
                  $scope.chosen_multisort.push('+'+$scope.result[i].col);
                  else  if(d3ata[i].order==="desc")
                  $scope.chosen_multisort.push('-'+$scope.result[i].col);
                  }
                  console.log(JSON.stringify($scope.chosen_multisort));



        //   $mdDialog.hide($scope.result);
        };
  
        // ------------------------
  
        $scope.modalclose = function () {
            console.log("clode the dialog box");
            $scope.modalOpen=false;

         // $mdDialog.hide();
        };
    })