let currentTab= 0;
const tabs = document.querySelectorAll('.tab')
const menuBtn = document.querySelectorAll('.menu-btn')
const homepageEle = document.getElementById('homepage')

function switchTab(index){
    currentTab = index;
    tabs.forEach(tab => tab.classList.remove('active'))
    menuBtn.forEach(btn => btn.classList.remove('active-btn'))

    tabs[index].classList.add('active');
    menuBtn[index].classList.add('active-btn')
}

function validate(index){
    let valid = true
    let inputs = tabs[index].querySelectorAll('input')

   inputs.forEach( input => {
    let parent = input.parentElement;
    let error = parent? parent.parentElement.querySelector('.error') : null

    if (input.value.trim() === ""){
        if(error) 
        error.innerText = "THIS FIELD IS REQUIRED";
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

tabs.forEach((tab,index) => {
    const signupForm = document.getElementById('signupForm')
    const loginForm = document.getElementById('loginForm')

    tab.addEventListener('submit', (e)=>{
        e.preventDefault();
        if (validate(index)){
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
                alert("Login Successfull!")
                loginForm.classList.remove('active');
                homepageEle.classList.add('active')
                tabs[index].classList.remove('active');
                menuBtn[index].classList.remove('active-btn')
                menuBtn[0].style.display = "none"
                menuBtn[1].style.display = "none"

            }

        }
    })
})
