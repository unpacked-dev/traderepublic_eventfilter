const doFilter = () => {
    resetFilter();

    const term = document.querySelector('#eventFilterInput').value;
    const type = document.querySelector('#eventFilterType').value;
    
    if(!term || term.length <= 3) return;

    let allEvents = document.querySelectorAll('.timelineEvent');
    
    for(let i = 0; i < allEvents.length; i++) {
        let evnt = allEvents[i];
        const name = evnt.children[1].innerHTML;
        const action = evnt.children[2].innerHTML;
        if(!name.includes(term) || !action.includes(type)) {
            evnt.style.display = 'none';
        }
    }
}

const resetFilter = () => {
    let allEvents = document.querySelectorAll('.timelineEvent');
    for(let i = 0; i < allEvents.length; i++) {
        let evnt = allEvents[i];
        evnt.style.display = 'grid'
    }
}

const initUI = () => {
    //Create Elements
    let filterUI = document.createElement('div');
    filterUI.classList.add('eventfilterWrapper');
    let filterInput = '<input placeholder="Filter" id="eventFilterInput"/>';
    
    let filterTypes = [];
    filterTypes.push({"name": "-", "id": ""});
    filterTypes.push({"name": "BUY", "id": "Kauf"});
    filterTypes.push({"name": "SELL", "id": "Verkauf"});
    filterTypes.push({"name": "DEPOSIT", "id": "Geldeingang"});
    filterTypes.push({"name": "WITHDRAW", "id": "Geldausgang"});

    let filterOptions = '';
    for(let i = 0; i < filterTypes.length; i++) {
        const {name, id} = filterTypes[i];
        filterOptions += `<option value="${id}">${name}</option>`;
    }
    let filterType = `<select id="eventFilterType">${filterOptions}</select>`

    filterUI.innerHTML = filterInput + filterType;
    document.querySelector('.layout__primary').append(filterUI);

    //Create Style
    const searchbox = document.getElementById('instrumentSearch__q');
    const searchboxStyle = window.getComputedStyle(searchbox);

    let css = "";
    for (style in searchboxStyle) { 
      searchboxStyleProp = searchboxStyle.item(style)
      css += searchboxStyleProp + ": " + searchboxStyle.getPropertyValue(searchboxStyleProp) + ";";
    }
    css += 'margin-bottom: 20px;';

    document.querySelector('#eventFilterInput').style.cssText = css + 'padding-left: 15px !important;';
    document.querySelector('#eventFilterType').style.cssText = css + 'padding-left: 10px !important;' + 'max-width: 150px !important;';
    document.querySelector('.eventfilterWrapper').style.cssText = 'display: flex; justify-content: space-between;'

    document.querySelector('#eventFilterInput').addEventListener("keyup", doFilter);
    document.querySelector('#eventFilterType').addEventListener("change", doFilter);
    document.addEventListener("scroll", doFilter);
}

initUI();