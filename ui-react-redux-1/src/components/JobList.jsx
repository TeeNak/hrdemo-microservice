import React, { PropTypes, Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux';
import { rowEdited } from '../actions/actions'

class JobList extends Component {

  constructor(props) {
    super(props)
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
    this.dataClassName = this.dataClassName.bind(this);
    this.cellEditProp = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    }
    this.columns = [
      "jobId",
      "code",
      "name",
      "version"
    ]

    this.lastEditedRow = -1
    this.lastEditedCol = -1


  }

  onAfterSaveCell(row, cellName, cellValue){
    console.log("Save cell '"+cellName+"' with value '"+cellValue+"'");
    console.log("The whole row :");
    console.log(row);


    const { dispatch } = this.props
    dispatch(rowEdited(row, cellName));
  };

  dataClassName(fieldValue,data,r,i) {
    if(this.lastEditedRow !== -1 && this.lastEditedCol !== -1) {
      if(this.lastEditedRow === r && this.lastEditedCol === i) {
        return "blinking";
      }
    }
    return "";
  }

  render() {
    if( this.props.lastEdited ) {
      this.lastEditedRow = this.props.items.findIndex( (element) => {
        return element.jobId === this.props.lastEdited.rowId
      })
      this.lastEditedCol = this.columns.indexOf(this.props.lastEdited.columnName)
    }
    return (
      <div>
        <BootstrapTable data={this.props.items} cellEdit={this.cellEditProp}>
          <TableHeaderColumn dataField={this.columns[0]} isKey={true}>Job ID</TableHeaderColumn>
          <TableHeaderColumn dataField={this.columns[1]} columnClassName={this.dataClassName}>Code</TableHeaderColumn>
          <TableHeaderColumn dataField={this.columns[2]} columnClassName={this.dataClassName}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField={this.columns[3]}>Version</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

JobList.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  lastEdited: PropTypes.shape({
    rowId: PropTypes.number,
    columnName: PropTypes.string
  })
}

export default connect()(JobList);
