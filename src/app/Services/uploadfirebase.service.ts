import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { from, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Injectable({
  providedIn: "root",
})
export class UploadfirebaseService {
  task: any | AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthenticationService
    ) {}

  public async uploadProfileImg(credentials: any) {
    if (credentials.file instanceof File || credentials.file instanceof Blob) {
      const token = await this.authService.getToken();
      const decodedToken = this.authService.getDecodedToken(token);

      const uploadObs = this.uploadFileAndGetMetadata(
        credentials.file,
        decodedToken._id
        // folder
      );

      return uploadObs.downloadUrl$;
    } else {
      const obs = Observable.create((obs: any) => {
        obs.next(credentials.file);
      });
      return obs;
    }
  }

  uploadFileAndGetMetadata(fileToUpload: File, userId: any) {
    const filePath = `public/file`;
    console.log(filePath, fileToUpload);
    const ref = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, fileToUpload);

    return {
      uploadProgress$: this.task.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(this.task, filePath),
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL())
    );
  }

  getDownloadedFile() {

  }

  deleteImage(downloadUrl: any) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
