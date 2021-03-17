import { IEmployee, IGradeRelief, IReliefsList, IStaturoryRelief, ITaxRuleRelief, IUseRuleRelief } from "@nutela/models/compensation/payroll";
import { ICurrency, ISelectOption } from "@nutela/models/core-data";
import { IReliefProfile } from "libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface";
import { IReliefCurrency } from "libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface";
import { IFixedDeductionRelief } from "libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction.interface";
import { IReliefGrade } from "libs/models/compensation/payroll/src/lib/interfaces/relief-grade.interface";
import { IReliefPayGroup } from "libs/models/compensation/payroll/src/lib/interfaces/relief.paygroupList.interface";
import { IReliefEmployeeData } from "libs/models/compensation/payroll/src/lib/interfaces/relief-employeeData.interface";



export interface IReliefState {
  reliefsList: IReliefsList[];
  reliefProfile :IReliefProfile[];
  relieStatutory :IStaturoryRelief[];
  reliefType :ITaxRuleRelief[];
  useRule :IUseRuleRelief[];
  reliefCurrencies :IReliefCurrency[];
  reliefGrades :IGradeRelief[];
  payGroupGrades :IGradeRelief[];
  employee :IEmployee[];
  gradeData :IGradeRelief;
  payGroupData :IGradeRelief;
  EmployeeData :IEmployee;
  showEditor: boolean;
  showAddReliefEditor: boolean;
  showConfigReliefEditor: boolean;
  showGradesReliefEditor: boolean;
  showPayGroupReliefEditor: boolean;
  showEmployeeReliefEditor: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  isProfileProcessing: boolean;
  isProfileLoading: boolean;
  canRun: any;
  showViewEditor: boolean;
  showFixedDeduction: boolean;
  fixedDeduction :IFixedDeductionRelief[];
  reliefGradeList :IReliefGrade[];
  reliefPayGroupList :IReliefPayGroup[];
  reliefEmployeeList :IReliefEmployeeData[];
}

export const initialReliefState: IReliefState = {
  reliefsList:[],
  reliefProfile :[],
  relieStatutory : [],
  reliefType :[],
  useRule:[],
  reliefCurrencies: [],
  reliefGrades : [],
  payGroupGrades : [],
  employee: [],
  gradeData : null,
  payGroupData : null,
  EmployeeData : null,
  showEditor: false,
  showAddReliefEditor:false,
  showConfigReliefEditor : false,
  showGradesReliefEditor : false,
  showPayGroupReliefEditor : false,
  showEmployeeReliefEditor : false,
  isProcessing: false,
  isLoading: false,
  isProfileProcessing: false,
  isProfileLoading: false,
  canRun: null,
  showViewEditor: false,
  showFixedDeduction: false,
  fixedDeduction: [],
  reliefGradeList: [],  
  reliefPayGroupList :[],
  reliefEmployeeList :[]
}

