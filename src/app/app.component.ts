import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from './http.service';
import { Individuation } from './Individuation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['rowIndex', 'name', 'type', 'createId', 'createTime', 'updateTime'];
  settingList: Individuation[] = [];
  settingDataSource = new MatTableDataSource<Individuation>(this.settingList);

  constructor(
    private httpService: HttpService
  ) {

  }

  ngOnInit(): void {
    this.getSettingData();
  }

  getSettingData(): void {
    const url = 'http://localhost:8080/setting/getSettingListByTypeWithNoTokenMap';
    const data = {
      "type": 4
    };
    this.httpService.getSettingData(url, data)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.settingList = result.data;
          this.settingDataSource.data = result.data;
        },
        error: (err) => (console.log(err)),
      });
  }

}

