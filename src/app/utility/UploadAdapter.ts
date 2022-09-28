import {ApiService} from "../services/api.service";


export class UploadAdapter {

  constructor(
    private loader: any,
    private apiService: ApiService,
  ) {
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then((data: any) => {
        this.apiService.uploadFileForInfo(data).subscribe((result: any) => {
          resolve({default: result.link});
        }, (error: any) => {
          reject(data.msg);
        });
      });
    });
  }

  abort() {
  }
}
