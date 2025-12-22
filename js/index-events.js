document.getElementById("we_expand_button").onclick = onClickExpandWorkExperience;

function onClickExpandWorkExperience() { 
    var weTableWrapper = document.getElementById("we_table_wrapper");

    if (weTableWrapper.style.maxHeight === '0px') {
        weTableWrapper.style.maxHeight = weTableWrapper.scrollHeight + 'px';
    } else {
        weTableWrapper.style.maxHeight = '0px';
    }
}