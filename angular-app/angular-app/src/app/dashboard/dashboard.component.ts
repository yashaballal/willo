import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

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


   public barChartLabels = [];
   public data1 = [];

  ngOnInit() 
  {
    this.plotOnNavi();
  }

  public plotOnNavi()
  {


    this.Auth.getStatsDetails().subscribe(data=>{
      for (var i = 0; i < data.length; i++) {

            this.barChartLabels.push(data[i].year_mm);
            this.data1.push(data[i].amount);
            console.log(data[i].year_mm);
            console.log(data[i].amount);
            }

            this.barChartData = [{data:this.data1, label: 'Series A'}];
  
            console.log(this.barChartLabels);
            console.log(this.data1);
            console.log(this.barChartData);
            });

    var data2={ labels:this.barChartLabels, datasets:[{label:"Monthly revenue",
                                                      backgroundColor: ["#3e95cd", "#3e95cd","#3e95cd","#3e95cd"],
                                                      data:this.data1}] };
    console.log("Here!!! ",data2);
    var canvas = <HTMLCanvasElement>document.getElementById("myChart");
    var ctx = canvas.getContext("2d");
    var myBarChart = new Chart(ctx, {
                                     type: 'bar',
                                     data: data2,
                                     options: {
                                                scales:{
                                                  xAxes: [{
                                                    barPercentage: 0.5,
                                                    barThickness: 6,
                                                    maxBarThickness: 8,
                                                    gridLines: {
                                                        offsetGridLines: true
                                                    }
                                                }],
                                                  yAxes:[
                                                  {
                                                    barThickness: 6,
                                                    ticks:{
                                                      beginAtZero: true
                                                    }
                                                  }
                                                  ]
                                                },
                                                legend: { display: true },
                                                title: {
                                                  display: true,
                                                  text: 'Monthly earnings report'
                                                }
                                              }
                                      }
                                );
  }

}
