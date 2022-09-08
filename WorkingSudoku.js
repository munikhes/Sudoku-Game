function initMat() {
    let mat = [];
  
    for (let i = 0; i < 9; i++) {
      mat[i] = [];
      for (let j = 0; j < 9; j++) {
        mat[i][j] = undefined;
      }
    }
  
    return mat;
  }
  
  function moveForward(mat, row , col) {
    if (col === mat[0].length-1) {
      return [row + 1, 0];
    } else {
      return [row, col + 1];
    }
  }
  
  function moveBackwards(mat, row, col) {
    if (col === 0) {
      return [row - 1, mat[0].length-1];
    } else {
      return [row, col - 1];
    }
  }
  
  function buildSudoku() {
    let sudoku = initMat();
    let availableOptionsMat = initMat();
  
    let row = 0;
    let col = 0;
    let availableNums = getAvailableNums(sudoku, row, col); 
    availableOptionsMat[row][col] = availableNums; 
  
  
    while (row < sudoku.length) {
      if (availableNums.length === 0) {
        let move = moveBackwards(sudoku,row, col);
        row = move[0];
        col = move[1];
  
        availableOptionsMat[row][col] = availableOptionsMat[row][col].filter(
          function (val) {
            return val !== sudoku[row][col];
          }
        ); 
        sudoku[row][col] = undefined;
        availableNums = availableOptionsMat[row][col]; 


      } else {
        const randomValue = availableNums[Math.floor(Math.random() * availableNums.length)];
        sudoku[row][col] = randomValue;
  
        let move = moveForward(sudoku,row, col);
        row = move[0];
        col = move[1];
        if (row < sudoku.length) {
          availableNums = getAvailableNums(sudoku, row, col);
          availableOptionsMat[row][col] = availableNums;
        }
      }
    }
  
    return sudoku;
  }

  
  function getValidInputs(arr) {
    // Determine available nums
    let availableNums = [];
    for (let i = 0; i < 9; i++) {
      availableNums.push(true);
    }
  
    for (let i = 0; i < arr.length; i++) {
      let num = arr[i] - 1;
      if (num !== undefined) {
        availableNums[arr[i] - 1] = false;
      }
    }
  
    // Add available num to result
    let result = [];
    for (let i = 0; i < availableNums.length; i++) {
      if (availableNums[i]) {
        result.push(i + 1);
      }
    }
  
    return result;
  }
  
  function getAvailableNumInRow(mat, row) {
    return getValidInputs(mat[row]);
  }
  
  function getAvailableNumInCol(mat, col) {
    const colArr = [];
    for (let row = 0; row < 9; row++) {
      colArr.push(mat[row][col]);
    }
  
    return getValidInputs(colArr);
  }
  
  function getAvailableNumInCube(mat, row, col) {
    const cubeArr = [];
    let row_offset = Math.floor(row / 3) * 3;
    let col_offset = Math.floor(col / 3) * 3;
    for (let i=row_offset; i <= 2 + row_offset; i++) {
      for (let j = col_offset; j <= 2 + col_offset; j++) {
        cubeArr.push(mat[i][j]);
      }
    }
    return getValidInputs(cubeArr);
  }
  function getAvailableNums(mat, row, col) {
    const availableInRow = getAvailableNumInRow(mat, row);
    const availableInCol = getAvailableNumInCol(mat, col);
    const availableInCube = getAvailableNumInCube(mat, row, col);
  
    return findDupicateNumbers(
      findDupicateNumbers(availableInRow, availableInCol),
      availableInCube
    );
  }
  
  function findDupicateNumbers(arr1, arr2) {
    let i = 0;
    let j = 0;
    let result = [];
  
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] === arr2[j]) {
        if (result.length === 0 || result[result.length - 1] !== arr1[i]) {
          result.push(arr1[i]);
        }
        i++;
        j++;
      } else if (arr1[i] < arr2[j]) {
        i++;
      } else {
        j++;
      }
    }
    return result;
  }



/// take the function, reset % of cells and put to HTML
var para = new URLSearchParams(window.location.search);// get form input as query
var level = para.get("level");

let id=0;

function getUnsolvedSudoku()
  {
  const fullSudoku=buildSudoku();
  let atemp; 
  if(level =="easyBoard")
{
   atemp = 20;
   
}
else if(level =="mediumBoard")
{
   atemp = 40;
}
else if(level =="hardBoard")
{
   atemp = 60;
} 
 
    while(atemp>0)
   {
      let rand1 = Math.floor(Math.random()*9);
      let rand2 = Math.floor(Math.random()*9);

      let row = rand1;
      let col = rand2;
      atemp--;
      if(fullSudoku[row][col]==undefined)
         {
            atemp++;
         }
      else
      fullSudoku[row][col]=undefined;
   }
    return fullSudoku;
}

const unsolvedSudoku=getUnsolvedSudoku()
   
function userGame()
  {
    for(let row=0; row<unsolvedSudoku.length; row++)
    {
      for(let col=0; col<unsolvedSudoku.length; col++)    
        {
          id++;
          if(unsolvedSudoku[row][col] !==undefined)
          {
            document.getElementById("input"+id).value = unsolvedSudoku[row][col];
            document.getElementById("input"+id).disabled = true;
          }
          else
            document.getElementById("input"+id).disabled = false;   
        }     
    } 
    
           return unsolvedSudoku;
  }
userGame()

//////// checkUserSudoku() is taking the results in usersr's sudoku 
//////// we put it to findIfTrue() and and checking if the condition is true
/////// now i will check how to change the color of the cell

let count1 = 0;
let count2 = 0;
let checkRow = [];
let checkCol =[];

let userSudoku = [];
function checkUserSudoku()
{
  let id = 1;
  for (let i = 0; i < 9; i++) 
  {
  userSudoku[i] = [];
  for (let j = 0; j < 9; j++)
   {
    userSudoku[i][j] = document.getElementById("input" + id).value;
    id++;
   }
  }
  return userSudoku;
}

function findIfTrue()
{
    checkUserSudoku()
    for(let row=0; row<userSudoku.length; row++)
    {  
        for(let col=0; col<userSudoku.length; col++)
        {
            checkRow.push(userSudoku[row][col]);
            checkRow.sort(function(a, b){return a - b}); 
             
        }
        for(let i=0; i<userSudoku.length; i++)
            if(checkRow[i]===checkRow[i-1] || checkRow[i] =='')
            {
              count1++
            }
          
            checkRow=[]
    }
    
    for(let col=0; col<userSudoku.length; col++)
    {  
        for(let row=0; row<userSudoku.length; row++)
        {
            checkCol.push(userSudoku[row][col]);
            checkCol.sort(function(a, b){return a - b});   
        }
        for(let i=0; i<userSudoku.length; i++)
        if(checkCol[i]===checkCol[i-1] || checkCol[i] =='')
            {
              count2++
            }
         
            checkCol=[]
    }
   if(count1+count2 !== 0)
   {
       window.alert("Fail! you should try again")
   }
   else
       window.alert("You Did It! Great Job")
  }
  

  function clearBoard()
  {
    unsolvedSudoku
    
    id = 0;
    for(let row=0; row<unsolvedSudoku.length; row++)
    {
      for(let col=0; col<unsolvedSudoku.length; col++)    
        {
          
          id ++
          if(unsolvedSudoku[row][col] == undefined)
          {
            document.getElementById("input"+id).value = null;
          }
            
        }  
        }     
    } 
    