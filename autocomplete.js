const createAutoComplete =({ root ,
     renderOption ,
      onOptionSelect,
       inputValue ,
        fetchData}) =>{

 root.innerHTML= `
   <label><b>Search</b></label>
   <input class="input"/>
   <div class="dropdown">
   <div class="dropdown-menu">
   <div class="dropdown-content results"></div>
   </div>
   </div>
 `;
//Reaching input user value

const input = root.querySelector('.input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const onInput = async event =>  {
 const items = await fetchData(event.target.value);

 if(!items.length) {
    dropdown.classList.remove("is-active");
    return;
 }
 //Displaying movie data
      resultsWrapper.innerHTML= '';
      dropdown.classList.add('is-active');
      for (let item of items) {
      const option = document.createElement('a');
      //Checking if poster of movie exist
      
      option.classList.add('dropdown-item');  
      option.innerHTML= renderOption(item);
     // When the user clicks on the movie
      option.addEventListener("click",()=>{
         dropdown.classList.remove('is-active');
         input.value = inputValue(item);
         onOptionSelect(item);
      })
     resultsWrapper.appendChild(option);
  }
 };
 input.addEventListener('input', debounce(onInput,500));

// Clear search whenever user click outside the dropdown
document.addEventListener('click',event =>{
   if(!root.contains(event.target)){
      dropdown.classList.remove('is-active');
   }
});

};