import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { ChartModule } from 'angular2-chartjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private Auth:AuthService, private router: Router) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  public pieChartData = [];
  public lineChartData = [];
  
  public myBarChart;

  public lineChartLabels = [];
  
  public barChartLabels = [];
  public pieChartLabels = [];
  public data1 = [];

  ngOnInit() 
  {
    console.log(this.Auth.getLoggedInStatus)
    if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

    this.plotOnNavi();
  }

  public plotOnNavi()
  {
    this.Auth.getStatsDetails().subscribe(data=>{
            var self = this;
            console.log(data);
            data.forEach(function (value){
              console.log(value.year_mm);
              self.barChartLabels.push(value.year_mm);
              self.pieChartLabels.push(value.year_mm);
              self.lineChartLabels.push(value.year_mm);
              self.data1.push(value.amount);
            });

            this.barChartData = [{data:this.data1, label: 'Series A'}];
            this.loadCharts();
            });

  }

  public loadCharts()
  {

    var data2={ labels:this.barChartLabels, datasets:[{label:"Monthly revenue",
                                                      backgroundColor:"#6050dc",
                                                      data:this.data1}] };
    var data3={ labels:this.pieChartLabels, 
      datasets:[
                  {       
                          label:"Subscription wise Pie Chat",
                          backgroundColor:"#6050dc",
                          data:this.data1
                  }
                ]

                                            
    };
    var data4={ labels:this.lineChartLabels, 
      datasets:[
                  {       
                          label:"Line Chart",
                          borderColor: "#3e95cd",
                          fill: false,
                          data:this.data1
                  }
                ]
    };

    var canvas1 = <HTMLCanvasElement>document.getElementById("myChart1");
    var ctx = canvas1.getContext("2d");
    var myBarChart = new Chart(ctx, {
                                     type: 'bar',
                                     data: data2,
                                     options: {
                                                scales:{
                                                  xAxes: [{
                                                    barPercentage: 0.5,
                                                    gridLines: {
                                                        offsetGridLines: true
                                                    },
                                                }],
                                                  yAxes:[
                                                  {
                                                    ticks:{
                                                      beginAtZero: true
                                                    }
                                                  }
                                                  ]
                                                },
                                                responsive:true,
                                                maintainAspectRatio: false,
                                                legend: { display: true },
                                                title: {
                                                  display: true,
                                                  text: 'Monthly earnings report'
                                                }
                                              }
                                      }
                                );

    var canvas2 = <HTMLCanvasElement>document.getElementById("myChart2");
    var ctx2 = canvas2.getContext("2d");
    
    var myLineChart = new Chart(ctx2, {
                                     type: 'line',
                                     data: data4,
                                     
                                     options: {
                                      legend: { 
                                        display: true,
                                        labels: {
                                          fontColor: '#fffff',
                                          fontSize: 15,
                                          padding: 12
                                                },
                                        position: 'right'
                                      },
                                      scales:{
                                        xAxes: [{
                                          barPercentage: 0.7,
                                          gridLines: {
                                            color: "rgba(0, 0, 0, 0)",
                                            offsetGridLines: false
                                        },
                                        
                                        ticks:{
                                          beginAtZero: true
                                        }
                                      }],
                                        yAxes:[
                                        {
                                          gridLines: {
                                            color: "rgba(0, 0, 0, 0)",
                                            offsetGridLines: false
                                        },
                                          ticks:{
                                            beginAtZero: true
                                          }
                                        }
                                        ]
                                      },
                                     
                                      responsive:true,
                                      maintainAspectRatio: false,
                                     
                                      title: {
                                        display: true,
                                        fontSize: 15,
                                        text: 'Monthly earnings report'
                                      },
                                      
                                    }
                                  }
                                );

    var canvas3 = <HTMLCanvasElement>document.getElementById("myChart3");
    var ctx3 = canvas3.getContext("2d");
    
    // For a pie chart
    var myPieChart = new Chart(ctx3, {
                                      type: 'doughnut',
                                      data: data3,
                                      options: {
                                        
                                        responsive:true,
                                        maintainAspectRatio: false,
                                        legend: { 
                                          display: true,
                                          labels: {
                                            fontColor: '#fffff',
                                            fontSize: 15,
                                            padding: 12
                                          },
                                          position: 'right'
                                        },
                                        title: {
                                          display: true,
                                          fontSize: 15,
                                          
                                          text: 'Subscription model wise Pie Chat'
                                        }
                                      }
                                
                                });



  }

}
