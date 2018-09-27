import React from 'react';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);

    if (
      !this.props.id ||
      !this.props.source ||
      !this.props.displayField ||
      !this.props.valueField ||
      !this.props.onChange
    ) {
      throw new Error(
        'You must supply the id, src, displayField, valueField and onChange properties for the AutoComplete component.'
      );
    }
  }

  componentDidMount() {
    this.autocomplete();
  }

  autocomplete() {
    const inp = document.getElementById(this.props.id + '-text');
    const src = this.props.source;
    const displayField = this.props.displayField;
    const valueField = this.props.valueField;
    const onChange = this.props.onChange;

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    const valInp = inp.parentElement.querySelector("input[type='hidden']");
    let currentFocus;

    inp.addEventListener('click', function() {
      showList(true);
    });

    inp.addEventListener('blur', function(e) {
      let inputValue = inp.value;
      const foundObj = src.find(
        o => o[displayField].toUpperCase() === inputValue.toUpperCase()
      );
      if (foundObj) {
        inp.value = foundObj[displayField];
        valInp.value = foundObj[valueField];
        onChange({ target: valInp });
      }
    });

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener('input', function(e) {
      showList();
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener('keydown', function(e) {
      let x = document.getElementById(this.id + 'autocomplete-list');
      if (x) x = x.getElementsByTagName('div');
      if (e.keyCode == 40) {
        const listItems = inp.parentNode.getElementsByClassName(
          'autocomplete-items'
        );
        if (listItems && listItems.length > 0) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else {
          console.log(e.keyCode);
          showList(true);
        }
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function showList(showAll) {
      let a,
        b,
        i,
        inputValue = inp.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!showAll && !inputValue) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement('DIV');
      a.setAttribute('id', inp.id + 'autocomplete-list');
      a.setAttribute('class', 'autocomplete-items');
      /*append the DIV element as a child of the autocomplete container:*/
      inp.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < src.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        const srcObj = src[i];
        const srcValue = srcObj[valueField];
        const srcDisplay = srcObj[displayField];
        if (
          srcDisplay.toUpperCase().includes(inputValue.toUpperCase()) ||
          showAll
        ) {
          /*create a DIV element for each matching element:*/
          b = document.createElement('DIV');
          if (showAll) {
            if (srcDisplay.toUpperCase() === inputValue.toUpperCase()) {
              b.innerHTML = '<strong>' + srcDisplay + '</strong>';
            } else {
              b.innerHTML = srcDisplay;
            }
          } else {
            /*make the matching letters bold:*/
            const valIndex = srcDisplay
              .toUpperCase()
              .indexOf(inputValue.toUpperCase());
            b.innerHTML = srcDisplay.substr(0, valIndex);
            b.innerHTML +=
              '<strong>' +
              srcDisplay.substr(valIndex, inputValue.length) +
              '</strong>';
            b.innerHTML += srcDisplay.substr(valIndex + inputValue.length);
          }

          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + srcDisplay + "'>";
          b.innerHTML += "<input type='hidden' value='" + srcValue + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener('click', function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName('input')[0].value;
            valInp.value = this.getElementsByTagName('input')[1].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
            onChange({ target: valInp });
          });
          a.appendChild(b);
        }
      }
    }
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove('autocomplete-active');
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = inp.parentNode.getElementsByClassName('autocomplete-items');
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener('click', function(e) {
      closeAllLists(e.target);
    });
  }

  render() {
    return (
      <div className="autocomplete">
        <input
          id={this.props.id + '-text'}
          type="text"
          className={this.props.className}
          placeholder={this.props.placeholder}
        />
        <input id={this.props.id + '-hidden'} type="hidden" />
      </div>
    );
  }
}
