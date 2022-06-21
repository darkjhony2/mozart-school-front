import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputGroup } from 'reactstrap'

const Search = props => {

    function filterTable() {
        var input, table, filter, tr, td, txtValue, i, j;
        input = document.getElementById(props.id);
        filter = input.value.toUpperCase();
        table = document.getElementById(props.target);
        tr = table.getElementsByTagName("tr");
        j = 0;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[props.columnSearch]
            if (td) {
                txtValue = td.textContent || td.innerText
                txtValue = txtValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
            j++;
        }
    }

    return (
        <InputGroup>
            <Input size={'sm'} onKeyUp={e => filterTable()} bsSize='sm' id={props.id} placeholder={props.placeholder}>
            </Input>
        </InputGroup>
    )
}

export default Search