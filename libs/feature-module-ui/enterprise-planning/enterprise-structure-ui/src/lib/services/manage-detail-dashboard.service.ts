import { Injectable } from '@angular/core';

import { ISelectOption } from '@nutela/models/core-data';
import { IgxStringFilteringOperand, IgxBooleanFilteringOperand, FilteringExpressionsTree, FilteringLogic } from 'igniteui-angular';
import { isNull, isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {

  public filterBySentToList: ISelectOption[] = [
    {value: '1', label: 'All items'},
    {value: '2', label: 'Sent to Me'},
    {value: '3', label: 'Sent to HR'},
    {value: '4', label: 'Sent to Admin'}
  ];

  public filterByCanFinalizeList: ISelectOption[] = [
    {value: '1', label: 'All items'},
    {value: '2', label: 'Can finalize items'},
    {value: '3', label: `Can't finalize items`}
  ];

  constructor() { }

  search(searchString: string, sentToTypeId: string, canFinalizeTypeId: string, sourceNameMap: string, logonName: string): FilteringExpressionsTree {
    const gridFilteringExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And);

    if (!this.isNullOrEmptyString(searchString)) {
      const searchTree = this.getSearchFilteringExpressionTree(searchString);
      gridFilteringExpressionsTree.filteringOperands.push(searchTree);
    }

    if (!this.isNullOrEmptyString(sentToTypeId)) {
      if (sentToTypeId !== '1') {
        const sentToTree = this.getFilterBySentToExpression(sentToTypeId, logonName);
        gridFilteringExpressionsTree.filteringOperands.push(sentToTree);
      }
    }

    if (!this.isNullOrEmptyString(canFinalizeTypeId)) {
      if (canFinalizeTypeId !== '1') {
        const canFinalizeTree = this.getFilterByCanFinalizeExpression(canFinalizeTypeId);
        gridFilteringExpressionsTree.filteringOperands.push(canFinalizeTree);
      }
    }

    if (!this.isNullOrEmptyString(sourceNameMap)) {
      const workflowEntityTree = this.getWorkflowEntityExpression(sourceNameMap);
      gridFilteringExpressionsTree.filteringOperands.push(workflowEntityTree);
    }

    return gridFilteringExpressionsTree;
  }

  isNullOrEmptyString(value: any): boolean {
    if (isNull(value) || isUndefined(value)) {
      return true;
    }

    if (value === '') {
      return true;
    }

    return false
  }

  private getWorkflowEntityExpression(sourceNameMap: string) {
    let filteringExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And, "msg_source");

    const expression = {
      condition: IgxStringFilteringOperand.instance().condition("equals"),
      fieldName: 'msg_source',
      ignoreCase: true,
      searchVal: sourceNameMap
    };

    filteringExpressionsTree.filteringOperands.push(expression);

    return filteringExpressionsTree;
  }

  private getSearchFilteringExpressionTree(searchString: string) {
    let filteringExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And, "msg_details");

    const expression = {
      condition: IgxStringFilteringOperand.instance().condition("contains"),
      fieldName: 'msg_details',
      ignoreCase: true,
      searchVal: searchString
    };

    filteringExpressionsTree.filteringOperands.push(expression);

    return filteringExpressionsTree;
  }

  private getFilterBySentToExpression(typeId: string, logonName: string) {
    let filteringExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And, "msg_to");

    const searchValue = this.getSentToSearchValue(typeId, logonName);

    const expression = {
      condition: IgxStringFilteringOperand.instance().condition("equals"),
      fieldName: 'msg_to',
      ignoreCase: true,
      searchVal: searchValue
    };

    filteringExpressionsTree.filteringOperands.push(expression);

    return filteringExpressionsTree;
  }

  private getFilterByCanFinalizeExpression(typeId: string) {
    let filteringExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And, "is_temp_permission");

    const searchValue = this.getCanFinalizeSearchValue(typeId);

    const expression = {
      condition: IgxBooleanFilteringOperand.instance().condition(searchValue),
      fieldName: 'is_temp_permission',
      ignoreCase: true,
      searchVal: searchValue
    };

    filteringExpressionsTree.filteringOperands.push(expression);

    return filteringExpressionsTree;
  }

  private getSentToSearchValue(typeId: string, logonName: string): string {
    switch (typeId) {
      case '1':
        return '';
      case '2':
        return logonName;
      case '3':
        return 'HR';
      case '4':
        return 'ADMINISTRATOR';
      default:
        return '';
    }
  }

  private getCanFinalizeSearchValue(typeId: string): string {
    switch (typeId) {
      case '2':
        return 'true';
      case '3':
        return 'false';
      default:
        return 'false';
    }
  }
}
