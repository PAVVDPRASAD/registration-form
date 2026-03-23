let currentTab = 0;
let currentStep = 0;
const tabs = document.querySelectorAll('.tab')
const menuBtn = document.querySelectorAll('.menu-btn')
const homepageEle = document.getElementById('homepage')
const subTabBtn = document.querySelectorAll('.sub-tab')
const formContainers = document.querySelectorAll('#signupForm .form-container')

console.log(formContainers)

// function darkMode(){
//     const darkModeBtn = document.getElementById('darkModeBtn');
//     document.body.classList.toggle('dark-mode');
    
//     if (document.body.classList.contains('dark-mode')) {
//         darkModeBtn.textContent = 'Light Mode';
//     } else {
//         darkModeBtn.textContent = 'Dark Mode';
//     }
// }

const inputCertificate = document.getElementById('certification');
let certificatesPreviewEle = document.getElementById('certificatesPreview');
let selectedFiles = [];
    inputCertificate.addEventListener('change', () => {
    for (const file of inputCertificate.files) {
        console.log(file.name, file.type, file.size);
        selectedFiles.push(file);
    }
    console.log(selectedFiles);
    });



function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('profilePreview').style.display = 'block';
      document.getElementById('profilePreview').src = URL.createObjectURL(file);
    }
  }

function showStep(step) {
    formContainers.forEach((container, index) => {
        container.style.display = index === step ? 'block' : 'none';
    });
    subTabBtn.forEach((tab, index) => {
        tab.classList.toggle('active', index === step);
    });
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('signupBtn');
    prevBtn.style.display = step === 0 ? 'none' : 'inline-block';
    if (step === formContainers.length - 1) {
        nextBtn.textContent = 'Submit';
        nextBtn.type = 'submit';
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.type = 'button';
    }
}

function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < formContainers.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            document.getElementById('signupForm').dispatchEvent(new Event('submit'));
        }
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

function switchTab(index){
    currentTab = index;
    tabs.forEach(tab => tab.classList.remove('active'))
    menuBtn.forEach(btn => btn.classList.remove('active-btn'))

    tabs[index].classList.add('active');
    menuBtn[index].classList.add('active-btn')
    if (index === 1){
        subTabBtn.forEach(btn => btn.style.display = "none")
    }
    else{
        subTabBtn.forEach(btn => btn.style.display = "block")
        currentStep = 0;
        showStep(0);
    }
}

function validateStep(step){
    let valid = true
    let inputs = formContainers[step].querySelectorAll('input')
    console.log(inputs)
   inputs.forEach( input => {
    let parent = input.parentElement;
    let error = parent? parent.parentElement.querySelector('.error') : null

    if (input.value.trim() === ""){
        if(error) 
        error.innerText = "This field is required.";
        input.style.borderColor = "#DC2626"
        input.style.borderWidth = "2px"
        valid = false;
    }else{
        if(error) 
        error.innerText = "";
        input.style.borderColor = "#028045"
        input.style.borderWidth = "2px"
    }
   });
   return valid
};

function validateAllSteps(){
    let valid = true
    for (let i = 0; i<formContainers.length; i++) {
        let inputs = formContainers[i].querySelectorAll('input')
        inputs.forEach(input => {
            let parent = input.parentElement;
            let error = parent? parent.parentElement.querySelector('.error') : null
            
            if (input.value.trim() === ""){
                if(error) 
                error.innerText = "This field is required.";
                input.style.borderColor = "#DC2626"
                input.style.borderWidth = "2px"
                valid = false;
            }else{
                if(error) 
                error.innerText = "";
                input.style.borderColor = "#028045"
                input.style.borderWidth = "2px"
            }
        });
    }
    return valid
};

function validate(index){
    let valid = true
    let inputs = tabs[index].querySelectorAll('input')

   inputs.forEach( input => {
    let parent = input.parentElement;
    let error = parent? parent.parentElement.querySelector('.error') : null

    if (input.value.trim() === ""){
        if(error) 
        error.innerText = "This field is required.";
        input.style.borderColor = "#DC2626"
        input.style.borderWidth = "2px"
        valid = false;
    }else{
        if(error) 
        error.innerText = "";
        input.style.borderColor = "#028045"
        input.style.borderWidth = "2px"
    }
   });
   return valid
};

subTabBtn.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        if (currentTab === 0) {
            currentStep = index;
            showStep(currentStep);
        }
    });
});

tabs.forEach((tab,index) => {
    const signupForm = document.getElementById('signupForm')
    const loginForm = document.getElementById('loginForm')

    tab.addEventListener('submit', (e)=>{
        e.preventDefault();
        let isValid = index === 0 ? validateAllSteps() : validate(index);
        if (isValid){
            console.log(index)
            signupForm.classList.remove('active')
            loginForm.classList.add('active')
            if (index === 0) {
                alert('Signup Successful!')
                tabs[index].classList.remove('active');
                menuBtn[index].classList.remove('active-btn')
                tabs[index+1].classList.add('active');
                menuBtn[index+1].classList.add('active-btn')

            }
            else{
                alert("Login Successful!")
                loginForm.classList.remove('active');
                homepageEle.classList.add('active')
                tabs[index].classList.remove('active');
                menuBtn[index].classList.remove('active-btn')
                menuBtn[0].style.display = "none"
                menuBtn[1].style.display = "none"

            }

        }
        // else{
        //     alert("Please fill all the required fields.")
        // }
    })
})


document.addEventListener('DOMContentLoaded', () => {
    showStep(0);
});

