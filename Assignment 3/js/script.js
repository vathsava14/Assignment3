var crudApp = new function () {
        this.myValues = [
            { ID: '1', County_Name: 'Hillsborough', State: 'Florida', Total_Percentage: 33.50 },
            { ID: '2', County_Name: 'Pinellas', State: 'Florida', Total_Percentage: 31.70 },
            { ID: '3', County_Name: 'Athens', State: 'Ohio', Total_Percentage: 30.20 }
        ]

        this.state = ['Florida' , 'Ohio'];
        this.col = [];
        this.createTable = function () {
            for (var i = 0; i < this.myValues.length; i++) {
                for (var key in this.myValues[i]) {
                    if (this.col.indexOf(key) === -1) {
                        this.col.push(key);
                    }
                }
            }
            var table = document.createElement('table');
            table.setAttribute('id', 'countiesTable');
	    var tr = table.insertRow(-1);
            for (var h = 0; h < this.col.length; h++) {
                var th = document.createElement('th');
                th.innerHTML = this.col[h].replace('_', ' ');
                tr.appendChild(th);
            }
            for (var i = 0; i < this.myValues.length; i++) {
                tr = table.insertRow(-1);
                for (var j = 0; j < this.col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = this.myValues[i][this.col[j]];
                }
                this.td = document.createElement('td');
                tr.appendChild(this.td);
                var btCancel = document.createElement('input');
                btCancel.setAttribute('type', 'button');
                btCancel.setAttribute('value', 'Cancel');
                btCancel.setAttribute('id', 'Cancel' + i);
                btCancel.setAttribute('style', 'display:none;');
                btCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
                this.td.appendChild(btCancel);

                tr.appendChild(this.td);
                var btSave = document.createElement('input');
                btSave.setAttribute('type', 'button');
                btSave.setAttribute('value', 'Save');
                btSave.setAttribute('id', 'Save' + i);
                btSave.setAttribute('style', 'display:none;');
                btSave.setAttribute('onclick', 'crudApp.Save(this)');
                this.td.appendChild(btSave);

                tr.appendChild(this.td);
                var btUpdate = document.createElement('input');
                btUpdate.setAttribute('type', 'button');
                btUpdate.setAttribute('value', 'Update');
                btUpdate.setAttribute('id', 'Edit' + i);
                btUpdate.setAttribute('style', 'background-color:#f5da42;');
                btUpdate.setAttribute('onclick', 'crudApp.Update(this)');
                this.td.appendChild(btUpdate);

                this.td = document.createElement('th');
                tr.appendChild(this.td);
                var btDelete = document.createElement('input');
                btDelete.setAttribute('type', 'button');
                btDelete.setAttribute('value', 'Delete');
                btDelete.setAttribute('style', 'background-color:#f54242;');
                btDelete.setAttribute('onclick', 'crudApp.Delete(this)');
                this.td.appendChild(btDelete);
            }
            tr = table.insertRow(-1);
            for (var j = 0; j < this.col.length; j++) {
                var newCell = tr.insertCell(-1);
                if (j >= 1) {
                    if (j == 2) {
                        var select = document.createElement('select');
                        select.innerHTML = '<option value=""></option>';
                        for (k = 0; k < this.state.length; k++) {
                            select.innerHTML = select.innerHTML +
                                '<option value="' + this.state[k] + '">' + this.state[k] + '</option>';
                        }
                        newCell.appendChild(select);
                    }
                    else {
                        var tBox = document.createElement('input');
                        tBox.setAttribute('type', 'text');
                        tBox.setAttribute('value', '');
                        newCell.appendChild(tBox);
                    }
                }
            }
            this.td = document.createElement('td');
            tr.appendChild(this.td);

            var btNew = document.createElement('input');
            btNew.setAttribute('type', 'button'); 
            btNew.setAttribute('value', 'Add');
            btNew.setAttribute('id', 'New' + i);
            btNew.setAttribute('style', 'background-color:#4287f5;');
            btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');
            this.td.appendChild(btNew);

            var div = document.getElementById('container');
            div.innerHTML = '';
            div.appendChild(table);
        };

        this.Cancel = function (oButton) {

            oButton.setAttribute('style', 'display:none; float:none;');

            var activeRow = oButton.parentNode.parentNode.rowIndex;

            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:none;');

            var btUpdate = document.getElementById('Edit' + (activeRow - 1));
            btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#48f542;');

            var tab = document.getElementById('countiesTable').rows[activeRow];

            for (i = 0; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                td.innerHTML = this.myValues[(activeRow - 1)][this.col[i]];
            }
        }

        this.Update = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('countiesTable').rows[activeRow];
            for (i = 1; i < 4; i++) {
                if (i == 2) {
                    var td = tab.getElementsByTagName("td")[i];
                    var ele = document.createElement('select');
                    ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                    for (k = 0; k < this.state.length; k++) {
                        ele.innerHTML = ele.innerHTML +
                            '<option value="' + this.state[k] + '">' + this.state[k] + '</option>';
                    }
                    td.innerText = '';
                    td.appendChild(ele);
                }
                else {
                    var td = tab.getElementsByTagName("td")[i];
                    var ele = document.createElement('input');
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', td.innerText);
                    td.innerText = '';
                    td.appendChild(ele);
                }
            }

            var btCancel = document.getElementById('Cancel' + (activeRow - 1));
            btCancel.setAttribute('style', 'display:block; margin-left:10px; float:left; background-color:#f54242;');

            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:block; margin-left:10px; float:left; background-color:#2DBF64;');

            oButton.setAttribute('style', 'display:none;');
        };

        this.Delete = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            this.myValues.splice((activeRow - 1), 1);
            this.createTable();
        };

        this.Save = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('countiesTable').rows[activeRow];

            for (i = 1; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                    this.myValues[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;
                }
            }
            this.createTable();
        }

        this.CreateNew = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('countiesTable').rows[activeRow];
            var obj = {};

            for (i = 1; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                    var txtVal = td.childNodes[0].value;
                    if (txtVal != '') {
                        obj[this.col[i]] = txtVal.trim();
                    }
                    else {
                        obj = '';
                        alert('all fields are compulsory');
                        break;
                    }
                }
            }
            obj[this.col[0]] = this.myValues.length + 1;

            if (Object.keys(obj).length > 0) {
                this.myValues.push(obj);
                this.createTable();
            }
        }
    }
    crudApp.createTable();