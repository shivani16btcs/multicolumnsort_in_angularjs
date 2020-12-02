let app = angular.module("myModule",[]);
var employees=[
    {name:"shivani",  category:0,salary:"15000",Age:30,weight:50},
    {name:"ayush",    category:0,salary:"1800",Age:20,weight:55},
    {name:"ayush",    category:2,salary:"18000",Age:60,weight:35},
    {name:"mansi",    category:1,salary:"2500",Age:23,weight:45},
    {name:"mansi",    category:1,salary:"25000",Age:13,weight:60},
    {name:"deepanshi",category:1,salary:"15000",Age:34,weight:53},
    {name:"deepanshi",category:1,salary:"150",Age:22,weight:41},
    {name:"manoj",    category:2,salary:"10000",Age:25,weight:45},
    {name:"manoj",    category:0,salary:"1000",Age:15,weight:56},
    {name:"shivani",  category:1,salary:"1500",Age:60,weight:34},
]; 
var multiplesort = ['name','category','salary','Age','weight'];
var modalOpen=false;

app.controller("myController", ($scope) => {        
        $scope.employees=employees;
        $scope.modalOpen=modalOpen;
        $scope.MultipleSort_Popup = function () {
            $scope.modalOpen=!$scope.modalOpen;
        }
       
        $scope.multiplesort=multiplesort;
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