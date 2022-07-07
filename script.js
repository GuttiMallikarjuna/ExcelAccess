

function GetData(){

var id=document.getElementById("userid").value;

            fetch('./empdata.json')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            for(var item of data){
                if(item.userid==id){
                

    //document.write(`id:${id.value}<br>Name:${item.username}<br>Mobile:${item.mobile}<br>pin code:${item.pincode}<br>State:${item.state}<br>address:${item.address}<br>Email:${item.email}`);
           
            username.value=item.username;
            mobile.value=item.mobile;
            pincode.value=item.pincode;
            state.value=item.state;
            address.value=item.address;
            email.value=item.email;   
            
        }
    }
})
}

 // Method to upload a valid excel file
function upload() {
    var files = document.getElementById('file_upload').files;
    if(files.length==0){
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    }else{
        alert("Please select a valid excel file.");
    }
  }
   
  //Method to read excel file and convert it into JSON 
  function excelFileToJSON(file){
      try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function(e) {
   
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type : 'binary'
            });
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            //displaying the json result
            var resultEle=document.getElementById("json-result");
            resultEle.value=JSON.stringify(result, null, 4);
            resultEle.style.display='block';
           
            }
        }catch(e){
            console.error(e);
        }
  }
  function downloadclick(){
    empdata.json.innerHTML="";
    var download=document.getElementById("json-result").value;
    empdata.json.push(download);
  }