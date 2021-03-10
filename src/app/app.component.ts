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
  // 数据列顺序
  displayedColumns: string[] = ['rowIndex', 'name', 'type', 'createId', 'createTime', 'updateTime'];
  // 数据数组
  settingList: Individuation[] = [];
  // 使用自带的DataSource包装数据
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
    // 调用hhtp服务请求数据，主要是为了将请求的一些公关内容提取为一个服务
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

