import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/services/DashboardService';
import { DatePipe } from '@angular/common';
import { CommonFunction } from '../shared/constant/CommonFunction';
import { CommonService } from '../shared/services/CommonService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  inProgress = false;
  currentYear = "";
  tenencyList = ["0","1","2","3","4","5","6","7","8"];
  selectedTenencyList = [];
  monthList = [];
  selectedMonthList = [];
  operatorList = ["Airtel","BSNL","IDEA","PB_HFCL","RJIO","TCL - NLD","Vodafone"];
  selectedOperatorList = ["Airtel"];
  singleSelectdropdownSettings = {};
  multiSelectdropdownSettings = {};
  revenueList = [];
  siteCountGraph = [];
  siteSum = 0;
  ebShareGraph = [];
  ebShareSum = 0;
  dgShareGraph = [];
  dgShareSum = 0;
  totalShareGraph = [];
  totalShareSum = 0;
  // maxRevenueGraph = [];
  opDgGraph = [];
  opDgSum = 0;
  // opEbDgSum = 0;
  opEbGraph = [];
  opEbSum = 0;
  tenencyGraph = [];
  tenencySum = 0;
  maxRevenueList = [];
  constructor(private dashboardService : DashboardService, 
    private commonService: CommonService, 
    private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.singleSelectdropdownSettings = {
      singleSelection: true,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection : true
    };
    this.multiSelectdropdownSettings = {
      singleSelection: false,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    // this.currentYear = this.datePipe.transform(new Date(),'yy');
    // let previousYear = parseInt(this.currentYear) - 1;
    // let nextYear = parseInt(this.currentYear) + 1;
    // this.monthList  = [
    //   "Apr-"+previousYear,
    //   "May-"+previousYear,
    //   "Jun-"+previousYear,
    //   "Jul-"+previousYear,
    //   "Aug-"+previousYear,
    //   "Sep-"+previousYear,
    //   "Oct-"+previousYear,
    //   "Nov-"+previousYear,
    //   "Dec-"+previousYear,
    //   "Jan-"+this.currentYear,
    //   "Feb-"+this.currentYear,
    //   "Mar-"+this.currentYear,
    //   "Apr-"+this.currentYear,
    //   "May-"+this.currentYear,
    //   "Jun-"+this.currentYear,
    //   "Jul-"+this.currentYear,
    //   "Aug-"+this.currentYear,
    //   "Sep-"+this.currentYear,
    //   "Oct-"+this.currentYear,
    //   "Nov-"+this.currentYear,
    //   "Dec-"+this.currentYear,
    //   "Jan-"+nextYear,
    //   "Feb-"+nextYear,
    //   "Mar-"+nextYear
    // ]

    // this.getDashboard();
    this.getBillMonth();
  }

  getBillMonth(){
    this.commonService.getAllListBySearchType("billMonth")
    .subscribe((response) =>{
      this.monthList = response.billMonthList;
      setTimeout(() => {
        this.selectedMonthList = [this.monthList[0]];
        this.getDashboard();
      }, 100);
      
    },
    (error)=>{
      //this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  getDashboard(){
    let month = CommonFunction.createCommaSeprate(this.selectedMonthList);
    let operator = CommonFunction.createCommaSeprate(this.selectedOperatorList);
    let tenency = CommonFunction.createCommaSeprate(this.selectedTenencyList);
    if(month == ""){
      alert("Please select month")
      return;
    }
    let jsonData = {
      month : month,
      operator: operator,
      tenency: tenency
    }
    this.inProgress = true;
    this.dashboardService.getDashboard(jsonData)
    .subscribe(
      (result)=>{
        // this.revenueList = result.revenueList;
        this.siteCountGraph = result.siteCountGraph;
        this.siteSum = result.siteSum;
        this.ebShareGraph = result.ebShareGraph;
        this.ebShareSum = result.ebShareSum;
        this.dgShareGraph = result.dgShareGraph;
        this.dgShareSum = result.dgShareSum;
        this.totalShareGraph = result.totalShareGraph;
        this.totalShareSum = result.totalShareSum;
        // this.maxRevenueGraph = result.maxRevenueGraph;
        this.opEbGraph = result.opEbGraph;
        this.opEbSum = result.opEbSum;
        this.opDgGraph = result.opDgGraph;
        this.opDgSum = result.opDgSum;
        // this.opEbDgSum = result.opEbDgSum;
        this.tenencyGraph = result.tenencyGraph;
        this.tenencySum = result.tenencySum;
        // this.maxRevenueList = result.maxRevenueList;
        this.inProgress = false
      },
      (error)=>{
        this.inProgress = false
      }
    )
  }

}
