
    var flag=1;
    var inp=document.querySelector(".vv");
    var i=document.querySelector(".i");
    i.innerHTML=`<i class="ri-eye-line eye" onclick="hello()"></i>`

    function hello(){
        
if(inp.type==="password"){
    console.log(flag);
   i.innerHTML=`<i class="ri-eye-off-line eye" onclick="hello()"></i>`
   inp.type="text";
  flag=0;
}
else{
    console.log(flag);
    i.innerHTML=`<i class="ri-eye-line eye" onclick="hello()"></i>`
     inp.type="password";
  flag=1;
}
    }
    var close=document.querySelector(".logout");
    var closeup=document.querySelector(".logout2");
    function closee(){
     var flag=0;
     if(flag==0){ 
        close.style.top="10%";
        close.style.scale=.9;
        close.style.opacity=0;
        flag=1;
    }
        else{
            close.style.top="10%";  
            close.style.scale=1;
            close.style.opacity=1,
            flag=0;
        }
    }
    function closeee(){
     var flag=0;
     if(flag==0){ 
        closeup.style. transform= `translate(38rem, 5rem)`;
        // closeup.style.scale=1;
        closeup.style.opacity=0;
        flag=1;
    }
        else{
            closeup.style.top="10%";  
            closeup.style.scale=1;
            closeup.style.opacity=1,
            flag=0;
        }
    }
gsap.from(close,{
    y:"150px",
    opacity:0,
    duration:.5,
    stagger: 0.15

})
gsap.from(closeup,{
    y:"150px",
    opacity:0,
    duration:.5,
    stagger: 0.15

})
setTimeout(()=>{
    closeup.style. transform= `translate(38rem, 5rem)`
    // closeup.style.scale=.9;
    closeup.style.opacity=0;
},10000);
setTimeout(()=>{
    close.style.top="20%";
    close.style.scale=.9;
    close.style.opacity=0;
},10000);

                              
var mnp=document.querySelector(".mnp");
var form=document.querySelector(".form1");


// function submit1(){

   
//        if(mn.length!==10){
//         console.log("its work")
//            mnp.textContent=`mobile number has been contain 10 digit`
//            mn.style.border=`.5px solid red`;
//            return false;
           
//         }
//        else{
//         console.log("its note");
//            // setTimeout(()=>{
//             return true;
//         //     mn.style.border=`0px solid red`;

//         // },5000)
        
//        }
//     }
function validateForm() {
    // Get the value of the mobile number input
    const mobileNumber = document.querySelector(".mn").value;

    // Check if the mobile number has a length of 10
    if (mobileNumber.length !== 10) {
        
        alert("Mobile number should be 10 digits");
        mnp.textContent=`mobile number has been contain 10 digit`;                          
        return false; // Prevent form submission
    }

    // If the validation passes, allow the form submission
    return true;
}

