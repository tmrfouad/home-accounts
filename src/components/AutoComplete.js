import React from 'react';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);

    if (
      !props.id ||
      !props.source ||
      !props.displayField ||
      !props.valueField ||
      !props.onChange
    ) {
      throw new Error(
        'You must supply the id, src, displayField, valueField and onChange properties for the AutoComplete component.'
      );
    }

    const selectedItem =
      props.source.find(
        itm => itm[props.valueField] + '' === props.value + ''
      ) || {};

    this.state = {
      value: props.value,
      display: selectedItem ? selectedItem[props.displayField] : '',
      selectedItem
    };
  }

  componentDidMount() {
    this.autocomplete();
  }

  autocomplete() {
    const self = this;
    const inp = document.getElementById(this.props.id + '-text');
    const src = this.props.source;
    const displayField = this.props.displayField;
    const valueField = this.props.valueField;
    const onChange = this.props.onChange;

    let currentFocus;

    inp.addEventListener('click', function() {
      showList(true);
    });

    inp.addEventListener('blur', function(e) {
      let inputValue = inp.value;
      const foundObj = src.find(o => o[displayField] + '' === inputValue + '');
      if (foundObj) {
        const value = foundObj[valueField];
        const display = foundObj[displayField];
        const selectedItem = foundObj;

        self.setState({
          value,
          display,
          selectedItem
        });
        onChange(value);
        closeAllLists();
      } else {
        if (isListOpen()) {
          const firstListItem = inp.parentNode.querySelector(
            '.autocomplete-active'
          );
          if (firstListItem) {
            const value = firstListItem.getElementsByTagName('input')[0].value;
            const firstObj = src.find(
              itm => itm[valueField] + '' === value + ''
            );
            console.log(firstObj);
            const display = firstObj[displayField];
            const selectedItem = firstObj;

            self.setState({
              value,
              display,
              selectedItem
            });
            onChange(value);
            closeAllLists();
          }
        }
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
        if (isListOpen()) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else {
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
      } else if (e.keyCode == 27) {
        closeAllLists();
      }
    });
    function showList(showAll) {
      if (showAll && isListOpen()) {
        closeAllLists();
        return;
      }

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
          b.innerHTML += "<input type='hidden' value='" + srcValue + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener('click', function(e) {
            /*insert the value for the autocomplete text field:*/
            // const display = this.getElementsByTagName('input')[0].value;
            const value = this.getElementsByTagName('input')[0].value;
            const selectedItem = self.props.source.find(
              itm => itm[valueField] + '' === value + ''
            );
            const display = selectedItem
              ? selectedItem[self.props.displayField]
              : '';

            self.setState({
              value,
              display,
              selectedItem
            });

            // inp.value = display;
            // self.state.value[displayField] = display;

            // valInp.value = value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
            onChange(value);
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
    function isListOpen() {
      return !!inp.parentNode.querySelector('.autocomplete-items');
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener('click', function(e) {
      closeAllLists(e.target);
    });
  }

  onDisplayChange = e => {
    const display = e.target.value;
    this.setState({
      display
    });
  };

  render() {
    return (
      <div className="autocomplete">
        <input
          id={this.props.id + '-text'}
          type="text"
          className={this.props.className}
          placeholder={this.props.placeholder}
          value={this.state.display}
          onChange={this.onDisplayChange}
          autoComplete="off"
        />
        <input
          id={this.props.id + '-hidden'}
          value={this.state.value}
          type="hidden"
        />
      </div>
    );
  }
}